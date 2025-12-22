const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient({ adapter: { provider: 'sqlite', url: process.env.DATABASE_URL } });

async function main() {
    const role = await prisma.role.create({
        data: {
            name: "Admin",
            users : {
                create: [
                    {name: "Alice", email: "Alice.com"},
                    {name: "Bob", email: "Bob.com"},
                ]
            }
        }
    })
    console.log(role);
}

// async function main() {
//     const item = await prisma.todo.createMany({
//         data: [
//                     { name: "Another thing todo"},
//                     { name: "More thing todo" },
//                     { name: "Completed todo", done: true },
//                 ]
            
        
//     });

//     console.log(item);
// }

main();