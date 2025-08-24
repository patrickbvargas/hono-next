"use client";

import { DateInput, TimeField } from "~/shared/components/ui/datefield";

function InputTime({
  ...props
}: React.ComponentPropsWithoutRef<typeof TimeField>) {
  return (
    <TimeField className="w-full" {...props}>
      <DateInput />
    </TimeField>
  );
}

export { InputTime };
