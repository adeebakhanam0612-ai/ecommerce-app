const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

    let token;

    // CHECK TOKEN
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        try {

            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, "secretkey");

            req.user = decoded;

            next();

        } catch (error) {

            return res.status(401).json({
                message: "Not Authorized"
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "No Token Found"
        });
    }
};
const admin = (req, res, next) => {

    if (req.user && req.user.role === "admin") {

        next();

    } else {

        return res.status(403).json({
            message: "Admin Access Only"
        });
    }
};


module.exports = {
    protect,
    admin
};