import authServices from "../services/authServices.js";

export async function signIn(req, res) {
    const {user} = res.locals.userData;
    const token = await authServices.createToken(user);
    res.send(token);
}

export async function signUp(req, res) {
    const { name, email,password } = res.locals.userData;
    await authServices.createUser(name, email,password);
    res.sendStatus(201);
}
