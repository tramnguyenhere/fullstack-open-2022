import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    const validParameters: boolean = !isNaN(Number(height)) && !isNaN(Number(weight));
    const bmi = calculateBmi(Number(height), Number(weight));

    if (!validParameters || !weight || !height) {
        res.status(400).send({ error: "malformatted parameters" });
    }
    
    res.send({ height, weight, bmi });
});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, dailyExercises } = req.body;
    if (!(dailyExercises && target)) {
      res.status(400).send({ error: "parameters missing" });
    }
    const result = exerciseCalculator(target, dailyExercises);
    return res.send(result);
  });

const PORT = 3002;

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });