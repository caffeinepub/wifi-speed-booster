import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface WiFiConfig {
    signalStrength: bigint;
    ssid: string;
    interferenceLevel: number;
    frequency: bigint;
    channel: bigint;
}
export interface OptimizationRecommendation {
    signalImprovement?: bigint;
    recommendedFrequency?: bigint;
    recommendedChannel?: bigint;
}
export interface SpeedTestResult {
    timestamp: bigint;
    downloadSpeed: number;
}
export interface backendInterface {
    analyzeWiFi(config: WiFiConfig): Promise<OptimizationRecommendation>;
    getSpeedTestTrend(): Promise<Array<SpeedTestResult>>;
    recordSpeedTest(result: SpeedTestResult): Promise<void>;
}
