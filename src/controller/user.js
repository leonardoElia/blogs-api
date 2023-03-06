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

module.exports = {
    criarUser,
};