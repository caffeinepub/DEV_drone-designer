import { useDesignStore } from '../../features/designer/DesignStore';
import { calculatePerformance } from '../../features/summary/calc';
import { getAssumptionDescriptions } from '../../features/summary/assumptions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function DesignSummaryPanel() {
  const { design } = useDesignStore();
  const metrics = calculatePerformance(design);
  const assumptions = getAssumptionDescriptions();

  const getThrustToWeightColor = (ratio: number) => {
    if (ratio < 1.5) return 'text-destructive';
    if (ratio < 2.5) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getThrustToWeightLabel = (ratio: number) => {
    if (ratio < 1.5) return 'Underpowered';
    if (ratio < 2.5) return 'Adequate';
    if (ratio < 4) return 'Good';
    return 'Excellent';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Performance</h2>
        <p className="text-sm text-muted-foreground mt-1">Estimated metrics</p>
      </div>

      <Separator />

      <div className="space-y-4">
        {/* Total Weight */}
        <Card className="bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.totalWeight.toFixed(0)}g</div>
            <p className="text-xs text-muted-foreground mt-1">
              {(metrics.totalWeight / 1000).toFixed(2)} kg
            </p>
          </CardContent>
        </Card>

        {/* Total Thrust */}
        <Card className="bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Thrust</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.totalThrust.toFixed(0)}g</div>
            <p className="text-xs text-muted-foreground mt-1">
              {(metrics.totalThrust / 1000).toFixed(2)} kg
            </p>
          </CardContent>
        </Card>

        {/* Thrust-to-Weight Ratio */}
        <Card className="bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Thrust-to-Weight Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getThrustToWeightColor(metrics.thrustToWeight)}`}>
              {metrics.thrustToWeight.toFixed(2)}:1
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {getThrustToWeightLabel(metrics.thrustToWeight)}
            </p>
          </CardContent>
        </Card>

        {/* Flight Time */}
        <Card className="bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Est. Flight Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {metrics.flightTimeMin.toFixed(0)}-{metrics.flightTimeMax.toFixed(0)}
              <span className="text-lg ml-1">min</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">At hover throttle</p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Assumptions */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Calculation Assumptions</h3>
        </div>
        <ul className="space-y-2 text-xs text-muted-foreground">
          {assumptions.map((assumption, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>{assumption}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
