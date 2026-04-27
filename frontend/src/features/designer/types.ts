export interface DroneDesignConfig {
  frame: FrameConfig;
  motors: MotorConfig;
  propellers: PropellerConfig;
  battery: BatteryConfig;
  flightController: FlightControllerConfig;
  camera: CameraConfig;
}

export interface FrameConfig {
  type: 'quadcopter' | 'hexacopter' | 'octocopter';
  size: number; // in mm (diagonal motor-to-motor)
  weight: number; // in grams
}

export interface MotorConfig {
  quantity: number;
  kv: number;
  weight: number; // per motor in grams
}

export interface PropellerConfig {
  size: number; // in inches
  pitch: number; // in inches
  weight: number; // per prop in grams
}

export interface BatteryConfig {
  cells: number; // 3S, 4S, 6S, etc.
  capacity: number; // in mAh
  weight: number; // in grams
}

export interface FlightControllerConfig {
  name: string;
  weight: number; // in grams
}

export interface CameraConfig {
  type: 'none' | 'fpv' | 'hd' | 'payload';
  weight: number; // in grams
}
