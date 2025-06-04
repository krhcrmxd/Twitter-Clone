import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, forwardRef } from "react";

interface Props extends ComponentPropsWithoutRef<"textarea"> {
    label: string;
    labelClass?: string;
}

export const TextareaWithLabel = forwardRef<HTMLTextAreaElement, Props>(
    ({ id, label, labelClass, className, ...props }, ref) => {
        return (
            <div className="grid w-full gap-1.5">
                <Label
                    htmlFor={id}
                    className={cn(labelClass)}
                >
                    {label}
                </Label>
                <Textarea
                    placeholder="Type your message here."
                    id={id}
                    className={cn(className)}
                    {...props}
                    ref={ref}
                />
            </div>
        );
    }
);

TextareaWithLabel.displayName = "InputWithLabel";
