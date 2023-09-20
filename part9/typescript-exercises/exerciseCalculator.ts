interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(hour => hour > 0).length;
  const average = hours.reduce((acc, current) => acc + current) / periodLength;
  const success = average >= target;
  let rating, ratingDescription;

  if (success && trainingDays === periodLength) {
    rating = 3;
    ratingDescription = "It was successful";
  }
  else if (average >= target - 1) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";

  } else {
    rating = 1;
    ratingDescription = "Bad. Keep training to get better";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

export const parseInputCalculateExercises = (
  targetRaw: any,
  exercisesRaw: any[]
) => {
  if (!targetRaw || exercisesRaw.length === 0) {
    throw "parameters missing";
  }

  const exercises = exercisesRaw.map((e) => parseFloat(e));
  const target = parseFloat(targetRaw);

  if (Number.isNaN(target) || exercises.some((e) => isNaN(e))) {
    throw "malformatted parameters";
  }

  return calculateExercises(exercises, target);
};

if (process.argv.length > 2) {
  const [, , target, ...exercises] = process.argv;

  console.log(parseInputCalculateExercises(target, exercises));
}