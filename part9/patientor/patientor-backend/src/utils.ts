import { NewPatient } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string';
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth) ) {
        throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
    }
    return dateOfBirth;
}; 

const parseGender = (gender: unknown): string => {
    if (!gender || !isString(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
    
const toNewPatient= ({name,dateOfBirth,ssn,gender,occupation} : Fields): NewPatient => {
  const newEntry: NewPatient = {
      name: parseName(name),
      dateOfBirth: parseDateOfBirth(dateOfBirth),
      ssn: parseSsn(ssn),
      gender: parseGender(gender),
      occupation: parseOccupation(occupation)
  };

  return newEntry;
};

export default toNewPatient;