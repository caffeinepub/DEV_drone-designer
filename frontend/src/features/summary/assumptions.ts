export interface PerformanceAssumptions {
  // Thrust estimation (grams per motor)
  thrustPerMotor: (kv: number, propSize: number, cells: number) => number;
  
  // Current draw estimation (amps)
  averageCurrentDraw: (motorCount: number, kv: number, propSize: number) => number;
  
  // Efficiency factor (0-1)
  efficiencyFactor: number;
  
  // Hover throttle percentage
  hoverThrottle: number;
}

export const DEFAULT_ASSUMPTIONS: PerformanceAssumptions = {
  thrustPerMotor: (kv: number, propSize: number, cells: number) => {
    // Simplified thrust estimation based on KV, prop size, and voltage
    const voltage = cells * 3.7; // Nominal voltage per cell
    const kvFactor = kv / 2000; // Normalize around 2000 KV
    const propFactor = Math.pow(propSize / 5, 2); // Prop size squared relationship
    const voltageFactor = voltage / 14.8; // Normalize around 4S
    
    return 400 * kvFactor * propFactor * voltageFactor;
  },
  
  averageCurrentDraw: (motorCount: number, kv: number, propSize: number) => {
    // Simplified current draw estimation
    const baseCurrentPerMotor = 8; // Base amps per motor at hover
    const kvFactor = kv / 2000;
    const propFactor = Math.pow(propSize / 5, 1.5);
    
    return motorCount * baseCurrentPerMotor * kvFactor * propFactor;
  },
  
  efficiencyFactor: 0.75, // 75% efficiency
  hoverThrottle: 0.5, // 50% throttle at hover
};

export function getAssumptionDescriptions(): string[] {
  return [
    'Thrust estimation based on motor KV, propeller size, and battery voltage',
    'Current draw calculated from motor count, KV rating, and prop size',
    '75% overall system efficiency assumed',
    '50% throttle assumed for hover flight',
    'Flight time calculated at hover throttle with 80% usable battery capacity',
  ];
}
