"""
Deterministic hydrate risk calculation engine.
Based on simplified hydrate formation conditions.
"""


def calculate_hydrate_risk(temperature: float, pressure: float, flow_rate: float) -> float:
    """
    Calculate hydrate formation risk based on sensor readings.

    Args:
        temperature: Temperature in Celsius
        pressure: Pressure in bar
        flow_rate: Flow rate in m³/h

    Returns:
        Risk percentage (0-100)
    """
    # Hydrate formation zone (simplified model)
    # Higher risk at: low temperature, high pressure, low flow rate

    # Temperature factor (0-1, higher is more risk)
    # Risk increases below 10°C
    if temperature < 0:
        temp_factor = 1.0
    elif temperature < 10:
        temp_factor = 1.0 - (temperature / 10.0)
    else:
        temp_factor = 0.0

    # Pressure factor (0-1, higher is more risk)
    # Risk increases above 30 bar
    if pressure > 100:
        pressure_factor = 1.0
    elif pressure > 30:
        pressure_factor = (pressure - 30) / 70.0
    else:
        pressure_factor = 0.0

    # Flow rate factor (0-1, higher is more risk)
    # Risk increases below 50 m³/h
    if flow_rate < 10:
        flow_factor = 1.0
    elif flow_rate < 50:
        flow_factor = 1.0 - ((flow_rate - 10) / 40.0)
    else:
        flow_factor = 0.0

    # Combined risk (weighted average)
    risk = (temp_factor * 0.5 + pressure_factor * 0.3 + flow_factor * 0.2) * 100

    # Clamp to 0-100
    return max(0.0, min(100.0, risk))
