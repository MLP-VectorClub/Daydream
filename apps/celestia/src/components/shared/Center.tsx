import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FC, PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';

interface CenterProps extends PropsWithChildren {
  header?: ReactNode;
  className?: string;
  color?: string;
}

const Center: FC<CenterProps> = ({ children, header, className, color }) => (
  <Modal className={classNames(className, color && `modal-${color}`)} centered backdrop={false} fade={false} isOpen>
    {typeof header !== 'undefined' && <ModalHeader className="justify-content-center">{header}</ModalHeader>}
    <ModalBody>{children}</ModalBody>
  </Modal>
);

export default Center;
