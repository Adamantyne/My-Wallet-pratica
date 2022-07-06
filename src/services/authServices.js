import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import authRepository from "../repositories/authRepository.js";

async function createToken(user) {
    const token = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET
    );
    return { token }
}
async function createUser(name, email, password) {
    const hashedPassword = bcrypt.hashSync(password, 12);
    return await authRepository.insertUser(name, email, hashedPassword);
}
async function signInValidator(email, password) {
    if (!email || !password) {
        throw {
            type: "Unprocessable Entity",
            message: "all required"
        }
    }

    const rows = await authRepository.getUserByEmail(email);
    const [user] = rows;

    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw {
            type: "unauthorized",
            message: "incorrect password"
        }
    }
    return user;
}

async function signUpValidator(name, email, password) {
    if (!name || !email || !password) {
        throw {
            type: "Unprocessable Entity",
            message: "all required"
        }
    }
    const existingUsers = await authRepository.getUserByEmail(email);

    if (existingUsers.rowCount > 0) {
        throw {
            type: "Conflict",
            message: "user already exist"
        }
    }
}

const authServices = { createToken, createUser, signInValidator, signUpValidator };
export default authServices;