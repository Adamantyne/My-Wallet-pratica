import connection from "../database.js";

async function getUserByEmail(email){
    const { rows } = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
    );
    return rows;
}
async function insertUser(name, email, hashedPassword){
    return await connection.query(
        `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
        [name, email, hashedPassword]
    );
}

const authRepository = {getUserByEmail,insertUser};
export default authRepository;