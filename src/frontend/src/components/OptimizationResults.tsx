import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, TrendingUp, Wifi } from 'lucide-react';
import type { WiFiConfig, OptimizationRecommendation } from '../backend';

interface OptimizationResultsProps {
  recommendation: OptimizationRecommendation;
  originalConfig: WiFiConfig;
}

export default function OptimizationResults({ recommendation, originalConfig }: OptimizationResultsProps) {
  const hasRecommendations =
    recommendation.recommendedChannel !== undefined ||
    recommendation.recommendedFrequency !== undefined ||
    recommendation.signalImprovement !== undefined;

  return (
    <Card className="shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Optimization Results
        </CardTitle>
        <CardDescription>
          {hasRecommendations
            ? 'Recommendations to improve your WiFi performance'
            : 'Your WiFi is already optimized!'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!hasRecommendations ? (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Great Configuration!</h3>
              <p className="text-sm text-muted-foreground">
                Your current WiFi settings are already optimal for your environment.
              </p>
            </div>
          </div>
        ) : (
          <>
            {recommendation.recommendedChannel !== undefined && (
              <div className="space-y-3 p-4 rounded-lg bg-accent/50 border border-primary/20">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Channel Optimization</h4>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Badge variant="outline">Current: {originalConfig.channel.toString()}</Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <Badge className="bg-primary text-primary-foreground">
                    Recommended: {recommendation.recommendedChannel.toString()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Switching to channel {recommendation.recommendedChannel.toString()} will reduce interference
                  from nearby networks.
                </p>
              </div>
            )}

            {recommendation.recommendedFrequency !== undefined && (
              <div className="space-y-3 p-4 rounded-lg bg-accent/50 border border-primary/20">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Frequency Band</h4>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Badge variant="outline">
                    Current: {originalConfig.frequency === 2400n ? '2.4 GHz' : '5 GHz'}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <Badge className="bg-primary text-primary-foreground">
                    Recommended: {recommendation.recommendedFrequency === 2400n ? '2.4 GHz' : '5 GHz'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {recommendation.recommendedFrequency === 5000n
                    ? 'Switch to 5 GHz for faster speeds at shorter range.'
                    : 'Switch to 2.4 GHz for better range and wall penetration.'}
                </p>
              </div>
            )}

            {recommendation.signalImprovement !== undefined && (
              <div className="space-y-3 p-4 rounded-lg bg-accent/50 border border-primary/20">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Expected Improvement</h4>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Badge variant="outline">
                    Current: {originalConfig.signalStrength.toString()} dBm
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <Badge className="bg-primary text-primary-foreground">
                    Expected: {recommendation.signalImprovement.toString()} dBm
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Signal strength improvement of approximately{' '}
                  {(Number(recommendation.signalImprovement) - Number(originalConfig.signalStrength)).toString()}{' '}
                  dBm expected.
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
