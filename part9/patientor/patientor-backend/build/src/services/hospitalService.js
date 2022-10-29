"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_json_1 = __importDefault(require("../../data/diagnoses.json"));
const patientEntries_1 = __importDefault(require("../../data/patientEntries"));
const uuid_1 = require("uuid");
const diagnoses = diagnoses_json_1.default;
const patients = patientEntries_1.default;
const getAllDiagnoses = () => {
    return diagnoses;
};
const getNonSensitiveDiagnoses = () => {
    return diagnoses.map(({ code, name }) => ({
        code, name
    }));
};
const getAllPatient = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients.push(newPatient);
    return newPatient;
};
exports.default = { getAllDiagnoses, getNonSensitiveDiagnoses, getAllPatient, addPatient };
