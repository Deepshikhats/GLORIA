import PasswordResetBox from '@/components/PasswordResetBox';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

export interface AttendenceModalProps {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
}

const ResetPasswordModal: React.FC<AttendenceModalProps> = ({
  isOpen,
  setOpen,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={setOpen} scrollBehavior={'inside'}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Reset Password
            </ModalHeader>
            <ModalBody>
              <PasswordResetBox />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ResetPasswordModal;
