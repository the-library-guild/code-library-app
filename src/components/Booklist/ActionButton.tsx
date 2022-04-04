import { hasPerms, Perm } from "code-library-perms";

import { Button } from "@chakra-ui/react";

function ActionButton(stateTags: string[], session: any) {
  // TODO: dont display "Borrow" button if user has exceeded their booking limit
  // TODO: implement logic for canReturn

  const userInfo = session?.user;
  const userPermissions = userInfo?.permsInt || 0;

  const isBorrowed = stateTags.includes("Borrowed");
  const isAvailable = stateTags.includes("Available");
  const isProcessing = stateTags.includes("Processing");

  const canProcess = hasPerms(userPermissions, Perm.MANAGE_BOOKS);
  const canReturn = true;
  const canRent = hasPerms(userPermissions, Perm.RENT_BOOKS);

  console.log({
    isBorrowed,
    isAvailable,
    isProcessing,
    canProcess,
    canReturn,
    canRent,
  });

  if (isProcessing && canProcess)
    return <Button marginLeft={"auto"}>Process</Button>;

  if (isBorrowed && canReturn)
    return <Button marginLeft={"auto"}>Return</Button>;

  if (isAvailable && canRent)
    return <Button marginLeft={"auto"}>Borrow</Button>;
}
export { ActionButton };
