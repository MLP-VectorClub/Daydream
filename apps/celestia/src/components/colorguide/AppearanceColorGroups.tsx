import { FC } from 'react';
import { ColorGroup } from '@mlp-vectorclub/api-types';
import styles from 'modules/AppearanceColorGroups.module.scss';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { ColorListItem } from 'src/components/colorguide/ColorListItem';
import { useAuth, usePrefs } from 'src/hooks';
import pluralize from 'pluralize';
import InlineIcon from 'src/components/shared/InlineIcon';
import ButtonCollection from 'src/components/shared/ButtonCollection';

interface PropTypes {
  colorGroups?: ColorGroup[];
}

export const AppearanceColorGroups: FC<PropTypes> = ({ colorGroups }) => {
  const { signedIn, isStaff } = useAuth();
  const prefs = usePrefs(signedIn);

  if (!colorGroups || colorGroups.length === 0) return null;

  return (
    <>
      <h2>
        <InlineIcon icon="palette" first size="xs" />
        {pluralize('Color group', colorGroups.length)}
      </h2>
      {isStaff && (
        <ButtonCollection leftAlign>
          <Button size="sm" color="ui" disabled>
            <InlineIcon icon="sort" first />
            Re-order groups
          </Button>
          <Button size="sm" color="success" disabled>
            <InlineIcon icon="plus" first />
            Create group
          </Button>
          <Button size="sm" color="ui" disabled>
            <InlineIcon icon="clone" first />
            Apply template
          </Button>
        </ButtonCollection>
      )}
      <Row className={styles.colorGroupCardRow}>
        {colorGroups.map((cg) => (
          <Col key={cg.id}>
            <Card className={styles.colorGroupCard} role="region" aria-label={`Color Group: ${cg.label}`}>
              <CardBody className="p-2">
                <h3 className="text-center">{cg.label}</h3>
                {isStaff && (
                  <ButtonCollection>
                    <Button size="sm" color="ui" disabled>
                      <InlineIcon icon="pencil-alt" first />
                      Edit
                    </Button>
                    <Button size="sm" color="danger" disabled>
                      <InlineIcon icon="trash" first />
                      Delete
                    </Button>
                  </ButtonCollection>
                )}
                <ul className="m-0 p-0">
                  {cg.colors.map((c) => (
                    <ColorListItem key={c.id} color={c} hideColorInfo={prefs?.cg_hideclrinfo} />
                  ))}
                </ul>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
