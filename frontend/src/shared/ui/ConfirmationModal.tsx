import React from "react";
import { Button } from "./Button";

type ConfirmationModal = {
  title: string;
  action: () => void;
  cancel: () => void;
};
export const ConfirmationModal: React.FC<ConfirmationModal> = ({
  title,
  action,
  cancel,
}) => {
  return (
    <div className="left-0 w-full h-full">
      <h1 className="text-white text-2sm mb-3 text-center">{title}</h1>
      <div className="flex justify-between items-center">
        <Button onClick={action}>Confirm</Button>
        <Button onClick={cancel} variant="ghost">
          Cancel
        </Button>
      </div>
    </div>
  );
};
