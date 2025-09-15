import React from "react";
import { Button } from "./Button";

type ConfirmationModal = {
  title: string;
  body?: string;
  action: () => void;
  cancel: () => void;
};
export const ConfirmationModal: React.FC<ConfirmationModal> = ({
  title,
  body,
  action,
  cancel,
}) => {
  return (
    <div className="absolue left-0 w-full h-full h-2xp">
      <h1 className="text-black text-2sm mb-3 text-center">{title}</h1>
      {body && <p className="text-zinc-500">{body}</p>}

      <div className="flex justify-between items-center">
        <Button onClick={action}>Confirm</Button>
        <Button onClick={cancel} variant="ghost">
          Cancel
        </Button>
      </div>
    </div>
  );
};
