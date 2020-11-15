import React, { FC } from 'react';
import styles from 'modules/ButtonCollection.module.scss';
import classNames from 'classnames';
import { ButtonToolbar } from 'reactstrap';

const ButtonCollection: FC = ({ children }) => (
  <ButtonToolbar className={classNames('justify-content-center', styles.buttonCollection)}>
    {children}
  </ButtonToolbar>
);

export default ButtonCollection;
