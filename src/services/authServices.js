import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function createToken() {
    const token = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET
    );
    return { token }
}
async function signUpService(name, email,password) {
    const hashedPassword = bcrypt.hashSync(password, 12);
    return await authRepository.insertUser(name, email, hashedPassword);
}

const authServices = { createToken, signUpService };
export default authServices;