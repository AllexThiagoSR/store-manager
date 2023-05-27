const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const getById = async (id) => {
  const [[result]] = await connection
    .execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
};

const create = async ({ name }) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO products(name) VALUES(?)', [name]);
  return insertId;
};

module.exports = { getAll, getById, create };