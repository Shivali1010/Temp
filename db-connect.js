const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
    user: "postgres",
    password: process.env.POSTGRESQL_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "bookpal"
});

client.connect()
    .then(() => {
        console.log("Connected  to PostgreSQL");
    })
    .catch((err) => {
        console.log("Error connecting to PostgreSQL: ", err);
    });


client.query("SELECT genres FROM books WHERE book_id = 2600", (err, result) => {
    if(err) console.log(err);
    else {
        console.log(result.rows);
        const genress = result.rows[0].genres;
        console.log(genress);
        const array = eval(genress);
        console.log(typeof array);

        for(genre of array) {
            console.log(genre);
        }
        
    }
})
module.exports = client;