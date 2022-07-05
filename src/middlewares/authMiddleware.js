import authRepository from "../repositories/authRepository.js";

export async function signInMiddleware(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        throw {
            type: "Unprocessable Entity",
            message: "all required"
        }
    }

    const rows = authRepository.getUserByEmail(email);
    const [user] = rows;

    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw {
            type: "unauthorized",
            message: "incorrect password"
        }
    }
    
    next();
}


export async function signUpMiddleware(req, res, next) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw {
            type: "Unprocessable Entity",
            message: "all required"
        }
    }

    const existingUsers = authRepository.getUserByEmail(email);

    if (existingUsers.rowCount > 0) {
        throw {
            type: "Conflict",
            message: "user already exist"
        }
    }

    next();
}