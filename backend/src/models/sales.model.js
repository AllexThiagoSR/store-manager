const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection
    .execute(
      `SELECT sale_id, product_id, quantity, sales.date FROM sales 
      INNER JOIN sales_products ON sales.id = sale_id
      ORDER BY sales_id, product_id;`,
    );
  return camelize(result);
};

const getById = async (id) => {
  const [result] = await connection
    .execute(
      `SELECT sale_id, product_id, quantity, sales.date FROM sales 
      INNER JOIN sales_products ON sales.id = sale_id AND sale_id = ?
      ORDER BY sales_id, product_id;`,
      [id],
    );
  return camelize(result);
};

module.exports = { getAll, getById };
