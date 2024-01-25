import { ViewIcon } from '@chakra-ui/icons';
import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from '@chakra-ui/hooks';
import React from 'react';
import { Button, Center } from '@chakra-ui/react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { Image, Text } from '@chakra-ui/react';
const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {
        children ? (<span onClick={onOpen}>{children}</span>) : (<Button d={{ base: "flex" }} onClick={onOpen} />
          /*<
          <IconButton
            d={{ base: "flex" }}
            icon={<ViewIcon />}
        onClick={onOpen} />*/
        )
      }
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>

          <ModalHeader
            fontSize="30px"
            fontFamily="sans-serif"
            display="flex"
            justifyContent="center"
          >{user.name}
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="200px"
              src={user.pic}
              alt={user.name}
            />

            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="san-serif" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
