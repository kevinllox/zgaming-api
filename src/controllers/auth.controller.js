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
    const userNewResponse = {
      ...newUser,
      numeroTelefono: newUser.numeroTelefono
        ? newUser.numeroTelefono.toString()
        : null,
      token,
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
    const userNewFound = {
      ...userFound,
      numeroTelefono: userFound.numeroTelefono
        ? userFound.numeroTelefono.toString()
        : null,
      token,
    };
    res.status(200).json(userNewFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
}; */

const profile = async (req, res) => {
  const { id } = req.params;
  try {
    const userFound = await prisma.usuario.findFirst({
      where: {
        idUsuario: parseInt(id),
      },
    });
    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }
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

const getAllProfiles = async (req, res) => {
  try {
    const users = await prisma.usuario.findMany();

    const usersNewResponse = users.map((user) => ({
      ...user,
      numeroTelefono: user.numeroTelefono
        ? user.numeroTelefono.toString()
        : null,
    }));

    res.status(200).json(usersNewResponse);
  } catch (error) {
    res.status(500).json({
      message: "Error when getting all users",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { username, email, password, name, phoneNumber, idRol, isActive } =
    req.body;
  let passwordHash;
  const updateData = {};

  try {
    // Fetch current user data
    const currentUser = await prisma.usuario.findFirst({
      where: {
        idUsuario: parseInt(userId), // Assuming 'idUsuario' is the primary key field in your database
      },
    });

    if (!currentUser) {
      return res.status(404).json({
        error: `User with id:${userId} doesn't exist`,
      });
    }

    // Check if the role needs to be updated and if it exists
    if ((idRol === 0) || (idRol && currentUser.idRol !== parseInt(idRol))) {
      const roleFound = await prisma.rol.findFirst({
        where: {
          idRol: parseInt(idRol),
        },
      });
      if (!roleFound) {
        return res.status(404).json({
          error: `Can't update user because idRol:${idRol} doesn't exist`,
        });
      }
      updateData.idRol = parseInt(idRol);
    }

    // Check if the password needs to be updated
    if (password) {
      const passwordMatch = await bcrypt.compare(
        password,
        currentUser.contrasenia
      );
      if (!passwordMatch) {
        passwordHash = await bcrypt.hash(password, 10);
        updateData.contrasenia = passwordHash;
      }
    }

    // Compare each field and add to updateData if it has changed
    if (email && email !== currentUser.correo) updateData.correo = email;
    if (name && name !== currentUser.nombre) updateData.nombre = name;
    if (phoneNumber && phoneNumber !== currentUser.numeroTelefono)
      updateData.numeroTelefono = BigInt(phoneNumber); // Assuming you want to store it as BigInt

    if (username && username !== currentUser.nombreUsuario)
      updateData.nombreUsuario = username;
    if (isActive !== undefined && isActive !== currentUser.activo)
      updateData.activo = isActive;

    if (Object.keys(updateData).length === 0) {
      return res.status(200).json({ message: "No fields have changed" });
    }

    console.log(updateData);
    // Update the user with only the changed fields
    const updatedUser = await prisma.usuario.update({
      where: {
        idUsuario: parseInt(userId),
      },
      data: updateData,
    });

    // Convert BigInt fields to string for JSON serialization
    const serializedUser = {
      ...updatedUser,
      numeroTelefono: updatedUser.numeroTelefono
        ? updatedUser.numeroTelefono.toString()
        : null,
    };

    res.status(201).json(serializedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating the user", error: error.message });
  }
};

const getProfileByRol = async (req, res) => {
  const { idRol } = req.params;
  try {
    const isRolValid = await prisma.roles.findUnique({
      where: {
        idRol: parseInt(idRol),
      },
    });

    console.log(isRolValid)

    if (!isRolValid) {
      return res.status(404).json({ message: "Id rol is not valid" });
    }

    const profilesByRol = await prisma.usuario.findMany({
      where: {
        idRol: parseInt(idRol),
      },
    });
    console.log(profilesByRol)
    const usersNewResponse = profilesByRol.map((profile) => ({
      ...profile,
      numeroTelefono: profile.numeroTelefono
        ? profile.numeroTelefono.toString()
        : null,
    }));
    res.status(201).json(usersNewResponse);
  } catch (error) {
    res.status(500).json({
      message: "Error when getting users by role",
      error: error.message,
    });
  }
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

export {
  register,
  login,
  verify,
  profile,
  updateProfile,
  getAllProfiles,
  getProfileByRol,
};
