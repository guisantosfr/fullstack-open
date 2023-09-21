import { NewPatient, Gender } from './types';

const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'ssn' in object && 'occupation' in object) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      ssn: parseSSN(object.ssn),
      occupation: parseOccupation(object.occupation),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth");
  }

  const splitDateOfBirth = dateOfBirth.split("-");

  if (splitDateOfBirth.length !== 3) {
    throw new Error("Date is in incorrect format");
  }

  const dateInNumbers = splitDateOfBirth.map((e) => parseInt(e));

  if (dateInNumbers.some((e) => isNaN(e))) {
    throw new Error("Date is in incorrect format");
  }

  return `${dateInNumbers[0]}-${dateInNumbers[1]}-${dateInNumbers[2]}`;
};

const parseGender = (gender: unknown): Gender => {
  if (gender === "male") {
    return Gender.male;
  }

  if (gender === "female") {
    return Gender.female;
  }

  if (gender === "other") {
    return Gender.other;
  }

  throw new Error("Gender can only be female or male, it was " + gender);
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

export default toNewPatientEntry;