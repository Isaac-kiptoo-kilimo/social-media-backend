import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from './src/utils/loggers.js'
import userRouter from './src/routes/usersRoutes.js';
import cors from 'cors'
import rateLimitMiddleware from './src/middleware/rateLimitMiddleware.js';
import postRouter from './src/routes/postsRoutes.js';

const app=express();

dotenv.config();
const PORT=process.env.PORT || 5000

app.use(cors())

// Middlewares should come before the apis|routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
rateLimitMiddleware(app);

app.use('/api/v1',userRouter)
app.use('/api/v1',postRouter)

app.listen(PORT,()=>{
    logger.info(`This App is running on port : ${PORT}`);
})