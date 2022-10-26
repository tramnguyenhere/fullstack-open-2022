import express from 'express';
import cors from 'cors';
import hospitalData from './routes/hospitalData';
const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.use('/api', hospitalData);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});