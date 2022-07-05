export default async function handleError(error, req, res, next) {
    console.log(error);
    if (error.type === "Unprocessable Entity") {
        return res.status(422).send(error.message);
    } else if (error.type === "unauthorized") {
        return res.status(401).send(error.message);
    } else if (error.type === "Conflict") {
        return res.status(401).send(error.message);
    }

    return res.sendStatus(500);
}