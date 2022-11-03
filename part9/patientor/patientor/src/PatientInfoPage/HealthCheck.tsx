import React from "react";
import { Card } from 'semantic-ui-react';
import { HealthCheckEntry, HealthCheckRating } from '../types';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {

  const healthCheckRate:HealthCheckRating = entry.healthCheckRating;

  let color;
  switch (healthCheckRate) {
    case 0:
      color = 'green';
      break;
    case 1:
      color = 'yellow';
      break;
    case 2:
      color = 'yellow';
      break;
    case 3:
      color = 'red';
      break;
    default:
      color = 'black';
  }

    return (
        <div  style={{marginTop: "30px"}}>
          <Card>
            <Card.Content>
              {entry.date} <LocalPharmacyIcon />
            </Card.Content>
          <Card.Content style={{ fontStyle: "italic" }} description={entry.description} />
          <Card.Content><FavoriteIcon style={{ color: `${color}`}} /></Card.Content>
            <Card.Content>
            diagnose by {entry.specialist}
            </Card.Content>
          </Card>
        </div>
      );
};

export default HealthCheck;
