export const calculateBmi = (height: number, weigth: number) => {
  const heightinMeters = height / 100
  const BMI = weigth / (heightinMeters ** 2)
  let message

  if (BMI < 16) {
    message = "Underweight (Severe thinness)"
  } else if (BMI >= 16 && BMI < 17) {
    message = "Underweight (Moderate thinness)"
  } else if (BMI >= 17 && BMI < 18.5) {
    message = "Underweight (Mild thinness)"
  } else if (BMI >= 18.5 && BMI < 25) {
    message = "Normal (healthy weight)"
  } else if (BMI >= 25 && BMI < 30) {
    message = "Overweight (Pre-obese)"
  } else if (BMI >= 30 && BMI < 35) {
    message = "Obese (Class I)"
  } else if (BMI >= 35 && BMI < 40) {
    message = "Obese (Class II)"
  } else {
    message = "Obese (Class III)"
  }

  return message
}

export const parseAndCalculateBmi = (arg1: any, arg2: any) => {
  if (!arg1 || !arg2) {
    throw "You need to provide both height and weight";
  }

  const height = parseFloat(arg1);
  const weight = parseFloat(arg2);

  if (Number.isNaN(height) || Number.isNaN(weight)) {
    throw "Both height and weight need to be numbers";
  }

  return calculateBmi(height, weight);
};

if (process.argv.length > 2) {
  console.log(parseAndCalculateBmi(process.argv[2], process.argv[3]));
}