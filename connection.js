const mongoose = require('mongoose');
require('dotenv').config();


async function main() {

    mongoose.set('strictQuery', false);

    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.xu20vko.mongodb.net/userDB`);

    console.log("Mongodb is connected");
}
main();