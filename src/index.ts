import express, {Request, Response} from 'express';
import cors from 'cors';
import {createConnection} from "typeorm"
import {routes} from "./routes"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
dotenv.config()

createConnection().then(() => {
    const app = express();
    app.use(express.json());
    app.use(cookieParser())
    app.use(cors({
        origin: ['http://localhost:3000']
    }));

    routes(app)
    app.listen(8000,() => {
        console.log('listening to port 8000')
    })
})

