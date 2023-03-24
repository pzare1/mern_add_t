import { config } from "dotenv";
config();

import express, { Request, Response } from 'express';
import Task from './models/Task';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// cors
app.use(cors({
    origin: "*"
}));

// middleware function 
app.use(express.json());

const PORT = 5006;

app.post('/tasks', async (req: Request, res: Response) => {
    const newTask = new Task({
        title: req.body.title
    });
    
    // save to database
    const createTask = await newTask.save();
    res.json(createTask);
});

app.get('/tasks', async (req: Request, res: Response) => {
    const tasks = await Task.find();
    res.json(tasks);
});

mongoose.connect(process.env.DB_URL!)
    .then(() => {
        console.log(`connected to the database on port ${PORT}`);
        app.listen(PORT);
    })
    .catch((error) => {
        console.log(error.message);
    });
