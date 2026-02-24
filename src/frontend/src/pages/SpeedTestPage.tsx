import { useState } from 'react';
import SpeedTestRunner from '../components/SpeedTestRunner';
import SpeedTrendChart from '../components/SpeedTrendChart';
import { Gauge } from 'lucide-react';

export default function SpeedTestPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTestComplete = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <img 
              src="/assets/generated/speed-gauge.dim_256x256.png" 
              alt="Speed Gauge" 
              className="h-32 w-32 opacity-90"
            />
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
          </div>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Speed Test
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Test your current download speed and track improvements over time.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <SpeedTestRunner onTestComplete={handleTestComplete} />
        <SpeedTrendChart refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
