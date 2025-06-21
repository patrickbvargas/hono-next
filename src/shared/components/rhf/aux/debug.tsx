"use client";

import { useFormContext } from "react-hook-form";

export const RHFDebug = () => {
  const { watch, formState } = useFormContext();

  return (
    <div className="fixed top-0 left-0 z-50 h-screen w-96 bg-default-50 overflow-auto border-r-1 border-default-200">
      <div className="p-2 border-b-1 border-default-200">
        <p className="uppercase font-semibold text-xs">Errors</p>
        <pre className="text-danger">
          {JSON.stringify(formState.errors, null, 2)}
        </pre>
      </div>
      <div className="p-2">
        <p className="uppercase font-semibold text-xs">Values</p>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </div>
    </div>
  );
};
