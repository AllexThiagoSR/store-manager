const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection
    .execute('SELECT * FROM sales INNER JOIN sales_products ON sales.id = sale_id;');
  console.log(result);
  return result;
};

getAll();

module.exports = { getAll };
