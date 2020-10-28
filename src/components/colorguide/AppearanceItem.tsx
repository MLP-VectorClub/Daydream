import { Card, CardBody, Col, Row } from 'reactstrap';
import React from 'react';
import { Appearance } from 'src/types';
import AppearanceNotes from 'src/components/colorguide/AppearanceNotes';
import SpriteColumn from 'src/components/colorguide/SpriteColumn';
import CompactColorGroups from 'src/components/colorguide/CompactColorGroups';

export interface AppearanceItemProps {
  appearance: Appearance;
}

const AppearanceItem: React.FC<AppearanceItemProps> = ({ appearance }) => (
  <Card key={appearance.id} className="appearance-item mb-3">
    <CardBody className="p-2">
      <Row noGutters>
        <SpriteColumn sprite={appearance.sprite} />
        <Col>
          <h5>{appearance.label}</h5>
          <AppearanceNotes appearance={appearance} />
          <CompactColorGroups colorGroups={appearance.colorGroups} />
        </Col>
      </Row>
    </CardBody>
  </Card>
);

export default AppearanceItem;
