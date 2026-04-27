import type { DroneDesignConfig } from '../designer/types';

interface SerializedDesign {
  version: number;
  config: DroneDesignConfig;
}

const CURRENT_VERSION = 1;

export function serializeDesign(config: DroneDesignConfig): string {
  const serialized: SerializedDesign = {
    version: CURRENT_VERSION,
    config,
  };
  return JSON.stringify(serialized);
}

export function deserializeDesign(data: string): DroneDesignConfig {
  try {
    const parsed: SerializedDesign = JSON.parse(data);
    
    // Handle version migrations if needed in the future
    if (parsed.version === 1) {
      return parsed.config;
    }
    
    throw new Error(`Unsupported design version: ${parsed.version}`);
  } catch (error) {
    console.error('Failed to deserialize design:', error);
    throw new Error('Invalid design data');
  }
}
