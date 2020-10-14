import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface CenterProps {
  header?: ReactNode;
  className?: string;
  color?: string;
}

const Center: React.FC<CenterProps> = ({ children, header, className, color }) => (
  <Modal className={classNames(className, color && `modal-${color}`)} centered backdrop={false} fade={false} isOpen>
    {Boolean(header) && (
      <ModalHeader className="justify-content-center">
        {header}
      </ModalHeader>
    )}
    <ModalBody>
      {children}
    </ModalBody>
  </Modal>
);

export default Center;
