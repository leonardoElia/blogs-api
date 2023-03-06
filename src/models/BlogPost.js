/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize, DataTypes) => {
    const blogPost = sequelize.define('BlogPost', {
        id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title:{type: DataTypes.STRING},
        content:{type: DataTypes.STRING},
        userId:{type: DataTypes.INTEGER, foreignKey: true},
        published:{type: DataTypes.DATE},
        updated:{type: DataTypes.DATE},
    }, 
    
    {
     tableName:'blog_posts',
     underscored:true,
    })

    blogPost.associate = (models) => {
        blogPost.belongsTo(models.User, {
            foreignKey: 'userId', 
            as: 'users'
        })
    }
 return blogPost;

}