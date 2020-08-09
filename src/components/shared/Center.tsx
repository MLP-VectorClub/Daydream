import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { ReactNode } from 'react';
import classNames from 'classnames';

interface CenterProps {
  header?: ReactNode;
  className?: string;
  color?: string;
}

const Center: React.FC<CenterProps> = ({ children, header, className, color }) => (
  <Modal className={classNames({ [`modal-${color}`]: color }, className)} centered backdrop={false} fade={false} isOpen>
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
