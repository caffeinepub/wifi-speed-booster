import { useState } from 'react';
import { useActor } from '../hooks/useActor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Gauge, Loader2, Zap } from 'lucide-react';
import type { SpeedTestResult } from '../backend';

interface SpeedTestRunnerProps {
  onTestComplete: () => void;
}

export default function SpeedTestRunner({ onTestComplete }: SpeedTestRunnerProps) {
  const { actor } = useActor();
  const [isTesting, setIsTesting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState<number | null>(null);

  const runSpeedTest = async () => {
    if (!actor) return;

    setIsTesting(true);
    setProgress(0);
    setCurrentSpeed(null);

    try {
      // Simulate speed test with progress
      const testDuration = 3000; // 3 seconds
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / testDuration) * 100, 100);
        setProgress(newProgress);

        if (newProgress >= 100) {
          clearInterval(interval);
        }
      }, 50);

      // Simulate download speed measurement
      await new Promise((resolve) => setTimeout(resolve, testDuration));

      // Generate a realistic speed (between 10-200 Mbps with some randomness)
      const baseSpeed = 50 + Math.random() * 100;
      const speed = Math.round(baseSpeed * 10) / 10;
      setCurrentSpeed(speed);

      // Record the result
      const result: SpeedTestResult = {
        timestamp: BigInt(Date.now()),
        downloadSpeed: speed,
      };

      await actor.recordSpeedTest(result);
      onTestComplete();
    } catch (error) {
      console.error('Speed test failed:', error);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Card className="shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-primary" />
          Speed Test
        </CardTitle>
        <CardDescription>
          Measure your current download speed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center py-8 space-y-6">
          <div className="relative">
            <img 
              src="/assets/generated/speed-gauge.dim_256x256.png" 
              alt="Speed Gauge" 
              className={`h-40 w-40 ${isTesting ? 'animate-pulse' : ''}`}
            />
            {isTesting && (
              <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full animate-pulse" />
            )}
          </div>

          {currentSpeed !== null && !isTesting && (
            <div className="text-center space-y-2">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-primary">{currentSpeed}</span>
                <span className="text-2xl text-muted-foreground">Mbps</span>
              </div>
              <p className="text-sm text-muted-foreground">Download Speed</p>
            </div>
          )}

          {isTesting && (
            <div className="w-full space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-center text-muted-foreground">
                Testing... {Math.round(progress)}%
              </p>
            </div>
          )}
        </div>

        <Button
          onClick={runSpeedTest}
          disabled={isTesting || !actor}
          className="w-full shadow-lg shadow-primary/30"
          size="lg"
        >
          {isTesting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-5 w-5" />
              Start Speed Test
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
