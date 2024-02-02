import Express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = new Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let users = [
    {
        name: "admin",
        mail: "admin@localhost",
        password: "admin"
    },
    {
        name: "Gaspar",
        mail: "gaspargkral05@gmail.com",
        password: "Gaspar1405!"
    }
]

app.post('/login', (req, res) => {
    const { name: userIdentification, password } = req.body;
    const user = users.find(u => u.name === userIdentification || u.mail === userIdentification && u.password === password);
    user ? res.status(200).send(user) : res.status(401).send(false);
})

app.get('/getUser:name', (req, res) => {
    const { name } = req.params;
    const user = users.find(u => u.name === name);
    user ? res.status(200).send(user) : res.status(404).send(false);
})

app.post('/createUser', (req, res) => {
    const { name, mail, password } = req.body;
    users.find(u => u.name === name) ? res.status(409).send(false) : users.push({ name, mail, password });
    res.status(200).send(true);
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))