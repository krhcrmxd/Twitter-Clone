import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, forwardRef } from "react";

interface InputWithLabelProps extends ComponentPropsWithoutRef<"input"> {
    label: string;
    labelClass?: string;
    inputClass?: string;
}

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
    ({ id, label, labelClass, inputClass, className, ...props }, ref) => {
        return (
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label
                    htmlFor={id}
                    className={cn(labelClass)}
                >
                    {label}
                </Label>
                <Input
                    id={id}
                    className={cn(inputClass, className)}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);

InputWithLabel.displayName = "InputWithLabel";
