const { productsModel } = require('../models');
const { validateProduct } = require('./validations');

const INTERNAL_SERVER_ERROR = 'Internal server error';

const getAll = async () => {
  try {
    const result = await productsModel.getAll();
    return { type: null, message: result };
  } catch (error) {
    return { type: 500, message: INTERNAL_SERVER_ERROR };
  }
};

const getById = async (id) => {
  try {
    const result = await productsModel.getById(id);
    if (!result) return { type: 404, message: 'Product not found' };
    return { type: null, message: result };
  } catch (error) {
    return { type: 500, message: INTERNAL_SERVER_ERROR };
  }
};

const create = async ({ name }) => {
  try {
    const { type, message } = validateProduct({ name });
    if (type) return { type, message };
    const id = await productsModel.create({ name });
    return { type: null, message: { id, name } };
  } catch (error) {
    return { type: 500, message: INTERNAL_SERVER_ERROR };
  }
};

const update = async ({ id, newName }) => {
  try {
    const err = validateProduct({ name: newName });
    if (err.type) return err;
    if (!(await productsModel.getById(id))) {
      return { type: 404, message: 'Product not found' };
    }
    const affectedRows = await productsModel.update({ id, newName });
    if (!affectedRows) return { type: 500, message: 'Can\'t update' };
    return { type: null, message: { id: Number(id), name: newName } };
  } catch (error) {
    return { type: 500, message: INTERNAL_SERVER_ERROR };
  }
};

const deleteProduct = async (id) => {
  try {
    const product = await productsModel.getById(id);
    if (product) return { type: null, message: '' };
    return { type: 404, message: 'Product not found' };
  } catch (error) {
    return { type: 500, message: INTERNAL_SERVER_ERROR };
  }
};

module.exports = { getAll, getById, create, update, deleteProduct };
