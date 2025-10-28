let socket: WebSocket | null = null;
let listeners: ((data: any) => void)[] = [];

export function connectWebSocket(url = "ws://localhost:8000") {
    if (socket && socket.readyState === WebSocket.OPEN) return socket;

    socket = new WebSocket(url);

    socket.onopen = () => {
        console.log("Connected to ROS2 WebSocket server");
    };

    socket.onmessage = (event) => {
        try {
            const message = JSON.parse(event.data);
            // console.log(message)
            listeners.forEach((cb) => cb(message));
        } catch (err) {
            console.error("Invalid WebSocket data:", event.data);
        }
    };

    socket.onclose = () => {
        console.warn("⚠️ WebSocket disconnected — retrying...");
        setTimeout(() => connectWebSocket(url), 2000); // auto-
    };

    return socket;
}

export function onMessage(callback: (data: any) => void) {
    listeners.push(callback);
    return () => {
        listeners = listeners.filter((cb) => cb !== callback);
    };
}
