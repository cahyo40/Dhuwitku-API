var db = require('../config/database')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
require('dotenv').config()

exports.login = async function (req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;
    const login = await db('users').where({ email }).first();
    if (!login) return res.status(401).end();

    const checkPassword = await bcrypt.compare(password, login.password);
    if (!checkPassword) return res.status(401).end();

    const token = jwt.sign({
        email: login.email,
        username: login.username,
    }, process.env.JWT_KEY, {
        expiresIn: '7d',
    })


    res.status(200).json({ message: "Login Successfully", token: token })

}

exports.register = async function (req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, name, username, password } = req.body;

    const salt = bcrypt.genSaltSync(11);
    const passwordHash = bcrypt.hashSync(password, salt);

    await db('users').insert({ email, name, username, password: passwordHash });
    const data = await db('users').where({ email }).first();

    res.status(200).json({ message: "Created user successfully", data: data })


}