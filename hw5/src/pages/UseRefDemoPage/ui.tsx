import {ClickTimer} from "@/features/refExamples/ClickTimer";
import {PreviousInput} from "@/features/refExamples/PreviousInput.tsx";
import {FocusTracker} from "@/features/refExamples/FocusTracker.tsx";
import {DebounceLogger} from "@/features/refExamples/DebounceLogger.tsx";
import {WebSocketLogger} from "@/features/refExamples/WebSocketLogger.tsx";

export function UseRefDemoPage() {
    return (
        <div>
            <ClickTimer/>
            <hr/>
            <PreviousInput/>
            <hr/>
            <FocusTracker/>
            <hr/>
            <DebounceLogger/>
            <hr/>
            <WebSocketLogger/>
        </div>
    );
}