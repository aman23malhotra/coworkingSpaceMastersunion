module.exports = {
    HOST:"localhost",
    USER:"root",
    password:"root",
    DB:"room_booking_app",
    dialect:"mysql",
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}