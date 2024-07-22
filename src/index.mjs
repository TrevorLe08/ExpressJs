import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json())

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
    {
        id: 4,
        username: "A",
        score: 10
    },
    {
        id: 5,
        username: "B",
        score: 10
    },
    {
        id: 6,
        username: "C",
        score: 10
    },
]

app.get('/api/users', (req, res) => {
    const { query: { filter, value } } = req;

    // Query parameter: when filter and value is valid
    if (filter && value) {
        return res.send(
            mockUsers.filter(user => user[filter].includes(value))
        )
    }
    // localhost:300/api/user?filter=...&value=...
    return res.send(mockUsers)
})

app.get('/api/users/:id', (req, res) => {
    const parseId = parseInt(req.params.id);
    // Return status 400 if parseId isn't number
    if (isNaN(parseId)) {
        return res.status(400).send({ msg: "Bad Request" })
    } 

    const findUser = mockUsers.find(user => user.id === parseId)
    if (!findUser) {
        return res.sendStatus(404);
    }
    return res.send(findUser)
})

app.post('/api/users',(req,res) => {
    const {body} = req
    const newUser = {
        id: mockUsers[mockUsers.length - 1].id + 1,
        ...body
    }
    mockUsers.push(newUser)
    return res.status(201).send(newUser)
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
});