import { useState } from 'react';
import { useActor } from '../hooks/useActor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Wifi } from 'lucide-react';
import type { WiFiConfig, OptimizationRecommendation } from '../backend';

interface WiFiConfigFormProps {
  onAnalysisComplete: (config: WiFiConfig, recommendation: OptimizationRecommendation) => void;
}

export default function WiFiConfigForm({ onAnalysisComplete }: WiFiConfigFormProps) {
  const { actor } = useActor();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    ssid: '',
    channel: '6',
    frequency: '2400',
    signalStrength: '-50',
    interferenceLevel: '0.3',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;

    setIsAnalyzing(true);
    try {
      const config: WiFiConfig = {
        ssid: formData.ssid,
        channel: BigInt(formData.channel),
        frequency: BigInt(formData.frequency),
        signalStrength: BigInt(formData.signalStrength),
        interferenceLevel: parseFloat(formData.interferenceLevel),
      };

      const recommendation = await actor.analyzeWiFi(config);
      onAnalysisComplete(config, recommendation);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wifi className="h-5 w-5 text-primary" />
          WiFi Configuration
        </CardTitle>
        <CardDescription>
          Enter your current WiFi settings for analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ssid">Network Name (SSID)</Label>
            <Input
              id="ssid"
              placeholder="MyWiFiNetwork"
              value={formData.ssid}
              onChange={(e) => setFormData({ ...formData, ssid: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="channel">Channel</Label>
              <Select
                value={formData.channel}
                onValueChange={(value) => setFormData({ ...formData, channel: value })}
              >
                <SelectTrigger id="channel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 11 }, (_, i) => i + 1).map((ch) => (
                    <SelectItem key={ch} value={ch.toString()}>
                      Channel {ch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData({ ...formData, frequency: value })}
              >
                <SelectTrigger id="frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2400">2.4 GHz</SelectItem>
                  <SelectItem value="5000">5 GHz</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signalStrength">Signal Strength (dBm)</Label>
            <Input
              id="signalStrength"
              type="number"
              min="-100"
              max="-30"
              value={formData.signalStrength}
              onChange={(e) => setFormData({ ...formData, signalStrength: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground">
              Typical range: -30 (excellent) to -90 (poor)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interferenceLevel">Interference Level</Label>
            <Select
              value={formData.interferenceLevel}
              onValueChange={(value) => setFormData({ ...formData, interferenceLevel: value })}
            >
              <SelectTrigger id="interferenceLevel">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.1">Low (0.1)</SelectItem>
                <SelectItem value="0.3">Low-Medium (0.3)</SelectItem>
                <SelectItem value="0.5">Medium (0.5)</SelectItem>
                <SelectItem value="0.7">Medium-High (0.7)</SelectItem>
                <SelectItem value="0.9">High (0.9)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full shadow-lg shadow-primary/30"
            disabled={isAnalyzing || !actor}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze WiFi'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
