// Importing Models
const db = require('../models');
const { Op } = require("sequelize");
const User = db.users;
const Room = db.rooms;

//  User Routes
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).send({ message: "User Created Successfully", user: user });
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send({ message: "Users Fetched Successfully", users: users });
    } catch (error) {
        res.status(500).json({ message: error });
    }

}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: {
                    [Op.eq]: req.params.userId
                }
            }
        });
        if (user) {
            res.status(200).send({ message: "User Fetched Successfully", users: user });
        } else {
            res.status(404).send({ message: "No user Found" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: {
                    [Op.eq]: req.params.userId
                }
            }
        });
        if (user) {
            await user.update(req.body, {
                where: {
                    id: {
                        [Op.eq]: req.params.userId
                    }
                }
            });
            res.status(200).send({ message: "User Updated Successfully" });
        }else{
            res.status(404).send({ message: "No user Found Please check the User id" });
        }

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: {
                    [Op.eq]: req.params.userId
                }
            }
        });
        if (user) {
            await User.destroy({
                where: {
                    id: {
                        [Op.eq]: req.params.userId
                    }
                }
            });
            res.status(200).send({ message: "User Deleted Successfully" });
        }else{
            res.status(404).send({ message: "No user Found Please check the User id" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


// Room Routes

exports.addRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.status(200).send({ message: "Room Added Successfully", room_details: room });
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

exports.getAllRoms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.status(200).send({ message: "Rooms Fetched Successfully", rooms: rooms });
    } catch (error) {
        res.status(500).send({ error: error })
    }
}

exports.getAllAvailableRooms = async(req, res) => {
    try {
        const room = await Room.findAll({
            where: {
                availability: {
                    [Op.eq]: 1
                }
            }
        });
        if (room) {
            res.status(200).send({ message: "Available Room Details Fetched Successfully", room: room });
        } else {
            res.status(200).send({ message: "No Avaialble Rooms Found" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


exports.getRoomDetails = async(req, res) => {
    try {
        const room = await Room.findOne({
            where: {
                id: {
                    [Op.eq]: req.params.roomId
                }
            }
        });
        if (room) {
            res.status(200).send({ message: "Room Details Fetched Successfully", room: room });
        } else {
            res.status(404).send({ message: "No Room Found" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.updateRoomDetails = async (req, res) => {
    try {
        const room = await Room.findOne({
            where: {
                id: {
                    [Op.eq]: req.params.roomId
                }
            }
        });
        if (room) {
            await room.update(req.body, {
                where: {
                    id: {
                        [Op.eq]: req.params.roomId
                    }
                }
            });
            res.status(200).send({ message: "Room Details Updated Successfully" });
        }else{
            res.status(404).send({ message: "No room Found Please check the Room id" });
        }

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findOne({
            where: {
                id: {
                    [Op.eq]: req.params.roomId
                }
            }
        });
        if (room) {
            await Room.destroy({
                where: {
                    id: {
                        [Op.eq]: req.params.roomId
                    }
                }
            });
            res.status(200).send({ message: "Room Deleted Successfully" });
        }else{
            res.status(404).send({ message: "No Room Found Please check the User id" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}



