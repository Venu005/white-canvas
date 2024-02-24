//for progrmmatic modal the approcah of creating a provider to manage all the modals keeps away all the hydration errors
"use client";

import { RenameModal } from "@/components/modals/rename-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return <RenameModal />;
};
