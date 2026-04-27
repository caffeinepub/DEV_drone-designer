import type { DroneDesignConfig } from './types';

export const DEFAULT_DESIGN: DroneDesignConfig = {
  frame: {
    type: 'quadcopter',
    size: 250,
    weight: 120,
  },
  motors: {
    quantity: 4,
    kv: 2300,
    weight: 28,
  },
  propellers: {
    size: 5,
    pitch: 4.5,
    weight: 5,
  },
  battery: {
    cells: 4,
    capacity: 1500,
    weight: 180,
  },
  flightController: {
    name: 'Standard FC',
    weight: 15,
  },
  camera: {
    type: 'fpv',
    weight: 25,
  },
};

export const FRAME_TYPES = [
  { value: 'quadcopter', label: 'Quadcopter (4 motors)' },
  { value: 'hexacopter', label: 'Hexacopter (6 motors)' },
  { value: 'octocopter', label: 'Octocopter (8 motors)' },
] as const;

export const FRAME_SIZES = [
  { value: 150, label: '150mm (Micro)' },
  { value: 210, label: '210mm (Racing)' },
  { value: 250, label: '250mm (Standard)' },
  { value: 450, label: '450mm (Mid-size)' },
  { value: 550, label: '550mm (Large)' },
  { value: 650, label: '650mm (Heavy Lift)' },
] as const;

export const MOTOR_KV_OPTIONS = [
  { value: 1000, label: '1000 KV (Low speed, high torque)' },
  { value: 1500, label: '1500 KV' },
  { value: 2000, label: '2000 KV' },
  { value: 2300, label: '2300 KV (Balanced)' },
  { value: 2600, label: '2600 KV' },
  { value: 3000, label: '3000 KV (High speed)' },
] as const;

export const PROP_SIZES = [
  { value: 3, label: '3 inch' },
  { value: 5, label: '5 inch' },
  { value: 6, label: '6 inch' },
  { value: 7, label: '7 inch' },
  { value: 9, label: '9 inch' },
  { value: 10, label: '10 inch' },
] as const;

export const BATTERY_CELLS = [
  { value: 2, label: '2S (7.4V)' },
  { value: 3, label: '3S (11.1V)' },
  { value: 4, label: '4S (14.8V)' },
  { value: 6, label: '6S (22.2V)' },
] as const;

export const BATTERY_CAPACITIES = [
  { value: 850, label: '850 mAh' },
  { value: 1300, label: '1300 mAh' },
  { value: 1500, label: '1500 mAh' },
  { value: 2200, label: '2200 mAh' },
  { value: 3300, label: '3300 mAh' },
  { value: 5000, label: '5000 mAh' },
] as const;

export const CAMERA_TYPES = [
  { value: 'none', label: 'None' },
  { value: 'fpv', label: 'FPV Camera' },
  { value: 'hd', label: 'HD Camera' },
  { value: 'payload', label: 'Custom Payload' },
] as const;
