const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const rolesData = [
  { nombreRol: 'cliente', descripcionRol: 'Cliente del sistema' },
  { nombreRol: 'administrador', descripcionRol: 'Administrador del sistema' }
];

const categoriaData = [
  { nombreCategoria: 'zona gamer' },
  { nombreCategoria: 'zona computo' },
  { nombreCategoria: 'zona redes' },
  { nombreCategoria: 'zona electronica' }
];



async function main() {
  console.log(`Start seeding ...`);

  try {
    // Insertar roles en la tabla Roles
    await prisma.Roles.createMany({
      data: rolesData,
    });
    console.log(`Inserted roles data.`);

    // Insertar categorías en la tabla Categoria
    await prisma.Categoria.createMany({
      data: categoriaData,
    });
    console.log(`Inserted categoria data.`);

    // Insertar usuarios y sus posts
    for (const u of userData) {
      const user = await prisma.Usuario.create({
        data: u,
      });
      console.log(`Created user with id: ${user.id}`);
    }

    console.log(`Seeding finished.`);
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