import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000

const mockUsers = [
    {
        id: 1,
        username: "Hi",
        score: 10
    },
    {
        id: 2,
        username: "Huhu",
        score: 10
    },
    {
        id: 3,
        username: "Hả",
        score: 10
    },
]

const mockProducts = [
    {
        id: 1,
        username: "Iphone 14 Promax",
        price: 30
    },
    {
        id: 2,
        username: "Samsung S24 Ultra",
        price: 30
    },
]

app.get('/', (req, res) => { // request and response
    res.status(201).send({ msg: "hello" })
});

app.get('/api/users', (req,res) => {
    res.send(mockUsers)
})

app.get('/api/products', (req,res) => {
    res.send(mockProducts)
})

app.get('/api/users/:id', (req,res) => {
    const parseId = parseInt(req.params.id);
    // Return status 400 if parseId isn't number
    if (isNaN(parseId)) return res.status(400).send({msg: "Bad Request"})

    const findUser = mockUsers.find(user => user.id === parseId)
    if (!findUser) return res.sendStatus(404);
    return res.send(findUser)
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
});