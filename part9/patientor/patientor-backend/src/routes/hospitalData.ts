import express from 'express';
import hospitalService from '../services/hospitalService';

const router = express.Router();


router.get('/diagnoses', (_req, res) => {
    res.send(hospitalService.getNonSensitiveDiagnoses());
});

router.get('/patients', (_req, res) => {
    res.send(hospitalService.getAllPatient());
});

router.post('/patients', (req, res) => {
    const { id, name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = hospitalService.addPatient({
        id, name, dateOfBirth, ssn, gender, occupation
    });
    res.json(newPatient);
});

export default router;