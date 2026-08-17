/**
 * Deterministic hydrate risk calculation engine.
 * Based on simplified hydrate formation conditions.
 */

export function calculateHydrateRisk(
  temperature: number,
  pressure: number,
  flowRate: number
): number {
  // Hydrate formation zone (simplified model)
  // Higher risk at: low temperature, high pressure, low flow rate

  // Temperature factor (0-1, higher is more risk)
  // Risk increases below 10°C
  let tempFactor = 0.0;
  if (temperature < 0) {
    tempFactor = 1.0;
  } else if (temperature < 10) {
    tempFactor = 1.0 - temperature / 10.0;
  } else {
    tempFactor = 0.0;
  }

  // Pressure factor (0-1, higher is more risk)
  // Risk increases above 30 bar
  let pressureFactor = 0.0;
  if (pressure > 100) {
    pressureFactor = 1.0;
  } else if (pressure > 30) {
    pressureFactor = (pressure - 30) / 70.0;
  } else {
    pressureFactor = 0.0;
  }

  // Flow rate factor (0-1, higher is more risk)
  // Risk increases below 50 m³/h
  let flowFactor = 0.0;
  if (flowRate < 10) {
    flowFactor = 1.0;
  } else if (flowRate < 50) {
    flowFactor = 1.0 - (flowRate - 10) / 40.0;
  } else {
    flowFactor = 0.0;
  }

  // Combined risk (weighted average)
  const risk = (tempFactor * 0.5 + pressureFactor * 0.3 + flowFactor * 0.2) * 100;

  // Clamp to 0-100
  return Math.max(0.0, Math.min(100.0, risk));
}
