const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient({ adapter: { provider: 'sqlite', url: process.env.DATABASE_URL } });

async function main() {
    const items = await prisma.role.findMany({
       include: {users : true}
});

    console.log(items);
}

main();