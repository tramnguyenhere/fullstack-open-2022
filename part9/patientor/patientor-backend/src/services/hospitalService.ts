import diagnoseData from '../../data/diagnoses.json';
import patientData from '../../data/patients.json';
import { Diagnose, NonSensitiveDiagnose, Patient, NonSensitivePatientData } from '../types';

const diagnoses: Diagnose[] = diagnoseData as Diagnose[];
const patients: Patient[] = patientData as Patient[];

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

export default { getAllDiagnoses, getNonSensitiveDiagnoses, getAllPatient };