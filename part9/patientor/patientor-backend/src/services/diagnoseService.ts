import diagnoseData from '../../data/diagnoses.json';
import { Diagnose, NonSensitiveDiagnose } from '../types';

const diagnoses: Diagnose[] = diagnoseData as Diagnose[];

const getAllDiagnoses = (): Diagnose[] => {
    return diagnoses;
};

const getNonSensitiveDiagnoses = (): NonSensitiveDiagnose[] => {
    return diagnoses.map(({ code, name }) => ({
        code, name
    }));
};

export default { getAllDiagnoses, getNonSensitiveDiagnoses };