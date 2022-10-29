import express from 'express';
import cors from 'cors';
import hospitalData from './routes/hospitalData';
const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));

const PORT = 3001;

app.use('/api', hospitalData);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});