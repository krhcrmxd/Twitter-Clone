import { useCallback, useState } from "react";

export const useToggleState = (init?: boolean) => {
    const [toggle, setToggle] = useState<boolean>(init || false);

    const handleToggle = useCallback(() => {
        setToggle(!toggle);
    }, [toggle]);

    return [toggle, handleToggle] as const;
};
