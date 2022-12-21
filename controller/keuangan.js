var db = require('../config/database')
var uuid = require('uuid')
var jwt = require('jsonwebtoken')
require('dotenv').config()


function getEmail(req, res) {
    if (!req.headers.authorization) return res.status(401).end();
    if (req.headers.authorization.split(' ')[0] !== 'Bearer') return res.status(401).end();
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_KEY);
    const email = user['email'];
    return email;
}

function isNull(object) {
    for (const [key, value] of Object.entries(object)) {
        if (typeof (value) === "object" && value !== null) {
            isNull(value)
        } else if (!value) {
            object[key] = 0
        }
    }
    return object
}

const today = new Date();
const getToday = today.toISOString().split('T')[0];
const getWeek = new Date(today.setDate(today.getDate() - 6)).toISOString().split('T')[0]


exports.fetch = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const email = getEmail(req, res);
    const keuangan = await db('keuangan')
        .where("email_user", email)
        .orderBy('createdAt', 'desc');
    res.status(200).
        json({
            message: "Semua data keuangan",
            item_count: keuangan.length,
            email: email,
            keuangan: keuangan,
        })

}

exports.fetchByKategori = async function (req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const email = getEmail(req, res);
    const { kategori_id } = req.body;
    const keuangan = await db('keuangan')
        .whereIn('kategori_id', kategori_id.split(","))
        .andWhere("email_user", email)
        .orderBy('createdAt', 'desc')
    res.status(200).
        json({
            message: "Semua data keuangan",
            item_count: keuangan.length,
            email: email,
            keuangan: keuangan,
        })
}

exports.fetchRangeByDate = async function (req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const email = getEmail(req, res);
    const { start_date, end_date } = req.body;
    const keuangan = await db('keuangan')
        .whereBetween('tanggal', [start_date, end_date])
        .andWhere("email_user", email)
        .orderBy('createdAt', 'desc')
    res.status(200).
        json({
            message: "Semua data keuangan",
            item_count: keuangan.length,
            email: email,
            keuangan: keuangan,
        })
}

exports.create = async function (req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const { judul, deskripsi, uang, pengeluaran, kategori_id, email_user } = req.body;
    if (Object.keys(req.body).length === 0) return res.status(405).end();
    const email = getEmail(req, res);
    if (email_user !== email) return res.status(405).end();
    const keuangan = await db('keuangan').insert({
        id: uuid.v4(),
        judul,
        deskripsi,
        uang,
        pengeluaran,
        kategori_id,
        tanggal: getToday,
        email_user: email,
    });
    res.status(200).
        json({
            message: "Keuangan sukses ditambahkan",
        });
}

exports.update = async function (req, res) {
    if (req.method !== 'PATCH') return res.status(405).end();
    const { id } = req.params;
    const { judul, deskripsi, uang, pengeluaran, kategori_id, email_user } = req.body;
    if (Object.keys(req.body).length === 0) return res.status(405).end();
    const email = getEmail(req, res);
    if (email_user !== email) return res.status(405).end();
    const keuangan = await db('keuangan').where({ id }).update({
        judul,
        deskripsi,
        uang,
        pengeluaran,
        kategori_id,
        tanggal: getToday,
        email_user: email,
    });
    res.status(200).
        json({
            message: "Keuangan sukses diperbarui",
        });
}

exports.delete = async function (req, res) {
    if (req.method !== 'DELETE') return res.status(405).end();
    const { id } = req.params;
    const email = getEmail(req, res);
    await db('keuangan').where({ id }).andWhere('email_user', email).del();
    res.status(200).
        json({
            message: "Keuangan sukses dihapus",
        });
}


exports.total = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const email = getEmail(req, res);
    const total_pengeluaran = await db('keuangan')
        .sum('uang as total_pengeluaran')
        .where('email_user', email)
        .andWhere('pengeluaran', 1)
        .first();
    const total_pemasukan = await db('keuangan')
        .sum('uang as total_pemasukan')
        .where('email_user', email)
        .andWhere('pengeluaran', 0)
        .first();



    const data = {
        "pengeluaran": isNull(total_pengeluaran)['total_pengeluaran'],
        "pemasukan": isNull(total_pemasukan)['total_pemasukan'],
    }
    res.json({
        "total": data,

    });
}

exports.totalHariIni = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const email = getEmail(req, res);
    const total_pengeluaran_today = await db('keuangan')
        .sum('uang as total_pengeluaran_today')
        .where('email_user', email)
        .andWhere('pengeluaran', 1)
        .andWhere('tanggal', getToday)
        .first();
    const total_pemasukan_today = await db('keuangan')
        .sum('uang as total_pemasukan_today')
        .where('email_user', email)
        .andWhere('pengeluaran', 0)
        .andWhere('tanggal', getToday)
        .first();


    const data = {
        "pemasukan": isNull(total_pemasukan_today)['total_pemasukan_today'],
        "pengeluaran": isNull(total_pengeluaran_today)['total_pengeluaran_today'],
    }
    res.json({
        "total": data,
    });
}

exports.totalMingguIni = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const email = getEmail(req, res);
    const total_pengeluaran_today = await db('keuangan')
        .sum('uang as total_pengeluaran_today')
        .where('email_user', email)
        .andWhere('pengeluaran', 1)
        .whereBetween('tanggal', [getWeek, getToday])
        .first();
    const total_pemasukan_today = await db('keuangan')
        .sum('uang as total_pemasukan_today')
        .where('email_user', email)
        .andWhere('pengeluaran', 0)
        .whereBetween('tanggal', [getWeek, getToday])
        .first();


    const data = {
        "pemasukan": isNull(total_pemasukan_today)['total_pemasukan_today'],
        "pengeluaran": isNull(total_pengeluaran_today)['total_pengeluaran_today'],
    }
    res.json({
        "total": data,
    });
}
exports.totalByTanggal = async function (req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const email = getEmail(req, res);
    const { tanggal } = req.body;
    const total_pengeluaran_today = await db('keuangan')
        .sum('uang as total_pengeluaran_today')
        .where('email_user', email)
        .andWhere('pengeluaran', 1)
        .andWhere('tanggal', tanggal)
        .first();
    const total_pemasukan_today = await db('keuangan')
        .sum('uang as total_pemasukan_today')
        .where('email_user', email)
        .andWhere('pengeluaran', 0)
        .andWhere('tanggal', tanggal)
        .first();

    const data = {
        "pemasukan": isNull(total_pemasukan_today)['total_pemasukan_today'],
        "pengeluaran": isNull(total_pengeluaran_today)['total_pengeluaran_today'],
    }
    res.json({
        "tanggal": tanggal,
        "total": data,
    });
}

