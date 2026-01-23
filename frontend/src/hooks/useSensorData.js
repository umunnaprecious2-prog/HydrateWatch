"use client";

import { useState, useEffect } from "react";
import { useMode } from "@/src/contexts/ModeContext";
import api from "@/src/lib/api";

export function useSensorData(refreshInterval = 5000) {
  const { mode } = useMode();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mode) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setError(null);
        const response = await api.get(`/sensors/latest/${mode}`);
        setData(response.data || null);
      } catch (err) {
        console.error("Error fetching sensor data:", err);
        setError(err.response?.data?.detail || "Failed to fetch sensor data");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [mode, refreshInterval]);

  return { data, loading, error };
}
