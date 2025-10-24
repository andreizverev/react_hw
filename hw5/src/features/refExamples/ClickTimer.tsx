import {useRef} from "react";

type ClickState = {
    firstClickTime: number;
    totalClickCount: number;
}

function updateState(state: ClickState): void {
    if (state.firstClickTime === -1) {
        state.firstClickTime = new Date().getTime();
        state.totalClickCount = 1;
        return;
    }
    state.totalClickCount += 1;
    const elapsedTime = new Date().getTime() - state.firstClickTime;
    console.log(`Elapsed time after the first click: ${elapsedTime}ms\nTotal clicks: ${state.totalClickCount}`);
}

export function ClickTimer() {
    const ref = useRef<ClickState>({
        firstClickTime: -1,
        totalClickCount: 0,
    });
    return (
        <div>
            <button onClick={() => updateState(ref.current)}>Click</button>
        </div>
    );
}