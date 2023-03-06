const { Category } = require('../models');

const solicitarCriarCategoria = async (name) => {
const resultado = await Category.create({ name });
const registro = resultado.dataValues;
console.log(registro);
return registro;
};

const solicitarListamentoCategorias = async () => {
    const resultado = await Category.findAll();
    return resultado;
};

module.exports = {
    solicitarCriarCategoria,
    solicitarListamentoCategorias,
};
