const mongoose = require('mongoose');
require('dotenv').config();


async function main() {

    mongoose.set('strictQuery', false);

    await mongoose.connect(`mongodb+srv://MERN-chatApp:aUoz0SAeo0dDW3ms@cluster0.xu20vko.mongodb.net/userDB`);

    console.log("Mongodb is connected");
}
main();
