module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Rooms", {
        room_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        room_thumbnail:{
            type:DataTypes.STRING,
            allowNull:false
        },
        size:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        availability:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{timestamps:true})
    return Room;
}