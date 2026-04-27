import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { DroneDesignConfig } from './types';
import { DEFAULT_DESIGN } from './defaults';

interface DesignStoreContextType {
  design: DroneDesignConfig;
  updateFrame: (frame: Partial<DroneDesignConfig['frame']>) => void;
  updateMotors: (motors: Partial<DroneDesignConfig['motors']>) => void;
  updatePropellers: (propellers: Partial<DroneDesignConfig['propellers']>) => void;
  updateBattery: (battery: Partial<DroneDesignConfig['battery']>) => void;
  updateFlightController: (fc: Partial<DroneDesignConfig['flightController']>) => void;
  updateCamera: (camera: Partial<DroneDesignConfig['camera']>) => void;
  loadDesign: (design: DroneDesignConfig) => void;
  resetDesign: () => void;
}

const DesignStoreContext = createContext<DesignStoreContextType | undefined>(undefined);

export function DesignStoreProvider({ children }: { children: ReactNode }) {
  const [design, setDesign] = useState<DroneDesignConfig>(DEFAULT_DESIGN);

  const updateFrame = useCallback((frame: Partial<DroneDesignConfig['frame']>) => {
    setDesign(prev => ({
      ...prev,
      frame: { ...prev.frame, ...frame },
    }));
  }, []);

  const updateMotors = useCallback((motors: Partial<DroneDesignConfig['motors']>) => {
    setDesign(prev => ({
      ...prev,
      motors: { ...prev.motors, ...motors },
    }));
  }, []);

  const updatePropellers = useCallback((propellers: Partial<DroneDesignConfig['propellers']>) => {
    setDesign(prev => ({
      ...prev,
      propellers: { ...prev.propellers, ...propellers },
    }));
  }, []);

  const updateBattery = useCallback((battery: Partial<DroneDesignConfig['battery']>) => {
    setDesign(prev => ({
      ...prev,
      battery: { ...prev.battery, ...battery },
    }));
  }, []);

  const updateFlightController = useCallback((fc: Partial<DroneDesignConfig['flightController']>) => {
    setDesign(prev => ({
      ...prev,
      flightController: { ...prev.flightController, ...fc },
    }));
  }, []);

  const updateCamera = useCallback((camera: Partial<DroneDesignConfig['camera']>) => {
    setDesign(prev => ({
      ...prev,
      camera: { ...prev.camera, ...camera },
    }));
  }, []);

  const loadDesign = useCallback((newDesign: DroneDesignConfig) => {
    setDesign(newDesign);
  }, []);

  const resetDesign = useCallback(() => {
    setDesign(DEFAULT_DESIGN);
  }, []);

  return (
    <DesignStoreContext.Provider
      value={{
        design,
        updateFrame,
        updateMotors,
        updatePropellers,
        updateBattery,
        updateFlightController,
        updateCamera,
        loadDesign,
        resetDesign,
      }}
    >
      {children}
    </DesignStoreContext.Provider>
  );
}

export function useDesignStore() {
  const context = useContext(DesignStoreContext);
  if (!context) {
    throw new Error('useDesignStore must be used within DesignStoreProvider');
  }
  return context;
}
