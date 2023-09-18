const calculateBmi = (height: number, weigth: number) => {
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

console.log(calculateBmi(180, 74))