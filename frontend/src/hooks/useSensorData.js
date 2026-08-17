"use client";

import { useState, useEffect, useCallback } from "react";
import { useMode } from "@/src/contexts/ModeContext";
import api from "@/src/lib/api";

export function useSensorData(refreshInterval = 5000) {
  const { mode } = useMode();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchData = useCallback(async () => {
    if (!mode) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await api.get(`/sensors/latest/${mode}`);
      console.log("Fetched sensor data:", response.data);
      setData(response.data || null);
    } catch (err) {
      console.error("Error fetching sensor data:", err);
      setError(err.response?.data?.detail || "Failed to fetch sensor data");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [mode]);

  // Force refetch function - call this after upload
  const refetch = useCallback(() => {
    console.log("Forcing sensor data refetch...");
    setRefreshKey(prev => prev + 1);
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [mode, refreshInterval, refreshKey, fetchData]);

  return { data, loading, error, refetch };
}
