import { PrismaClient } from "@prisma/client";
import checkInDbMessage from "../utils/checkInTheDb.js";
import { categoriaData, rolesData } from "../utils/const/datasample_db.js";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  try {
    // Check if we have roles data in the roles table
    const rolesCount = await prisma.roles.count();

    await checkInDbMessage(
      "roles",
      rolesCount,
      prisma.roles.createMany({
        data: rolesData,
      })
    );

    // Check if we have categories data in the categories table
    const categoriesCount = await prisma.categoria.count();

    await checkInDbMessage(
      "categories",
      categoriesCount,
      prisma.categoria.createMany({
        data: categoriaData,
      })
    );

    console.log('Seeding completed ...');
  } catch (error) {
    console.error("Error seeding data: ", error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

//NOTA
//debes correr estos triggers directamente en el esquema

//USUARIO Y COMPRA

/* 
  DELIMITER //
CREATE TRIGGER before_usuario_insert
BEFORE INSERT ON Usuario
FOR EACH ROW
BEGIN
  IF (SELECT COUNT(*) FROM Roles WHERE idRol = NEW.idRol) = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'idRol no válido';
  END IF;
END;
//
DELIMITER ;
  */

/*
DELIMITER $$
CREATE TRIGGER `before_compra_insert` BEFORE INSERT ON `compra` FOR EACH ROW BEGIN
  IF (SELECT COUNT(*) FROM Usuario WHERE idUsuario = NEW.idUsuario) = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'idUsuario no válido';
  END IF;
END
$$
DELIMITER ;

*/
