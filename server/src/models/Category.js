module.exports = (sequelize, DataTypes) =>{
    const Category = sequelize.define("Category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
    Category.associate = (models) =>{
        Category.hasMany(models.Record)
    }
    return Category
}