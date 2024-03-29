import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import connectToDatabase from './db/mongoose.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use(bodyParser.json());

// Other middleware and routes

// show server is running in browser
app.get('/', (req, res) => {
  res.send('Server is running');
});


app.listen(PORT, () => {
  console.log(`✨ Server is running on port ${PORT} ✨`);
});
