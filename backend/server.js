const app = require('./app.js');
require('dotenv').config();
const connectDB = require('./src/config/db.js');

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('Server is running on the port', PORT);
})