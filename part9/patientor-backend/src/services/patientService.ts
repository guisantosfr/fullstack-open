import { v4 as uuidv4 } from 'uuid';
import patientsData from '../data/patients';

import { NonSensitivePatientData, Patient, NewPatient } from '../types';

const patients: Patient[] = patientsData;

const getNonSensitiveDataFromPatient = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

const addPatient = (
  entry: NewPatient
): Patient => {

  const newPatient = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
}

export default {
  getNonSensitiveDataFromPatient,
  addPatient
}