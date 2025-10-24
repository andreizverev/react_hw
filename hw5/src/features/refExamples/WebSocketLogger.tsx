import {useEffect, useRef} from "react";

function handleOpen(socket: WebSocket): void {
    console.log("Connected");
    socket.send('Hello, WebSocket Echo Server!');
}

function handleMessage(event: MessageEvent): void {
    console.log(`received message: ${JSON.stringify(event.data)}`);
}

export function WebSocketLogger() {
    const webSocketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket('wss://echo.websocket.org');
        socket.addEventListener('open', _ => handleOpen(socket));
        socket.addEventListener('message', handleMessage);
        webSocketRef.current = socket;

        return () => webSocketRef.current?.close()
    }, []);
    return (
        <div>hoho</div>
    );
}