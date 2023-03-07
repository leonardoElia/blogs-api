const servicePost = require('../service/post');

const criarPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req;
  const resultado = await servicePost.solicitarCriarPost(title, content, categoryIds, user);
  const { type, message } = resultado;
   if (type) return res.status(400).json({ message });

   return res.status(201).json(message);
};

module.exports = {
  criarPost,
};