import Map "mo:core/Map";
import List "mo:core/List";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";

actor {
  type WiFiConfig = {
    ssid : Text;
    channel : Nat;
    frequency : Nat;
    signalStrength : Int; // dBm
    interferenceLevel : Float; // 0.0 (none) to 1.0 (high)
  };

  type SpeedTestResult = {
    timestamp : Int;
    downloadSpeed : Float; // Mbps
  };

  type OptimizationRecommendation = {
    recommendedChannel : ?Nat;
    recommendedFrequency : ?Nat;
    signalImprovement : ?Int;
  };

  module SpeedTestResult {
    public func compareByTimestamp(a : SpeedTestResult, b : SpeedTestResult) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let speedTestResults = Map.empty<Principal, List.List<SpeedTestResult>>();

  public query ({ caller }) func analyzeWiFi(config : WiFiConfig) : async OptimizationRecommendation {
    let recommendedChannel = if (config.interferenceLevel > 0.7) {
      ?((config.channel + 1) % 11);
    } else {
      null;
    };

    let recommendedFrequency = if (config.signalStrength < -70) {
      ?(if (config.frequency == 2400) { 5000 } else { 2400 });
    } else {
      null;
    };

    let signalImprovement = if (config.signalStrength < -65) {
      ?(config.signalStrength + 5);
    } else {
      null;
    };

    {
      recommendedChannel;
      recommendedFrequency;
      signalImprovement;
    };
  };

  public shared ({ caller }) func recordSpeedTest(result : SpeedTestResult) : async () {
    let existingResults = switch (speedTestResults.get(caller)) {
      case (null) { List.empty<SpeedTestResult>() };
      case (?results) { results };
    };

    existingResults.add(result);
    speedTestResults.add(caller, existingResults);
  };

  public query ({ caller }) func getSpeedTestTrend() : async [SpeedTestResult] {
    switch (speedTestResults.get(caller)) {
      case (null) { [] };
      case (?results) {
        let trend = results.toArray().sort(SpeedTestResult.compareByTimestamp);
        trend;
      };
    };
  };
};
