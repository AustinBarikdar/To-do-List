import JWT from "jsonwebtoken"

const authUser = async (req, res, next) => {
    const {token} = req.cookies;


    if (!token) {
        return res.json({ success: false, message: "Unauthorized, Login again" });
    }

    try {
        
        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        if (decoded.id) {
            req.body.userId = decoded.id;
        }else{
            return res.json({ success: false, message: "Unauthorized, Login again" });
        }

        next();

    }catch {
        return res.json({ success: false, message: error.message });
    }
}

export default authUser;
