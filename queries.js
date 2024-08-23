const getAllUsers = "SELECT * FROM users";
const getRecordByEmail = "SELECT * FROM users WHERE email = $1";
const addUser = "INSERT INTO users (email, username, password) VALUES ($1, $2, $3)";

module.exports = {
    getAllUsers,
    getRecordByEmail,
    addUser,
};