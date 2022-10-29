import express from 'express';
import hospitalService from '../services/hospitalService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/diagnoses', (_req, res) => {
    res.send(hospitalService.getNonSensitiveDiagnoses());
});

router.get('/patients', (_req, res) => {
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(hospitalService.getAllPatient());
});

router.post('/patients', (req, res) => {
    try {
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

        const newPatient = toNewPatient(req.body);
        const addedPatient = hospitalService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;