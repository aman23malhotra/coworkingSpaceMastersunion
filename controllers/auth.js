const db = require('../models');
const { Op } = require("sequelize");
const User = db.User;
const Room = db.rooms;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//  User Routes
exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        console.log(user);
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }
        const token = await jwt.sign({ email: user.email, role:user.role },
            process.env.SECRET,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 1800, // 24 hours
            });

        // req.session.token = token;
        return res.status(200).send({
            id: user.id,
            email: user.email,
            token:token
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({
            message: "You've been signed out!"
        });
    } catch (err) {
        this.next(err);
    }
};
