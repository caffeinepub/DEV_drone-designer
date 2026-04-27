import type { DroneDesignConfig } from '../designer/types';
import { DEFAULT_ASSUMPTIONS, type PerformanceAssumptions } from './assumptions';

export interface PerformanceMetrics {
  totalWeight: number; // grams
  totalThrust: number; // grams
  thrustToWeight: number; // ratio
  flightTimeMin: number; // minutes
  flightTimeMax: number; // minutes
}

export function calculatePerformance(
  design: DroneDesignConfig,
  assumptions: PerformanceAssumptions = DEFAULT_ASSUMPTIONS
): PerformanceMetrics {
  // Calculate total weight
  const frameWeight = design.frame.weight;
  const motorsWeight = design.motors.weight * design.motors.quantity;
  const propsWeight = design.propellers.weight * design.motors.quantity;
  const batteryWeight = design.battery.weight;
  const fcWeight = design.flightController.weight;
  const cameraWeight = design.camera.weight;
  
  const totalWeight = frameWeight + motorsWeight + propsWeight + batteryWeight + fcWeight + cameraWeight;

  // Calculate total thrust
  const thrustPerMotor = assumptions.thrustPerMotor(
    design.motors.kv,
    design.propellers.size,
    design.battery.cells
  );
  const totalThrust = thrustPerMotor * design.motors.quantity;

  // Calculate thrust-to-weight ratio
  const thrustToWeight = totalThrust / totalWeight;

  // Calculate flight time
  const batteryCapacityAh = design.battery.capacity / 1000; // Convert mAh to Ah
  const usableCapacity = batteryCapacityAh * 0.8; // 80% usable capacity
  
  const currentDraw = assumptions.averageCurrentDraw(
    design.motors.quantity,
    design.motors.kv,
    design.propellers.size
  );
  
  const hoverCurrent = currentDraw * assumptions.hoverThrottle;
  const flightTimeHours = (usableCapacity / hoverCurrent) * assumptions.efficiencyFactor;
  const flightTimeMinutes = flightTimeHours * 60;

  // Provide a range (±20%)
  const flightTimeMin = flightTimeMinutes * 0.8;
  const flightTimeMax = flightTimeMinutes * 1.2;

  return {
    totalWeight,
    totalThrust,
    thrustToWeight,
    flightTimeMin,
    flightTimeMax,
  };
}
