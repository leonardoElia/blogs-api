/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
        id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        displayName:{type: DataTypes.STRING},
        email:{type: DataTypes.STRING},
        password:{type: DataTypes.STRING},
        image:{type: DataTypes.STRING},
    }, 
    
    {
     timestamps:false,
     tableName:'users',
     underscored:true,
    })

    user.associate = (models) => {
        user.hasMany(models.BlogPost, {
            foreignKey: 'userId', 
            as: 'blogs'
        })
    }
 return user;
}