const express = require("express")
require("dotenv").config({ path: "./.env" })
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const path = require("path")


mongoose.connect(process.env.MONGO_URL)
const app = express()
const PORT = process.env.PORT

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true

}))

app.use(express.json()) //body parser
app.use(express.static("dist"))
app.use(express.urlencoded({ extended: true }));


app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/admin", require("./routes/adminRoutes"))
app.use("/api/orders", require("./routes/orderRoutes"))
app.use("/api/messages", require("./routes/contactUsRoutes"))


app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})

mongoose.connection.once("open", () => {
    console.log("Database Conected");
    app.listen(PORT, console.log(`http://localhost:${PORT}`))
})

mongoose.connection.on("error", (err) => {
    console.log("unable to connect to database", err)
})

