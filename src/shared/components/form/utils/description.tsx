import { FormDescription } from "../../ui/form";

interface RHFDescriptionProps
  extends React.ComponentProps<typeof FormDescription> {
  description?: string;
}

export const RHFDescription = ({
  description,
  ...props
}: RHFDescriptionProps) => {
  if (!description) return null;

  return <FormDescription {...props}>{description}</FormDescription>;
};
