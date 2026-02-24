import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useSpeedTestTrend } from '../hooks/useQueries';

interface SpeedTrendChartProps {
  refreshTrigger: number;
}

export default function SpeedTrendChart({ refreshTrigger }: SpeedTrendChartProps) {
  const { data: speedTests, refetch } = useSpeedTestTrend();

  useEffect(() => {
    refetch();
  }, [refreshTrigger, refetch]);

  const chartData = speedTests?.map((test) => ({
    time: new Date(Number(test.timestamp)).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    speed: test.downloadSpeed,
  })) || [];

  const averageSpeed = speedTests && speedTests.length > 0
    ? speedTests.reduce((sum, test) => sum + test.downloadSpeed, 0) / speedTests.length
    : 0;

  return (
    <Card className="shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Speed Trend
        </CardTitle>
        <CardDescription>
          Historical download speed measurements
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <TrendingUp className="h-16 w-16 text-muted-foreground/50" />
            <div>
              <h3 className="text-lg font-semibold">No Data Yet</h3>
              <p className="text-sm text-muted-foreground">
                Run a speed test to start tracking your connection performance.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-accent/50 border border-primary/20">
                <p className="text-sm text-muted-foreground">Average Speed</p>
                <p className="text-2xl font-bold text-primary">
                  {averageSpeed.toFixed(1)} <span className="text-sm">Mbps</span>
                </p>
              </div>
              <div className="p-4 rounded-lg bg-accent/50 border border-primary/20">
                <p className="text-sm text-muted-foreground">Total Tests</p>
                <p className="text-2xl font-bold text-primary">{chartData.length}</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="time" 
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  label={{ 
                    value: 'Mbps', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fill: 'hsl(var(--muted-foreground))' }
                  }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="speed" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
