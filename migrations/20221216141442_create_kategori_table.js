/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {

    return knex.schema.createTable('kategori', function (table) {
        table.string("id_kategori").primary();
        table.string('nama_kategori');
        table.enum("tipe", ["pemasukan", "pengeluaran"]);
        table.timestamps(true, true, true);
    });




};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('kategori');

};
