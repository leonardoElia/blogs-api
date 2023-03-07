/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize, DataTypes) => {
    const  postCategorie = sequelize.define('PostCategory', {
        categoryId:{ type: DataTypes.INTEGER, primaryKey: true, foreignKey: true},
        postId:{ type: DataTypes.INTEGER, primaryKey: true, foreignKey: true},
    },
    
    {
     timestamps:false,
     tableName:'posts_categories',
     underscored:true,
    })

    postCategorie.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
        as: 'blogPost',
        through: 'postCategorie',
        foreignKey: 'categoryId',
        otherKey: 'postId'
    })

    models.BlogPost.belongsToMany(models.Category, {
        as: 'category',
        through: 'postCategorie',
        foreignKey: 'postId',
        otherKey: 'categoryId'
    })
    }
 return postCategorie;

}