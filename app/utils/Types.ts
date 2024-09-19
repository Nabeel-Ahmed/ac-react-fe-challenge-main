import { typeColors } from "./TypeColors";

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: TypeString[];
}

export type TypeString = keyof typeof typeColors;

export interface BatteryManager extends EventTarget {
  charging: boolean;
  level: number;
}

// Extend Navigator to include getBattery method
declare global {
  interface Navigator {
    getBattery: () => Promise<BatteryManager>;
  }
}
