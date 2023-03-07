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
        include: [{ model: User, as: 'users', attributes: { exclude: ['password'] } },
                  { model: Category, as: 'category', through: { attributes: [] } },
                ],
    });
    return resultado;
};

module.exports = {
    solicitarCriarPost,
    solicitarListarPosts,
  };