var db = require('../config/database')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const { getEmail } = require('./keuangan')
require('dotenv').config()


exports.login = async function (req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;
    const login = await db('users').where({ email }).first();
    if (!login) return res.status(401)
        .json({ message: "Login Unsuccessfully", token: null })
        .end();

    const checkPassword = await bcrypt.compare(password, login.password);
    if (!checkPassword) return res.status(401)
        .json({ message: "Login Unsuccessfully", token: null })
        .end();

    const token = jwt.sign({
        email: login.email,
        username: login.username,
    }, process.env.JWT_KEY, {
        expiresIn: '7d',
    })


    res.status(200).json({ message: "Login Successfully", token: token })

}

exports.loginToken = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    if (!req.headers.authorization) return res.status(401).end();
    if (req.headers.authorization.split(' ')[0] !== 'Bearer') return res.status(401).end();
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_KEY);
    const email = user['email'];

    const login = await db('users').where('email', email).first();
    res.status(200).json(login);
}

exports.register = async function (req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, name, username, password } = req.body;

    const salt = bcrypt.genSaltSync(11);
    const passwordHash = bcrypt.hashSync(password, salt);

    await db('users').insert({ email, name, username, password: passwordHash });
    const data = await db('users').where({ email }).first();

    res.status(200).json(data)


}