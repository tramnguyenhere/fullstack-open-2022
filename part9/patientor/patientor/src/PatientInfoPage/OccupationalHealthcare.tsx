import React from "react";
import { Card } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';
import { useStateValue } from "../state";

const HealthCheck: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue(); 
  return (
        <div>
          <Card>
            <Card.Content>
              {entry.date}
          </Card.Content>
          <Card.Content description={entry.description} />
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