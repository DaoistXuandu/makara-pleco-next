"use client";
import { useTelemetry } from '@/hook/telemetry';

export default function TelemetryPanel() {
    const telemetry = useTelemetry();

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Live Telemetry</h2>
            {telemetry ? (
                <pre className="bg-gray-100 p-2 rounded">
                    {JSON.stringify(telemetry, null, 2)}
                </pre>
            ) : (
                <p>Waiting for data...</p>
            )}
        </div>
    );
}