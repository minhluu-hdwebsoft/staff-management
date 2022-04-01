import React, { createContext, ReactElement, ReactNode, useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

interface ModalProps {
  title?: string;
  okText?: string;
  cancelText?: string;
  footer?: ReactNode;
  confirmLoading?: boolean;
  content?: ReactElement | ReactElement[];
  onOk?: () => void | Promise<void>;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full";
}

interface ModalProviderProps {
  children?: ReactElement | ReactElement[];
  onOpen?: () => void;
  onClose?: () => void;
}

export interface ModalCustomType {
  isOpen: boolean;
  open: (config: ModalProps) => void;
  close: () => void;
}

export const ModalCustomContext = createContext<ModalCustomType>({
  isOpen: false,
  open: () => {
    console.log("Open modal");
  },
  close: () => {
    console.log("Close modal");
  },
});

// const defautlModalProps: ModalProps = {};

export const ModalCustomProvider = (props: ModalProviderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalConfig, setModalConfig] = useState<ModalProps>({});

  const open = (config: ModalProps) => {
    console.log("Open modal");
    setModalConfig(config);
    onOpen();
  };

  const close = () => {
    console.log("close modal");
    onClose();
  };

  return (
    <ModalCustomContext.Provider value={{ isOpen, open, close }}>
      <Modal isOpen={isOpen} onClose={onClose} size={modalConfig.size || "lg"}>
        <ModalOverlay />
        <ModalContent>
          {modalConfig.title && <ModalHeader>{modalConfig.title}</ModalHeader>}
          <ModalCloseButton />
          <ModalBody>{modalConfig.content}</ModalBody>

          {modalConfig.footer === null
            ? ""
            : modalConfig.footer || (
                <ModalFooter>
                  <Button mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme="blue">Secondary Action</Button>
                </ModalFooter>
              )}
        </ModalContent>
      </Modal>
      {React.useMemo(() => props.children, [])}
    </ModalCustomContext.Provider>
  );
};

export const useModal = () => useContext(ModalCustomContext);
