const { Category } = require('../models');

const solicitarCriarCategoria = async (name) => {
const resultado = await Category.create({ name });
const registro = resultado.dataValues;
console.log(registro);
return registro;
};

module.exports = {
    solicitarCriarCategoria,
};