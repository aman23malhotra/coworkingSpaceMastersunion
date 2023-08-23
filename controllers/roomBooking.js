const db = require('../models');
const { Op, where } = require("sequelize");
const User = db.User;
const Room = db.rooms;
const roomBookings = db.roomBookings;


// TODO: Check All the cases 
exports.roomBooking = async (req, res) => {
    try {
        let alreadyBookedRoom = await roomBookings.findOne({
            where: {
                userId: req.userId,
                date: new Date(req.body.date),
                start_time: req.body.start_time,
                end_time: req.body.end_time,
            }
        })
        if (alreadyBookedRoom) {
            return res.status(403).send({ message: "You have Already Booked a room at this slot" })
        }
        let previousBookings = await roomBookings.findOne({
            where: {
                roomId: req.params.roomId,
                date: new Date(req.body.date),
                start_time: req.body.start_time,
                end_time: req.body.end_time,
            },
            include: [{
                model: User,
                required: true,
            }, {
                model: Room,
                required: true,
            }
            ]
        })
        if (previousBookings) {
            if (req.userRole == 0) {
                let previousRoomBookingDestroyed = await roomBookings.destroy({
                    where: {
                        roomId: req.params.roomId,
                        date: new Date(req.body.date),
                        start_time: req.body.start_time,
                        end_time: req.body.end_time,
                    },
                    include: [{
                        model: User,
                        required: true,
                    }, {
                        model: Room,
                        required: true,
                    }
                    ]
                });

                if (previousRoomBookingDestroyed) {
                    let newBooking = await roomBookings.create({
                        userId: req.userId,
                        roomId: req.params.roomId,
                        date: new Date(req.body.date),
                        start_time: req.body.start_time,
                        end_time: req.body.end_time,
                    })
                    if (newBooking) {
                        return res.status(200).send({ message: "Bookings Over Ruled Succsessfully", booking_details: newBooking })
                    }
                } else {
                    return res.status(500).send({ message: "There is an error Over ruling the Booking, Please try again later" })
                }
            } else if (req.userRole == 1) {
                if (previousBookings.User.role === 2 || previousBookings.User.role === 3) {
                    let previousRoomBookingDestroyed = await roomBookings.destroy({
                        where: {
                            roomId: req.params.roomId,
                            date: new Date(req.body.date),
                            start_time: req.body.start_time,
                            end_time: req.body.end_time,
                        },
                        include: [{
                            model: User,
                            required: true,
                        }, {
                            model: Room,
                            required: true,
                        }
                        ]
                    });

                    if (previousRoomBookingDestroyed) {
                        let newBooking = await roomBookings.create({
                            userId: req.userId,
                            roomId: req.params.roomId,
                            date: new Date(req.body.date),
                            start_time: req.body.start_time,
                            end_time: req.body.end_time,
                        })
                        if (newBooking) {
                            return res.status(200).send({ message: "Bookings Over Ruled Succsessfully", booking_details: newBooking })
                        }
                    } else {
                        return res.status(500).send({ message: "There is an error Over ruling the Booking, Please try again later" })
                    }
                }
                return res.status(403).send({ message: "Forbidden Request" });
            }
            else if (req.userRole == 2) {
                if (previousBookings.User.role === 3) {
                    let previousRoomBookingDestroyed = await roomBookings.destroy({
                        where: {
                            roomId: req.params.roomId,
                            date: new Date(req.body.date),
                            start_time: req.body.start_time,
                            end_time: req.body.end_time,
                        },
                        include: [{
                            model: User,
                            required: true,
                        }, {
                            model: Room,
                            required: true,
                        }
                        ]
                    });

                    if (previousRoomBookingDestroyed) {
                        let newBooking = await roomBookings.create({
                            userId: req.userId,
                            roomId: req.params.roomId,
                            date: new Date(req.body.date),
                            start_time: req.body.start_time,
                            end_time: req.body.end_time,
                        })
                        if (newBooking) {
                            return res.status(200).send({ message: "Bookings Over Ruled Succsessfully", booking_details: newBooking })
                        }
                    } else {
                        return res.status(500).send({ message: "There is an error Over ruling the Booking, Please try again later" })
                    }
                }
                return res.status(403).send({ message: "Forbidden Request" });

            }
            else {
                return res.status(403).send({ message: "Forbidden Request" });
            }
        }else{
            let newBooking = await roomBookings.create({
                userId: req.userId,
                roomId: req.params.roomId,
                date: new Date(req.body.date),
                start_time: req.body.start_time,
                end_time: req.body.end_time,
            })
            if (newBooking) {
                return res.status(200).send({ message: "Bookings Added Succsessfully", booking_details: newBooking })
            }
        }
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" })
    }
}

exports.myroombookings = async (req, res) => {
    try {
        let myBookings = await roomBookings.findAll({
            include: [{
                model: User,
                required: true,
                where: { id: req.userId }
            }, {
                model: Room,
                required: true,
            }
            ]
        })
        res.status(200).send({ message: "Bookings Fetched Successfully", bookings: myBookings });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

exports.allroombookings = async (req, res) => {
    try {
        let allBookings = await roomBookings.findAll({
            include: [{
                model: User,
                required: true
            }, {
                model: Room,
                required: true,
            }
            ]
        })
        res.status(200).send({ message: "Bookings Fetched Successfully", bookings: allBookings });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        const room = await roomBookings.findOne({
            where: {
                id: {
                    [Op.eq]: req.params.roomBookingId
                }
            },
            include: [{
                model: User,
                required: true
            }]
        });
        console.log("room", room);
        if (room) {
            if (req.userRole === 0 || req.userId === room.User.id) {
                await roomBookings.destroy({
                    where: {
                        id: {
                            [Op.eq]: req.params.roomBookingId
                        }
                    }
                });
                return res.status(200).send({ message: "Room Bookings Deleted Successfully" });
            } else {
                return res.status(403).send({ message: "Request Forbidden" });
            }
        } else {
            return res.status(404).send({ message: "No Room Bookings Found Please check the Room Bookings id" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
