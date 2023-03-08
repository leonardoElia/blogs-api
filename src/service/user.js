const { User } = require('../models');

const solicitarCriarUsuario = async (displayName, email, password, image) => {
    const verificaUser = await User.findOne({ where: { email } });
    if (verificaUser) {
      return { type: 'email já existe', message: 'User already registered' };
    }
    const novoUser = await User.create({ displayName, email, password, image });
    return { type: null, message: novoUser };
};

const solicitarListamentoUsuario = async () => {
const usuarios = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
});
return usuarios;
};

const solcitarUsuario = async (id) => {
    const usuario = await User.findByPk(id);
    if (!usuario) {
  return { type: 'usuario não encontrado', message: 'User does not exist' };
    }
    delete usuario.dataValues.password;
    return { type: null, message: usuario };
};

const solicitarDeletarUsuario = async (user) => {
  const { userId } = user.data;
  await User.destroy({ where: { id: userId } });
};

module.exports = {
    solicitarCriarUsuario,
    solicitarListamentoUsuario,
    solcitarUsuario,
    solicitarDeletarUsuario,
};