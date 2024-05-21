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

const userData = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Join the Prisma Discord',
          content: 'https://pris.ly/discord',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
          viewCount: 42,
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
          viewCount: 128,
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
        },
      ],
    },
  },
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
