import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());

const PORT = 3001;
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get('/api/ping', (_req, res) => {
    console.log('Someone has pinged.');
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});