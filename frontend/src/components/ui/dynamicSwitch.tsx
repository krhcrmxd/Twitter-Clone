import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dispatch, SetStateAction } from "react";

interface Props {
    id: string;
    label: string;
    isDarkTheme?: boolean;
    setIsDarkTheme?: Dispatch<SetStateAction<boolean>>;
    labelClass?: string;
}

export function DynamicSwitch(props: Props) {
    return (
        <div className="flex items-center space-x-2">
            <Switch
                id={props.id}
                checked={props.isDarkTheme}
                onCheckedChange={props.setIsDarkTheme}
                className={props.isDarkTheme ? "bg-light" : ""}
            />
            <Label
                className={props.labelClass}
                htmlFor={props.id}
            >{`${props.label}`}</Label>
        </div>
    );
}
