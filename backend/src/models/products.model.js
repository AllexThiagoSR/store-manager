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

const update = async ({ id, newName }) => {
  const [{ affectedRows }] = await connection
    .execute('UPDATE products SET name = ? WHERE id = ?', [newName, id]);
  return affectedRows;
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  return affectedRows;
};

module.exports = { getAll, getById, create, update, deleteProduct };