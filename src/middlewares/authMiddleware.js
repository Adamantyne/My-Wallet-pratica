import authRepository from "../repositories/authRepository.js";

import authServices from "../services/authServices.js";

export async function signInMiddleware(req, res, next) {
    const { email, password } = req.body;
    const user = await authServices.signInValidator(email, password);
    res.locals.userData = {user};
    next();
}


export async function signUpMiddleware(req, res, next) {
    const { name, email, password } = req.body;
    await authServices.signUpValidator(name, email, password);
    res.locals.userData = {name, email, password};
    next();
}