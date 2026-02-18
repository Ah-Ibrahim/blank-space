import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";

const spinnerVariants = cva(
  "text-muted-foreground animate-spin aspect-square",
  {
    variants: {
      size: {
        default: "w-4",
        sm: "w-2",
        lg: "w-6",
        icon: "w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type SpinnerProps = VariantProps<typeof spinnerVariants>;

function Spinner({ size }: SpinnerProps) {
  return <LoaderCircle className={cn(spinnerVariants({ size }))} />;
}
export default Spinner;
