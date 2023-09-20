import cors from 'cors';
import express, { Request, Response } from 'express';

import { parseAndCalculateBmi } from './bmiCalculator';
import { parseInputCalculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const { height, weight } = req.query;

  try {
    res.send({
      weight,
      height,
      bmi: parseAndCalculateBmi(height, weight)
    });
  } catch {
    res.send({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.send(parseInputCalculateExercises(Number(target), daily_exercises));
  } catch (error) {
    res.send(error);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});