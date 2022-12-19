
var knex = require('../config/database');


// digunakan untuk menampilkan semua data post

exports.fetch = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const post = await knex('posts');
    res.status(200).
        json({
            message: "testing",
            item_count: post.length,
            data: post
        });
}

// digunakan untuk menampilkan salah satu data berdasarkan ID

exports.detail = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const { id } = req.params
    const post = await knex('posts').where({ id }).first();
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post Detail", data: post });
}

//digunakan untuk membuat data baru yang akan disimpan di DB

exports.create = async function (req, res) {

    if (req.method !== 'POST') return res.status(405).end();
    const { title, content } = req.body;
    await knex('posts').insert({
        title, content,
    });
    res.status(200).json({ message: "Post Created" });
}

//digunakan untuk mengubah data berdasarkan ID

exports.update = async function (req, res) {

    if (req.method !== 'PATCH') return res.status(405).end();
    const { id } = req.params
    const { title, content } = req.body;
    await knex('posts').where({ id }).update({ title, content });
    const updatedData = await knex('posts').where('id', id).first();
    res.status(200).json({ message: "Post Updated", data: updatedData });
}

//digunakan untuk menghapus data berdasarkan ID

exports.delete = async function (req, res) {
    if (req.method !== 'DELETE') return res.status(405).end();
    const { id } = req.params
    const post = await knex('posts').where({ id }).del();
    res.status(200).json({ message: "Post Deleted" });
}