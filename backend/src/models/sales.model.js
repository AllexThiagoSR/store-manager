const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection
    .execute(
      `SELECT sale_id, product_id, quantity, sales.date FROM sales 
      INNER JOIN sales_products ON sales.id = sale_id
      ORDER BY sale_id, product_id;`,
    );
  return camelize(result);
};

const getById = async (id) => {
  const [result] = await connection
    .execute(
      `SELECT product_id, quantity, sales.date FROM sales 
      INNER JOIN sales_products ON sales.id = sale_id AND sale_id = ?
      ORDER BY sale_id, product_id;`,
      [id],
    );
  return camelize(result);
};

const create = async () => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales() VALUES()');
  return insertId;
};

const insertSoldItem = async ({ saleId, productId, quantity }) => {
  const [{ insertId }] = await connection
    .execute(
      'INSERT INTO sales_products(sale_id, product_id, quantity) VALUES(?, ?, ?)',
      [saleId, productId, quantity],
    );
  return insertId;
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return affectedRows;
};

module.exports = { getAll, getById, create, insertSoldItem, deleteSale };
