import express from 'express';
import { validationResult, matchedData, checkSchema } from 'express-validator' // Xài cũng ko xịn cho lắm:v
import { createUserValidationSchema, getUserValidationSchema } from './utils/validation.mjs';

const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json())

const resolveIndexByUserId = (req, res, next) => { // Middleware
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return res.status(400).send({ msg: "Bad Request" })
    }

    const index = mockUsers.findIndex(user => user.id === id)
    if (index === -1) {
        return res.sendStatus(404);
    }
    req.indexUser = index;
    next();
}

const mockUsers = [
    { id: 1, username: "Hi", score: 10 },
    { id: 2, username: "Yes", score: 10 },
    { id: 3, username: "Hả", score: 10 },
    { id: 4, username: "AB", score: 10 },
    { id: 5, username: "BC", score: 10 },
    { id: 6, username: "CA", score: 10 },
]

app.get('/api/users',checkSchema(getUserValidationSchema),(req, res) => {
        const result = validationResult(req)
        const { filter, value } = req.query;
        if (result.isEmpty()) {
            return res.send(
                mockUsers.filter(user => user[filter].includes(value))
            )
        }
        return res.send(mockUsers)
    })

app.get('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const findUser = mockUsers[req.indexUser]
    if (!findUser) {
        return res.sendStatus(404);
    }
    return res.send(findUser)
})

app.post('/api/users',checkSchema(createUserValidationSchema),(req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).send({error: result.array()})
        }

        const data = matchedData(req)
        const newUser = {
            id: mockUsers[mockUsers.length - 1].id + 1,
            username: data.username,
            score: data.score,
        }
        mockUsers.push(newUser)
        return res.status(201).send(newUser)
    })

app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
    mockUsers[req.indexUser] = { id: mockUsers[req.indexUser].id, ...req.body }
    return res.sendStatus(200)
})

app.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
    mockUsers[req.indexUser] = { ...mockUsers[req.indexUser], ...req.body }
    return res.sendStatus(200)
})

app.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
    mockUsers.splice(req.indexUser, 1)
    return res.sendStatus(200)
})

app.listen(PORT, () => {
    try {
        console.log(`Running on port ${PORT}`);
    } catch (error) {
        console.log("Some error occured");
    }
});

// Part 1: setup, get requests and route parameters
// Part 2: query parameters and post requests
// Part 3: put, patch and delete requests
// Part 4: Middleware and validation