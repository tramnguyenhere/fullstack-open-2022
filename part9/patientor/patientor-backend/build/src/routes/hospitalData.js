"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hospitalService_1 = __importDefault(require("../services/hospitalService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/diagnoses', (_req, res) => {
    res.send(hospitalService_1.default.getNonSensitiveDiagnoses());
});
router.get('/patients', (_req, res) => {
    res.send(hospitalService_1.default.getAllPatient());
});
router.post('/patients', (req, res) => {
    try {
        const newPatient = (0, utils_1.default)(req.body);
        const addedPatient = hospitalService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
