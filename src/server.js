const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 6000;
// const { authPage } = require("./auth");

const taskRouter = require("./routes/tasks.routes");

const authRouter = require("./routes/auth.route");
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tasks", taskRouter);

app.use("/api/auth", authRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
