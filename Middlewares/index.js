// const ensureAdminAuthenticated = (req,res,next) => {
//     // (if(res))
// }
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.isAdmin = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        let role;
        jwt.verify(token,
            process.env.secret,
            (err, decoded) => {
                if (err) {
                    return res.status(401).send({
                        message: "Unauthorized!",
                    });
                }
                role = decoded.role;
            });
        if (role != 0) {
            return res.status(403).send({
                message: "Forbidden Request",
            });
        }
        next();

    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate User role!",
        });
    }
};

exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        // Email
        user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user) {
            return res.status(409).send({
                message: "Failed! Email is already in use!"
            });
        }

        next();
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate Username!"
        });
    }
};

exports.verifyToken = (req, res, next) => {
    const tokenHeader = req?.headers['authorization'];
    const token = req?.headers['authorization']?.split(' ')[1];

    if (!tokenHeader && !token) {
        return res.status(401).send({
            message: "Unauthorized No token provided!",
        });
    }

    jwt.verify(token,
        process.env.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.email = decoded.email;
            req.userId = decoded.id;
            req.userRole = decoded.role;
            next();
        });
};