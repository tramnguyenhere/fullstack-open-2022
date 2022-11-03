import React from "react";
import { Card } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';
import { useStateValue } from "../state";
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';

const HealthCheck: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue(); 
  return (
        <div  style={{marginTop: "30px"}}>
          <Card>
            <Card.Content>
              {entry.date} <MedicationLiquidIcon />
          </Card.Content>
          <Card.Content style={{ fontStyle: "italic" }} description={entry.description} />
          <Card.Content>
              diagnose by {entry.specialist}
          </Card.Content>
          {entry.diagnosisCodes?.map(d => {
            return (
              <Card.Content key={d}>
                - {d} {diagnoses[d].name}
              </Card.Content>
            );
           })}
          </Card>
        </div>
      );
};

export default HealthCheck;