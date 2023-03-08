const { BlogPost, PostCategory, Category, User, sequelize } = require('../models');

const solicitarCriarPost = async (title, content, categoryIds, user) => {
    const result = await sequelize.transaction(async (t) => {
        const promises = await categoryIds.map(async (id) => {
            const category = await Category.findByPk(id);
            if (category) return true;
            
            return false;
        });
        const validatePromises = await Promise.all(promises);
        const validateId = validatePromises.every((e) => e === true);
    if (!validateId) return { type: 'category', message: 'one or more "categoryIds" not found' };
        const { userId } = user.data;
        const post = await BlogPost.create({ title, content, userId }, { transaction: t });
        const { id } = post.dataValues;
    
        const arrayPostCategory = categoryIds.map((idc) => ({
                categoryId: idc, postId: id }));

        await PostCategory.bulkCreate(arrayPostCategory, { transaction: t });
        return { type: null, message: post.dataValues };
    });
 return result;
};

const solicitarListarPosts = async () => {
    const resultado = await BlogPost.findAll({
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
                  { model: Category, as: 'categories', through: { attributes: [] } },
                ],
    });
    return resultado;
};

const solicitarPostId = async (id) => {
    const verificaPost = await BlogPost.findByPk(id);
    if (!verificaPost) return { type: 'blog', message: 'Post does not exist' };
    const resultado = await BlogPost.findOne({
        where: { id },
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
                  { model: Category, as: 'categories', through: { attributes: [] } },
                ],
    });
   
    return { type: null, message: resultado };
};

const solicitarAtualizarPost = async (id, user, title, content) => {
    const { userId } = user.data;
     const post = await solicitarPostId(id);
     const { type, message } = post;
     if (type) return { type, message };
     if (message.userId !== userId) {
        return { type: 'não autorizado', message: 'Unauthorized user' };
     }
    
      await BlogPost.update({ title, content }, { where: { id } });
      const novoPost = await solicitarPostId(id);
      return { type: null, message: novoPost.message }; 
};

module.exports = {
    solicitarCriarPost,
    solicitarListarPosts,
    solicitarPostId,
    solicitarAtualizarPost,
  };