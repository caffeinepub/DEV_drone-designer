import { useDesignStore } from '../../features/designer/DesignStore';
import {
  FRAME_TYPES,
  FRAME_SIZES,
  MOTOR_KV_OPTIONS,
  PROP_SIZES,
  BATTERY_CELLS,
  BATTERY_CAPACITIES,
  CAMERA_TYPES,
} from '../../features/designer/defaults';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export default function ComponentEditorPanel() {
  const { design, updateFrame, updateMotors, updatePropellers, updateBattery, updateFlightController, updateCamera } = useDesignStore();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Components</h2>
        <p className="text-sm text-muted-foreground mt-1">Configure your drone build</p>
      </div>

      <Separator />

      <Accordion type="multiple" defaultValue={['frame', 'motors', 'propellers', 'battery', 'fc', 'camera']} className="space-y-2">
        {/* Frame */}
        <AccordionItem value="frame" className="border rounded-lg px-4 bg-card/50">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Frame</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="frame-type">Type</Label>
              <Select
                value={design.frame.type}
                onValueChange={(value) => {
                  updateFrame({ type: value as any });
                  const motorCount = value === 'quadcopter' ? 4 : value === 'hexacopter' ? 6 : 8;
                  updateMotors({ quantity: motorCount });
                }}
              >
                <SelectTrigger id="frame-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FRAME_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frame-size">Size</Label>
              <Select
                value={design.frame.size.toString()}
                onValueChange={(value) => updateFrame({ size: parseInt(value) })}
              >
                <SelectTrigger id="frame-size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FRAME_SIZES.map(size => (
                    <SelectItem key={size.value} value={size.value.toString()}>{size.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frame-weight">Weight (g)</Label>
              <Input
                id="frame-weight"
                type="number"
                value={design.frame.weight}
                onChange={(e) => updateFrame({ weight: parseInt(e.target.value) || 0 })}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Motors */}
        <AccordionItem value="motors" className="border rounded-lg px-4 bg-card/50">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Motors</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="motor-quantity">Quantity</Label>
              <Input
                id="motor-quantity"
                type="number"
                value={design.motors.quantity}
                onChange={(e) => updateMotors({ quantity: parseInt(e.target.value) || 0 })}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motor-kv">KV Rating</Label>
              <Select
                value={design.motors.kv.toString()}
                onValueChange={(value) => updateMotors({ kv: parseInt(value) })}
              >
                <SelectTrigger id="motor-kv">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MOTOR_KV_OPTIONS.map(kv => (
                    <SelectItem key={kv.value} value={kv.value.toString()}>{kv.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motor-weight">Weight per Motor (g)</Label>
              <Input
                id="motor-weight"
                type="number"
                value={design.motors.weight}
                onChange={(e) => updateMotors({ weight: parseInt(e.target.value) || 0 })}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Propellers */}
        <AccordionItem value="propellers" className="border rounded-lg px-4 bg-card/50">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Propellers</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="prop-size">Size</Label>
              <Select
                value={design.propellers.size.toString()}
                onValueChange={(value) => updatePropellers({ size: parseInt(value) })}
              >
                <SelectTrigger id="prop-size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROP_SIZES.map(size => (
                    <SelectItem key={size.value} value={size.value.toString()}>{size.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prop-pitch">Pitch (inches)</Label>
              <Input
                id="prop-pitch"
                type="number"
                step="0.1"
                value={design.propellers.pitch}
                onChange={(e) => updatePropellers({ pitch: parseFloat(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prop-weight">Weight per Prop (g)</Label>
              <Input
                id="prop-weight"
                type="number"
                value={design.propellers.weight}
                onChange={(e) => updatePropellers({ weight: parseInt(e.target.value) || 0 })}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Battery */}
        <AccordionItem value="battery" className="border rounded-lg px-4 bg-card/50">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Battery</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="battery-cells">Cell Count</Label>
              <Select
                value={design.battery.cells.toString()}
                onValueChange={(value) => updateBattery({ cells: parseInt(value) })}
              >
                <SelectTrigger id="battery-cells">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BATTERY_CELLS.map(cell => (
                    <SelectItem key={cell.value} value={cell.value.toString()}>{cell.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="battery-capacity">Capacity</Label>
              <Select
                value={design.battery.capacity.toString()}
                onValueChange={(value) => updateBattery({ capacity: parseInt(value) })}
              >
                <SelectTrigger id="battery-capacity">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BATTERY_CAPACITIES.map(cap => (
                    <SelectItem key={cap.value} value={cap.value.toString()}>{cap.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="battery-weight">Weight (g)</Label>
              <Input
                id="battery-weight"
                type="number"
                value={design.battery.weight}
                onChange={(e) => updateBattery({ weight: parseInt(e.target.value) || 0 })}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Flight Controller */}
        <AccordionItem value="fc" className="border rounded-lg px-4 bg-card/50">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Flight Controller</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="fc-name">Name</Label>
              <Input
                id="fc-name"
                value={design.flightController.name}
                onChange={(e) => updateFlightController({ name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fc-weight">Weight (g)</Label>
              <Input
                id="fc-weight"
                type="number"
                value={design.flightController.weight}
                onChange={(e) => updateFlightController({ weight: parseInt(e.target.value) || 0 })}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Camera */}
        <AccordionItem value="camera" className="border rounded-lg px-4 bg-card/50">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Camera / Payload</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="camera-type">Type</Label>
              <Select
                value={design.camera.type}
                onValueChange={(value) => updateCamera({ type: value as any })}
              >
                <SelectTrigger id="camera-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CAMERA_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="camera-weight">Weight (g)</Label>
              <Input
                id="camera-weight"
                type="number"
                value={design.camera.weight}
                onChange={(e) => updateCamera({ weight: parseInt(e.target.value) || 0 })}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
