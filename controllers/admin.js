// Importing Models
const db = require('../models');
const { Op } = require("sequelize");
const User = db.User;
const Room = db.rooms;
var generator = require('generate-password');
const bcrypt = require("bcryptjs");

//  User Routes
exports.createUser = async (req, res) => {
    try {
        if(req.body.role == 0){
            return res.status(403).send({ message: "Role Forbidden"});    
        }
        if(!req.body.firstName || !req.body.email || !req.body.role){
            return res.status(422).send({ message: "Missing Information"});    
        }
        const userSameEmail = await User.findOne({
            where: {
                email: {
                    [Op.eq]: req.body.email
                }
            }
        });
        if (userSameEmail) {
            return res.status(409).send({ message: "User Email Already exists"});         
        }
        generatedPassword = req.body.firstName + "@123"
        console.log(generatedPassword);
        const user = await User.create({...req.body, password:bcrypt.hashSync(generatedPassword, 8)});
        console.log(user);
        return res.status(200).send({ message: "User Created Successfully", user: {...user, password:generatedPassword} });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).send({ message: "Users Fetched Successfully", users: users });
    } catch (error) {
        return res.status(500).json({ message: error });
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
            return res.status(200).send({ message: "User Fetched Successfully", users: user });
        } else {
            return res.status(404).send({ message: "No user Found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
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
            return res.status(200).send({ message: "User Updated Successfully" });
        }else{
            return res.status(404).send({ message: "No user Found Please check the User id" });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
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
            return res.status(200).send({ message: "User Deleted Successfully" });
        }else{
            return res.status(404).send({ message: "No user Found Please check the User id" });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}


// Room Routes

exports.addRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);
        return res.status(200).send({ message: "Room Added Successfully", room_details: room });
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getAllRoms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        return res.status(200).send({ message: "Rooms Fetched Successfully", rooms: rooms });
    } catch (error) {
        return res.status(500).send({ error: error })
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
            return res.status(200).send({ message: "Available Room Details Fetched Successfully", room: room });
        } else {
            return res.status(200).send({ message: "No Avaialble Rooms Found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
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
            return res.status(200).send({ message: "Room Details Fetched Successfully", room: room });
        } else {
            return res.status(404).send({ message: "No Room Found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
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
            return res.status(200).send({ message: "Room Details Updated Successfully" });
        }else{
            return res.status(404).send({ message: "No room Found Please check the Room id" });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
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
            return res.status(200).send({ message: "Room Deleted Successfully" });
        }else{
            return res.status(404).send({ message: "No Room Found Please check the User id" });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}



