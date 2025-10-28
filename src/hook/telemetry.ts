"use client";
import { useEffect, useState } from "react";
import { connectWebSocket, onMessage } from "@/lib/ws";

export function useTelemetry() {
    const [telemetry, setTelemetry] = useState<any>();

    useEffect(() => {
        connectWebSocket();

        const unsubscribe = onMessage((msg) => {
            setTelemetry(msg);
        });

        return () => unsubscribe();
    }, []);

    return telemetry;
}
