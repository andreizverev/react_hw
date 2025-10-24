import {useEffect, useRef, useState} from "react";

export function PreviousInput() {
    const ref = useRef('');
    const [currentValue, setCurrentValue] = useState('');

    useEffect(() => {
        ref.current = currentValue;
    }, [currentValue]);

    return (<div>
        <input type='text' onChange={e => setCurrentValue(e.target.value)}/>
        <br/>
        <span>Предыдущее значение: {ref.current}</span>
    </div>);
}