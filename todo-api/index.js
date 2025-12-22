const express = require("express");
const app = express();

const cors= require("cors");
app.use(cors());

const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient({ adapter: { provider: 'sqlite', url: process.env.DATABASE_URL } });

app.use(express.json());
app.use(express.urlencoded());

app.post('/task', async (req , res) => {
    const name = req.body?.name;
    if(!name) {
        return res.status(400).json({ msg : "name require"})
    }

    const item = await prisma.todo.create({
        data: {name}
    })

    res.status(201).json(item);
})

app.get('/task', async (req , res) => {
    const items = await prisma.todo.findMany();

    res.json(items)
});

app.get('/task/:id', async (req , res) => {
    const id = req.params.id;
    const item = await prisma.todo.findFirst({
        where: { id: Number(id)}
    });

    res.json(item);
});

app.delete('/task/:id', async (req, res) => {
    const id = req.params.id;

    const item = await prisma.todo.delete({
        where: { id: Number(id)}
    });
    res.json(item);
});

app.put('/task/:id/toggle', async (req,res ) => {
    const id = req.params.id;

    const item = await prisma.todo.findFirst({
        where: {id : Number(id)}
    });

    const update = await prisma.todo.update({
        where: { id: Number(id)},
        data: { done: !item.done}
    })

    res.json(update);
});

app.delete('/task', async ( req, res ) => {
    const result = await prisma.todo.deleteMany({
        where: { done: true }
    })

    res.json(result);
})

const Port = process.env.PORT || 8800;
app.listen(Port, () => {
    console.log("Todo API running at " + Port + "...");
});