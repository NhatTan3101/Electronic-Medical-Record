import express from 'express';
import userRouter from './routes/user.route.js';
import { configLibraries } from './configs/lib.config.js';

const app = express();

/**  */
configLibraries(app);

app.use(userRouter);

// app.use("/api/user",userRoute)
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Back to school");
});