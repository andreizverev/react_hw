import {type RefObject, useRef} from "react";

function handleFocus(event: React.FocusEvent<HTMLInputElement>, focusChangeCounterRef: RefObject<number>): void {
    if (event.relatedTarget) {
        focusChangeCounterRef.current += 1;
        console.log(`Focus changes ${focusChangeCounterRef.current}`);
    }
}

export function FocusTracker() {
    const input1Ref = useRef<HTMLInputElement | null>(null);
    const focusChangeCounterRef = useRef(0);

    return (
        <div>
            <input ref={input1Ref} onFocus={(e) => handleFocus(e, focusChangeCounterRef)}/>
            <br/>
            <input onFocus={(e) => handleFocus(e, focusChangeCounterRef)}/>
            <br/>
            <button onClick={() => input1Ref.current?.focus()}>Сфокусироваться на первом</button>
        </div>
    );
}