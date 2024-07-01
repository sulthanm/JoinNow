const mongoose = require('mongoose');
// const env = require('./environment');

// // const MONGODB_URI = `mongodb+srv://sulthanmogal:Sulthan7866129@cluster0.0yfoq.mongodb.net/joinow_development?retryWrites=true&w=majority`;
// // const MONGODB_URI=mongodb+srv://<username>:<password>@<clustername>.mongodb.net/
// // mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/joinow_dev');

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1/joinow_dev';

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
db = mongoose.connection
module.exports = db;



