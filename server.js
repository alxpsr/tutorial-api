const express = require('express');
const emoji = require('node-emoji');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (request, response) => {
    response.send('200 OK');
});

let users = [];

app.get('/users', (request, response) => {
    response.json(users);
});

app.get('/users/:id', (request, response) => {
    const userId = Number(request.params.id);
    const user = users.find((user) => user.id === userId);

    if (!user) {
        response.status(404).send(`User with id=${userId} not found.`)
    } else {
        response.json(user);
    }
});

app.post('/users', (request, response) => {
    const reqDto = request.body;

    if (isRequestHasRequiredProps(reqDto)) {
        createNewUser(reqDto);
        response.json(users);
    } else {
        response.status(400).send("Request DTO must have ['name', 'surname', 'patronymic', 'dateBirth', 'gender'] fields");
    }
})

app.listen(PORT, () => {
    console.log(`Express server currently running on port ${PORT}`);
    console.log(emoji.random());
});

function isRequestHasRequiredProps(dto) {
    const requiredFields = ['name', 'surname', 'patronymic', 'dateBirth', 'gender'];
    const keys = Object.keys(dto);

    return requiredFields.every(f => keys.indexOf(f) > -1);
}

function createNewUser(dto) {
    if (!dto) {
        return {};
    }

    const newUser = {
        id: users.length + 1,
        fullName: `${dto.surname} ${dto.name} ${dto.patronymic}`,
        dateBirth: dto.dateBirth,
        gender: dto.gender,
        avatar: emoji.random().emoji
    }

    users.push(newUser);
}