import { parse } from "csv-parse/sync";

export interface ParsedReading {
  mode: string;
  temperature: number;
  pressure: number;
  flow_rate: number;
}

export function parseCSV(content: string): ParsedReading[] {
  try {
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    const requiredColumns = ["mode", "temperature", "pressure", "flow_rate"];

    if (records.length === 0) {
      throw new Error("CSV is empty");
    }

    const firstRecord = records[0];
    const hasColumns = requiredColumns.every((col) => col in firstRecord);
    if (!hasColumns) {
      throw new Error(`CSV must contain columns: ${requiredColumns.join(", ")}`);
    }

    const validated: ParsedReading[] = [];
    const validModes = new Set(["offshore", "onshore"]);

    for (const record of records) {
      if (!validModes.has(record.mode)) {
        throw new Error(`Mode must be one of: offshore, onshore`);
      }

      const temperature = parseFloat(record.temperature);
      const pressure = parseFloat(record.pressure);
      const flow_rate = parseFloat(record.flow_rate);

      if (isNaN(temperature) || isNaN(pressure) || isNaN(flow_rate)) {
        throw new Error("Temperature, pressure, and flow_rate must be valid numbers");
      }

      validated.push({
        mode: record.mode,
        temperature,
        pressure,
        flow_rate,
      });
    }

    return validated;
  } catch (error: any) {
    throw new Error(`Invalid CSV format: ${error.message}`);
  }
}

export function parseJSON(content: string): ParsedReading[] {
  try {
    const data = JSON.parse(content);

    if (!Array.isArray(data)) {
      throw new Error("JSON must be an array of sensor readings");
    }

    const validModes = new Set(["offshore", "onshore"]);
    const validated: ParsedReading[] = [];

    for (const record of data) {
      if (typeof record !== "object" || record === null) {
        throw new Error("Each record must be an object");
      }

      const { mode, temperature, pressure, flow_rate } = record;

      if (
        mode === undefined ||
        temperature === undefined ||
        pressure === undefined ||
        flow_rate === undefined
      ) {
        throw new Error("Each record must contain: mode, temperature, pressure, flow_rate");
      }

      if (!validModes.has(mode)) {
        throw new Error(`Mode must be one of: offshore, onshore`);
      }

      const tempVal = parseFloat(temperature);
      const pressVal = parseFloat(pressure);
      const flowVal = parseFloat(flow_rate);

      if (isNaN(tempVal) || isNaN(pressVal) || isNaN(flowVal)) {
        throw new Error("Temperature, pressure, and flow_rate must be valid numbers");
      }

      validated.push({
        mode,
        temperature: tempVal,
        pressure: pressVal,
        flow_rate: flowVal,
      });
    }

    return validated;
  } catch (error: any) {
    throw new Error(`Invalid JSON data: ${error.message}`);
  }
}
