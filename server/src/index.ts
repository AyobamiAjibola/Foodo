import express, {Request, Response} from "express";
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import { resolve } from "path";
import morgan from "morgan";
import morganBody from "morgan-body";
import userRoutes from './routes/admin_routes/routes';
import authRoutes from './routes/auth_route/auth_route';
import db from './sequelize/models/index';

dotenv.config({ path: resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet({crossOriginEmbedderPolicy: false}));
app.use("/api", userRoutes);
app.use("/auth", authRoutes);

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else {
    morganBody(app);
}

app.get("/", (req: Request, res: Response) => {
    res.status(200).send({ data: "Welcome" });
  });

app.all("*", (req: Request, res: Response) => {
    res.status(200).send({err: "Not cool"})
});

app.listen(PORT, async () => {
    console.log(`Server running on port: ${PORT} ⚡`);
    await db.sequelize.authenticate(); //authenticate
    console.log("Connected to database successfully")
});