/**
 * Task Two
 * 
 * 1. Keep the text in the center of the battery cell
 * 2. Use the Battery Status API to fetch the level of battery charge on the client. 
 */


function useBatteryLevel() {
  // navigator.getBattery()

  return 0.42;
}

export default function Index() {

  const batteryLevel = useBatteryLevel();

  return <div className="max-w-[600px] m-auto mt-20 px-6">
    <div className="flex flex-row items-center gap-2">
      <div className="rounded-lg border-4 border-white p-1 w-full">
        <div className="rounded h-40 bg-green-400 text-4xl flex items-center justify-center" style={{ width: `${batteryLevel * 100}%` }}>
          <div>
            {batteryLevel * 100}%
          </div>
        </div>
      </div>
      <div className="rounded bg-white w-1.5 h-20">

      </div>
    </div>
  </div>
}