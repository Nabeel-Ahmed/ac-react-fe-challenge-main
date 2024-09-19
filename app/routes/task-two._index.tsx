/**
 * Task Two
 *
 * 1. Keep the text in the center of the battery cell
 * 2. Use the Battery Status API to fetch the level of battery charge on the client.
 */

import { useEffect, useState } from "react";

interface BatteryStatus {
  level: number;
  charging: boolean;
}

function useBatteryLevel(defaultLevel: number = 0.75): BatteryStatus {
  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus>({
    level: defaultLevel,
    charging: false,
  });

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    async function getBatteryStatus() {
      if (!("getBattery" in navigator)) {
        console.warn("Battery Status API is not supported");
        return;
      }

      try {
        const battery = await navigator.getBattery();

        const updateBatteryStatus = () => {
          setBatteryStatus({
            level: battery.level,
            charging: battery.charging,
          });
        };

        updateBatteryStatus();

        battery.addEventListener("levelchange", updateBatteryStatus);
        battery.addEventListener("chargingchange", updateBatteryStatus);

        cleanup = () => {
          battery.removeEventListener("levelchange", updateBatteryStatus);
          battery.removeEventListener("chargingchange", updateBatteryStatus);
        };
      } catch (error) {
        console.error("Error accessing battery status:", error);
      }
    }

    getBatteryStatus();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return batteryStatus;
}

export default function Index() {
  const { level: batteryLevel, charging: batteryCharging } =
    useBatteryLevel(0.75);

  const getBatteryColour = (level: number): string => {
    if (level > 0.75) {
      return "bg-green-400";
    }
    if (level > 0.5) {
      return "bg-yellow-400";
    }
    if (level > 0.25) {
      return "bg-orange-400";
    }
    return "bg-red-600";
  };

  return (
    <div className="max-w-[600px] m-auto mt-20 px-6">
      <div className="flex flex-row items-center gap-2">
        <div className="rounded-lg border-4 border-white p-1 w-full relative">
          <div
            className={`place-content-center rounded h-40  ${getBatteryColour(
              batteryLevel
            )} text-4xl flex items-center justify-center`}
            style={{ width: `${batteryLevel * 100}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center ">
            {batteryCharging && "⚡"}
            {batteryLevel * 100}%
          </div>
        </div>
        <div className="rounded bg-white w-1.5 h-20"></div>
      </div>
    </div>
  );
}
