import express, { Request, Response } from 'express'
import { parseAndCalculateBmi } from './bmiCalculator'

const app = express();

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const { height, weight } = req.query

  try {
    res.send({
      weight,
      height,
      bmi: parseAndCalculateBmi(height, weight)
    })
  } catch {
    res.send({ error: "malformatted parameters" })
  }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});