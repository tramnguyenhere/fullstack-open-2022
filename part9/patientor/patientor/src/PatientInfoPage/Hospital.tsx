import React from "react";
import { Card } from 'semantic-ui-react';
import { HospitalEntry } from '../types';

const HealthCheck: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
        <div>
          <Card>
            <Card.Content>
              {entry.date}
            </Card.Content>
            <Card.Content description={entry.description} />
          </Card>
        </div>
      );
};

export default HealthCheck;