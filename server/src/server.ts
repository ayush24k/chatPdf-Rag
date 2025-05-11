import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { rootRouter } from "./routes";

dotenv.config();
const PORT = process.env.PORT;


const app = express();

app.use(cors());

app.use('/api/', rootRouter);

app.listen(PORT, () => {
    console.log(`listening on pot ${PORT}\nlink: http://localhost:${PORT}`);
});