import authServices from "../services/authServices.js";

export async function signIn(req, res) {
    const { email, password } = req.body;
    const token = authServices.createToken(email, password);
    res.send(token);
}

export async function signUp(req, res) {
    const { name, email } = req.body;
    await authServices.signUpService(name, email,password);
    res.sendStatus(201);
}
