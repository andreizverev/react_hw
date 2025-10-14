import {useEffect, useRef, useState} from "react";

export function DebounceLogger() {
    const [value, setValue] = useState('');
    const timerIdRef = useRef<number>(-1);

    useEffect(() => {
        if (!value) {
            return;
        }
        if (timerIdRef.current !== -1) {
            clearTimeout(timerIdRef.current);
        }
        timerIdRef.current = setTimeout(() => {
            console.log(`Debounced value: ${value}`)
        }, 1000)

    }, [value])

    return (
        <div>
            <input defaultValue={value} onChange={e => setValue(e.target.value)}/>
        </div>
    );
}