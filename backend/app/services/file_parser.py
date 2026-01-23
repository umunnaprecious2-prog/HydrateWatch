import json
import pandas as pd
from typing import List, Dict
from io import StringIO


def parse_csv(content: str) -> List[Dict]:
    """
    Parse CSV content and return list of sensor readings.

    Expected CSV format:
    mode,temperature,pressure,flow_rate
    offshore,5.2,45.3,35.7
    """
    try:
        df = pd.read_csv(StringIO(content))

        required_columns = ['mode', 'temperature', 'pressure', 'flow_rate']
        if not all(col in df.columns for col in required_columns):
            raise ValueError(f"CSV must contain columns: {', '.join(required_columns)}")

        # Validate mode values
        valid_modes = {'offshore', 'onshore'}
        if not df['mode'].isin(valid_modes).all():
            raise ValueError(f"Mode must be one of: {', '.join(valid_modes)}")

        # Convert to list of dicts
        records = df[required_columns].to_dict('records')

        # Validate data types
        for record in records:
            record['temperature'] = float(record['temperature'])
            record['pressure'] = float(record['pressure'])
            record['flow_rate'] = float(record['flow_rate'])

        return records
    except Exception as e:
        raise ValueError(f"Invalid CSV format: {str(e)}")


def parse_json(content: str) -> List[Dict]:
    """
    Parse JSON content and return list of sensor readings.

    Expected JSON format:
    [
        {"mode": "offshore", "temperature": 5.2, "pressure": 45.3, "flow_rate": 35.7},
        ...
    ]
    """
    try:
        data = json.loads(content)

        if not isinstance(data, list):
            raise ValueError("JSON must be an array of sensor readings")

        required_keys = {'mode', 'temperature', 'pressure', 'flow_rate'}
        valid_modes = {'offshore', 'onshore'}

        validated_records = []
        for record in data:
            if not isinstance(record, dict):
                raise ValueError("Each record must be an object")

            if not all(key in record for key in required_keys):
                raise ValueError(f"Each record must contain: {', '.join(required_keys)}")

            if record['mode'] not in valid_modes:
                raise ValueError(f"Mode must be one of: {', '.join(valid_modes)}")

            validated_records.append({
                'mode': record['mode'],
                'temperature': float(record['temperature']),
                'pressure': float(record['pressure']),
                'flow_rate': float(record['flow_rate'])
            })

        return validated_records
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON format: {str(e)}")
    except Exception as e:
        raise ValueError(f"Invalid JSON data: {str(e)}")
