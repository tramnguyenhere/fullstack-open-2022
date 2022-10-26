import express from 'express';
import hospitalService from '../services/hospitalService';

const router = express.Router();

router.get('/diagnoses', (_req, res) => {
    res.send(hospitalService.getNonSensitiveDiagnoses());
});

router.get('/patients', (_req, res) => {
    res.send(hospitalService.getAllPatient());
});

export default router;