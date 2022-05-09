module.exports = (sequelize, DataTypes) =>{
    const Record = sequelize.define("Record", {
        concept: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
        }
    })
    Record.associate = (models) =>{
        
    }
    return Record
}