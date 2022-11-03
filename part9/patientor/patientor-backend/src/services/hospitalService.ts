import diagnoseData from '../../data/diagnoses.json';
import patientData from '../../data/patientEntries';
import { v1 as uuid } from 'uuid';
import { Diagnose, NonSensitiveDiagnose, Patient, PublicPatient, NewPatient, NonSensitivePatient } from '../types';

const diagnoses: Diagnose[] = diagnoseData;
const patients: Patient[] = patientData.map(
    ({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
      id,
      name,
    dateOfBirth,
      ssn,
      gender,
      occupation,
      entries
    })
  );

const getAllDiagnoses = (): Diagnose[] => {
    return diagnoses;
};

const getNonSensitiveDiagnoses = (): NonSensitiveDiagnose[] => {
    return diagnoses.map(({ code, name }) => ({
        code, name
    }));
};

const getAllPublicPatient = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const getAllPatient = (): NonSensitivePatient[] => {
    return patients;
};

const getPatientById = (id: string): NonSensitivePatient | undefined => {
    const entry = patients.find(p => p.id === id);
    return entry;
};

const addPatient = (entry: NewPatient): Patient => {
    const newPatient = {id: uuid(), ...entry};
    patients.push(newPatient);
    return newPatient;
};

export default { getAllDiagnoses, getNonSensitiveDiagnoses, getAllPublicPatient, addPatient, getPatientById, getAllPatient };