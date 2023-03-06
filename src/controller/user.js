const serviceUsuario = require('../service/user');
const generateToken = require('../generateToken');

const criarUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const result = await serviceUsuario.solicitarCriarUsuario(displayName, email, password, image);
    const { type, message } = result;
    if (type) {
        return res.status(409).json({ message });
    }

    const token = generateToken(message);
    res.status(201).json({ token });
};

const listarUsuarios = async (_req, res) => {
    const resultado = await serviceUsuario.solicitarListamentoUsuario();
    res.status(200).json(resultado);
};

const buscarUsuario = async (req, res) => {
    const { id } = req.params;
    const resultado = await serviceUsuario.solcitarUsuario(id);
    const { type, message } = resultado;
    if (type) {
        return res.status(404).json({ message });
    }

    return res.status(200).json(message);
};

module.exports = {
    criarUser,
    listarUsuarios,
    buscarUsuario,
};