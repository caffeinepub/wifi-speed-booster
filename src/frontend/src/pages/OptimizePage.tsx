import { useState } from 'react';
import WiFiConfigForm from '../components/WiFiConfigForm';
import OptimizationResults from '../components/OptimizationResults';
import type { WiFiConfig, OptimizationRecommendation } from '../backend';
import { Wifi } from 'lucide-react';

export default function OptimizePage() {
  const [recommendation, setRecommendation] = useState<OptimizationRecommendation | null>(null);
  const [config, setConfig] = useState<WiFiConfig | null>(null);

  const handleAnalysisComplete = (wifiConfig: WiFiConfig, result: OptimizationRecommendation) => {
    setConfig(wifiConfig);
    setRecommendation(result);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <img 
              src="/assets/generated/wifi-signal.dim_128x128.png" 
              alt="WiFi Signal" 
              className="h-24 w-24 opacity-90"
            />
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
          </div>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          WiFi Optimization
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Enter your current WiFi settings to receive personalized optimization recommendations
          and boost your download speeds.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <WiFiConfigForm onAnalysisComplete={handleAnalysisComplete} />
        {recommendation && config && (
          <OptimizationResults recommendation={recommendation} originalConfig={config} />
        )}
      </div>
    </div>
  );
}
