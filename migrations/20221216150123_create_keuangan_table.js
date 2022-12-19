/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('keuangan', function (table) {
        table.string("id").primary();
        table.string('judul');
        table.text('deskripsi');
        table.integer('uang');
        table.boolean('pengeluaran').defaultTo(true);
        table.string('kategori_id');
        table.string('tanggal');
        table.string('email_user');
        table.timestamps(true, true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('keuangan');

};
