import diagnoseData from '../../data/diagnoses.json';
import patientData from '../../data/patientEntries';
import { v1 as uuid } from 'uuid';
import { Diagnose, NonSensitiveDiagnose, Patient, NonSensitivePatientData, NewPatient } from '../types';

const diagnoses: Diagnose[] = diagnoseData;
const patients: Patient[] = patientData;

const getAllDiagnoses = (): Diagnose[] => {
    return diagnoses;
};

const getNonSensitiveDiagnoses = (): NonSensitiveDiagnose[] => {
    return diagnoses.map(({ code, name }) => ({
        code, name
    }));
};

const getAllPatient = (): NonSensitivePatientData[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = (entry: NewPatient): Patient => {
    const newPatient = {id: uuid(), ...entry};
    patients.push(newPatient);
    return newPatient;
};

export default { getAllDiagnoses, getNonSensitiveDiagnoses, getAllPatient, addPatient };