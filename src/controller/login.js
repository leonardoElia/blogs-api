const serviceLogin = require('../service/login');
const generateToken = require('../generateToken');

const login = async (req, res) => {
 const { email, password } = req.body;
 const resultado = await serviceLogin.solicitarLogin(email, password);
 const { type, message } = resultado;
 if (type) return res.status(400).json({ message });
 const token = generateToken(message);
 return res.status(200).json({ token });
};

module.exports = {
    login,
};