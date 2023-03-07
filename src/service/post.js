const { BlogPost, PostCategory, Category } = require('../models');

const solicitarCriarPost = async (title, content, categoryIds, user) => {
    const promises = await categoryIds.map(async (id) => {
        const category = await Category.findByPk(id);
        if (category) return true;
        
        return false;
    });
  
    const validatePromises = await Promise.all(promises);

    const validateId = validatePromises.every((e) => e === true);
    if (!validateId) return { type: 'category', message: 'one or more "categoryIds" not found' };
    const { userId } = user.data;
    const post = await BlogPost.create({ title, content, userId });
    const { id } = post.dataValues;

    const arrayPostCategory = categoryIds.map((idc) => ({
            categoryId: idc,
            postId: id,
        }));

    await PostCategory.bulkCreate(arrayPostCategory);
console.log(post);
    return { type: null, message: post.dataValues };
};

module.exports = {
    solicitarCriarPost,
  };