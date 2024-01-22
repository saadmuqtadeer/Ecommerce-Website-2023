import express  from "express";
import dotenv from "dotenv";
import colors from "colors";
import ConnectDB from "./config/db.js";
import morgan from "morgan";
import authRoute from "./routes/authRoutes.js"
import categoryRoute from "./routes/categoryRoutes.js"
import productRoute from "./routes/productRoutes.js"
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";

const __filename  = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// api object
const app = express();

// dotenv configure
dotenv.config();

// MongoDb connection
ConnectDB();

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))

// routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/products', productRoute);

// api call
app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`server runnig on port ${PORT} and mode is ${process.env.DEVE}`.bgMagenta.white)
});
