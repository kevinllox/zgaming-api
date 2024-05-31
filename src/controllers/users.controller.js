import { PrismaClient } from "@prisma/client";
import { createAccessToken } from "../../libs/jsonwebtoken.js";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const register = async (req, res) => {
  const { username, email, password, name, phoneNumber, idRol } = req.body;

  try {
    console.log("Checking if user exists");
    const userFound = await prisma.usuario.findFirst({
      where: {
        correo: email,
      },
    });

    if (userFound) {
      console.log("User already exists");
      return res.status(400).json({ message: "The email already exists" });
    }

    console.log("Hashing password");
    const passwordHash = await bcrypt.hash(password, 10);

    console.log("Creating new user");
    const newUser = await prisma.usuario.create({
      data: {
        contrasenia: passwordHash,
        correo: email,
        nombre: name,
        numeroTelefono: phoneNumber,
        nombreUsuario: username,
        activo: true,
        idRol: idRol,
      },
    });

    console.log("User created successfully:", newUser);
    const token = await createAccessToken({ id: newUser.idUsuario });
    res.cookie("token", token);
    console.log("Token:", token);
    const userNewResponse = {
      ...newUser,
      numeroTelefono: newUser.numeroTelefono
        ? newUser.numeroTelefono.toString()
        : null,
    };
    res.status(201).json({ userNewResponse, token });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "The user cannot be created", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await prisma.usuario.findFirst({
      where: {
        correo: email,
      },
    });
    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userFound.contrasenia);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    const token = await createAccessToken({ id: userFound.idUsuario });
    res.cookie("token", token);
    const userNewFound = {
      ...userFound,
      numeroTelefono: userFound.numeroTelefono
        ? userFound.numeroTelefono.toString()
        : null,
    };
    res.status(200).json(userNewFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

const verify = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, process.env.TOKEN_SECRET, async (error, user) => {
    if (error) return res.status(401).json({ message: "Unauthorized" });
    const userFound = await prisma.usuario.findUnique(user);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });
    return res.json(userFound);
  });
};

export { register, login, logout, verify };
