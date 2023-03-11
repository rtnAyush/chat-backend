const express = require('express');
const cors = require('cors')
const User = require('./models/userModels')


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// database connection
require('./connection');

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is started at ${port}`);
})


app.post('/register', async (req, res) => {

    try {
        const { name, email, password, picture } = req.body;
        const newUser = await User.create({
            name,
            email,
            password,
            picture
        });

        res.status(201).json(newUser);

    } catch (e) {
        let msg;

        if (e.code == 11000) {
            msg = "user already exists";
        } else {
            msg = e.message;
        }
        console.log(e.message);
        res.status(400).json(msg);
    }
});

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            // invaild user
            throw "user not found"
        } else {
            if (user.password === password) {
                // successfull login
                res.status(200).json(user);
            } else {
                // incorrect password
                throw "incorrect password"
            }
        }

    } catch (err) {
        res.status(404).json(err);
    }

});

app.post('/contact', async (req, res) => {
    const { who, contact } = req.body;

    try {
        await User.findOneAndUpdate({ email: who }, { $push: { contacts: contact } })
        res.status(201).json("pushed");
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});