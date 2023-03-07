const servicePost = require('../service/post');

const criarPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { user } = req;
    const resultado = await servicePost.solicitarCriarPost(title, content, categoryIds, user);
    const { type, message } = resultado;
     if (type) return res.status(400).json({ message });
  
     return res.status(201).json(message);
  } catch (e) {
    return res.status(400).json({ message: 'erro ao inserir informações' });
  }
};

const listarPost = async (_req, res) => {
  const resultado = await servicePost.solicitarListarPosts();
  return res.status(200).json(resultado);
};

module.exports = {
  criarPost,
  listarPost,
};