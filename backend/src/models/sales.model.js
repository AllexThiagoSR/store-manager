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

const getProductsInSale = async ({ saleId, productId }) => {
  const [[result]] = await connection
    .execute(
      `SELECT sale_id, product_id, quantity, sales.date FROM sales_products
      INNER JOIN sales ON sales.id = sale_id AND product_id = ? AND sale_id = ?;`,
      [productId, saleId],
    );
  return camelize(result);
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return affectedRows;
};

const updateQuantity = async ({ saleId, productId, quantity }) => {
  const [{ affectedRows }] = await connection
    .execute(
      'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
      [quantity, saleId, productId],
    );
  return affectedRows;
};

module.exports = {
  getAll, getById, create, insertSoldItem, deleteSale, updateQuantity, getProductsInSale,
};
