import { toast } from 'react-toastify';
import { type PropsWithChildren, useEffectEvent, useRef } from 'react';

export function DelayedButton({ children }: PropsWithChildren) {
    const timeoutIdRef = useRef<number | null>(null);
    const handleClick = useEffectEvent(() => {
        const timeoutSec = 2;
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        }
        toast(`Button clicked and timeout is set for ${timeoutSec}sec`);
        timeoutIdRef.current = setTimeout(() => {
            toast(`Click executed after ${timeoutSec}sec`);
        }, timeoutSec * 1000);
    });

    return (
        <button onClick={handleClick}>
            {children}
        </button>
    );
}