import { FormLabel } from "../../ui/form";

interface RHFLabelProps extends React.ComponentProps<typeof FormLabel> {
  label?: string;
  isRequired?: boolean;
}

export const RHFLabel = ({ label, isRequired, ...props }: RHFLabelProps) => {
  if (!label) return null;

  return (
    <FormLabel {...props}>
      {label}
      {isRequired && <span className="text-destructive">*</span>}
    </FormLabel>
  );
};
