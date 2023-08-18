module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("Users", {
        firstname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastname:{
            type:DataTypes.STRING,
            allowNull:true,
            defaultValue:null
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        role:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    }, {timestamps:true})
    return User;
}