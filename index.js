const express = require("express");
const toysRoute = require("./routes/toys");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

//התחברות לmongoDB
mongoose.connect("mongodb://localhost:27017/toysRus").then(() => {
    console.log("Mongo DB connected")
}) .catch(err => {
    console.log("cannot connect db")
    process.exit(1);
})




//פעולות שיקרו לפני לפני שיגש באמת לשרת
app.use(morgan("common"))
app.use(express.json())
app.use("/toys", toysRoute)
app.use((err, req, res, next) => {
    let statusCode = res.statusCode || 500;
    let message = err.message || " ...אוי שגיאה"
    res.status(statusCode).send(message)
})



app.listen(4500, () => {
    console.log("server is litening on port 4500")
})