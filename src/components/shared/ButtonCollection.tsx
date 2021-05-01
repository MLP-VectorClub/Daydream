import { FC } from 'react';
import styles from 'modules/ButtonCollection.module.scss';
import classNames from 'classnames';
import { ButtonToolbar } from 'reactstrap';

const ButtonCollection: FC<{ className?: string }> = ({ children, className }) => (
  <ButtonToolbar className={classNames('justify-content-center', styles.buttonCollection, className)}>
    {children}
  </ButtonToolbar>
);

export default ButtonCollection;
