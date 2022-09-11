import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function Alert({
  isOpen,
  onClose,
  handleDelete,
  headText,
  bodyText,
}) {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{headText}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{bodyText}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Hayır
          </Button>
          <Button colorScheme="red" ml={3} onClick={handleDelete}>
            Evet
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
