const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient({ adapter: { provider: 'sqlite', url: process.env.DATABASE_URL } });

async function main() {
    const item = await prisma.todo.delete({
        where: { id: 2 },
    });

    console.log(item);
}

main();