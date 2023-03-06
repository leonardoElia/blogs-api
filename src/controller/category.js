const serviceCategory = require('../service/category');

const criarCategoria = async (req, res) => {
    const { name } = req.body;
    const resultado = await serviceCategory.solicitarCriarCategoria(name);
    return res.status(201).json(resultado);
};

const listarCategorias = async (_req, res) => {
    const resultado = await serviceCategory.solicitarListamentoCategorias();
    return res.status(200).json(resultado);
};
module.exports = {
    criarCategoria,
    listarCategorias,
};