import { configDotenv } from "dotenv";
import express from 'express';
import sequelize from './db.js'
import models from "./models/models.js";
import cors from 'cors';
import router from "./routes/index.js";
import fileUpload from 'express-fileupload';
import errorHandler from './middleware/ErrorHandlerMiddleWare.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

configDotenv();

const PORT = process.env.PORT || 5000

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router);
app.use(errorHandler)


const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	} catch(e) {
		console.log(e)
	}
}


start();
