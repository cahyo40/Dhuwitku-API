var db = require('../config/database')
var uuid = require('uuid')


exports.fetch = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const kategori = await db('kategori');
    res.status(200).
        json({
            message: "Semua Kategori",
            item_count: kategori.length,
            kategori: kategori,
        });
}

exports.detail = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    const { id } = req.params;

    const kategori = await db('kategori').where('id_kategori', id).first();
    res.status(200).
        json({
            message: "Detail kategori",
            kategori: kategori,
        });
}

exports.create = async function (req, res) {
    if (req.method !== 'POST') return res.status(405).end();


    const { nama_kategori, tipe } = req.body;
    await db('kategori').insert({ id_kategori: uuid.v4(), nama_kategori, tipe });
    res.status(200).
        json({
            message: "Kategori sukses ditambahkan",
        });
}
exports.update = async function (req, res) {
    if (req.method !== 'PATCH') return res.status(405).end();

    const { id } = req.params;
    const { nama_kategori, tipe } = req.body;
    await db('kategori').where({ id_kategori: id }).update({ nama_kategori, tipe });
    res.status(200).
        json({
            message: "Kategori sukses diperbarui",
        });
}

exports.delete = async function (req, res) {
    if (req.method !== 'DELETE') return res.status(405).end();

    const { id } = req.params;

    const kategori = await db('kategori').where({ id_kategori: id }).del();
    res.status(200).
        json({
            message: "Berhasil menghapus kategori",
        });
}

exports.filterByTipe = async function (req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { tipe } = req.body;

    const kategori = await db('kategori').where("tipe", tipe);
    res.status(200).
        json({
            message: "Filter kategori",
            item_count: kategori.length,
            kategori: kategori,
        });
}