import React from "react";
import { Card } from 'semantic-ui-react';
import { HospitalEntry } from '../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HealthCheck: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
        <div  style={{marginTop: "30px"}}>
          <Card>
            <Card.Content>
              {entry.date} <LocalHospitalIcon />
          </Card.Content>
          <Card.Content style={{fontStyle: "italic"}}>
              {entry.description}
          </Card.Content>
          <Card.Content>
            diagnose by {entry.specialist}
            </Card.Content>
          </Card>
        </div>
      );
};

export default HealthCheck;