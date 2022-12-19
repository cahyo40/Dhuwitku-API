'use-strict';

module.exports = function (app) {
    var posts = require('../controller/posts')
    var users = require('../controller/users')
    var ktg = require('../controller/kategori')
    var uang = require('../controller/keuangan')

    app.route("/posts").get(posts.fetch);
    app.route("/posts").post(posts.create);
    app.route('/posts/:id').get(posts.detail);
    app.route('/posts/:id').patch(posts.update);
    app.route('/posts/:id').delete(posts.delete);


    app.route('/login').post(users.login);
    app.route('/register').post(users.register);

    app.route('/kategori').get(ktg.fetch);
    app.route('/kategori').post(ktg.create);
    app.route('/kategori/:id').get(ktg.detail);
    app.route('/kategori/:id').patch(ktg.update);
    app.route('/kategori/:id').delete(ktg.delete);
    app.route('/kategori/filter').post(ktg.filterByTipe);

    app.route('/keuangan').get(uang.fetch);
    app.route('/keuangan/filter').post(uang.fetchByKategori);
    app.route('/keuangan/range').post(uang.fetchRangeByDate);
    app.route('/keuangan').post(uang.create);
    app.route('/keuangan/:id').patch(uang.update);
    app.route('/keuangan/:id').delete(uang.delete);
    app.route('/keuangan/total').get(uang.total);
    app.route('/keuangan/totalToday').get(uang.totalHariIni);
    app.route('/keuangan/totalWeek').get(uang.totalMingguIni);
    app.route('/keuangan/totalByTgl').post(uang.totalByTanggal);
}
