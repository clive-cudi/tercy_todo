import { useState, useEffect, Dispatch } from "react";
import { useHasMounted } from "../useHasMounted/useHasMounted";

export function useStickyState(defaultValue: any, key: any): [any, Dispatch<any>] {
    const hasMounted = useHasMounted();
    const [value, setValue] = useState(()=>{
        const stickyValue = hasMounted ? window.localStorage.getItem(key) : defaultValue;

        return stickyValue !== null ? stickyValue : defaultValue
    })

    useEffect(()=>{
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}