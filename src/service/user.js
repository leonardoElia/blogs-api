const { User } = require('../models');

const solicitarCriarUsuario = async (displayName, email, password, image) => {
    const verificaUser = await User.findOne({ where: { email } });
    if (verificaUser) {
      return { type: 'email já existe', message: 'User already registered' };
    }
    const novoUser = await User.create({ displayName, email, password, image });
    return { type: null, message: novoUser };
};

module.exports = {
    solicitarCriarUsuario,
};