import React from 'react';
import { Patient } from '../types';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientInfoPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{patients}] = useStateValue();
   
    const patient = Object.values(patients).find(
        (patient: Patient) => patient.id === id
    );

    if (patient) {
        if (patient.gender === 'female') {
            return (
                <div>
                    <h2>
                        {patient.name} <FemaleIcon />
                    </h2>
                    <p>ssh: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                    <div>
                        <h3>
                            entries
                        </h3>
                        {patient.entries.map(entry => (
                            <div key={entry.id}>
                                <p>{entry.date} {entry.description}</p>
                                <ul>
                                    {entry.diagnosisCodes?.map(code => (
                                        <li key={code}>{code}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (patient.gender === 'male') {
            return (
                <div>
                    <h2>
                        {patient.name} <MaleIcon />
                    </h2>
                    <p>ssh: {patient.ssn}</p>

                    <p>occupation: {patient.occupation}</p>
                    <div>
                        <h3>
                            entries
                        </h3>
                        {patient.entries.map(entry => (
                            <div key={entry.id}>
                                <p>{entry.date} {entry.description}</p>
                                <ul>
                                    {entry.diagnosisCodes?.map(code => (
                                        <li key={code}>{code}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>
                        {patient.name} <TransgenderIcon />
                    </h2>
                    <p>ssh: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                    <div>
                        <h3>
                            entries
                        </h3>
                        {patient.entries.map(entry => (
                            <div key={entry.id}>
                                <p>{entry.date} {entry.description}</p>
                                <ul>
                                    {entry.diagnosisCodes?.map(code => (
                                        <li key={code}>{code}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    }

    return null;
};

export default PatientInfoPage;