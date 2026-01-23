"use client";

import { useState } from "react";
import axios from "axios";

export default function ApiTestPage() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult("Testing...");

    try {
      // Test 1: Direct fetch to root
      const response1 = await fetch("http://127.0.0.1:8000/");
      const data1 = await response1.json();
      setResult(prev => prev + "\n✅ Test 1 - Root endpoint: " + JSON.stringify(data1));

      // Test 2: Fetch to health endpoint
      const response2 = await fetch("http://127.0.0.1:8000/api/v1/health/");
      const data2 = await response2.json();
      setResult(prev => prev + "\n✅ Test 2 - Health endpoint: " + JSON.stringify(data2));

      // Test 3: Axios to health endpoint
      const response3 = await axios.get("http://127.0.0.1:8000/api/v1/health/", {
        timeout: 5000,
      });
      setResult(prev => prev + "\n✅ Test 3 - Axios health: " + JSON.stringify(response3.data));

      // Test 4: Test login endpoint with axios
      const params = new URLSearchParams();
      params.append("username", "test@example.com");
      params.append("password", "password123");

      const response4 = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/login",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          timeout: 5000,
        }
      );
      setResult(prev => prev + "\n✅ Test 4 - Login: SUCCESS");

      setResult(prev => prev + "\n\n🎉 All tests passed! API is working correctly.");
    } catch (error) {
      console.error("Test error:", error);
      setResult(prev => prev + "\n\n❌ Error: " + error.message);
      if (error.response) {
        setResult(prev => prev + "\nStatus: " + error.response.status);
        setResult(prev => prev + "\nData: " + JSON.stringify(error.response.data));
      } else if (error.request) {
        setResult(prev => prev + "\nNo response received from server");
        setResult(prev => prev + "\nRequest details: " + JSON.stringify(error.config));
      }
    } finally {
      setLoading(false);
    }
  };

  const testEnvVar = () => {
    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    setResult(`Environment Variable: ${envUrl || "NOT SET"}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">API Connection Test</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4">Environment Variable</h2>
          <button
            onClick={testEnvVar}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Check Environment Variable
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4">Connection Tests</h2>
          <button
            onClick={testConnection}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Testing..." : "Run All Tests"}
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Results</h2>
          <pre className="text-green-400 whitespace-pre-wrap font-mono text-sm">
            {result || "No tests run yet. Click the button above to start."}
          </pre>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p>Expected API URL: http://127.0.0.1:8000</p>
          <p>If tests fail, check:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Backend is running on port 8000</li>
            <li>CORS is configured correctly</li>
            <li>Browser console for errors (F12)</li>
            <li>Next.js dev server was restarted after .env changes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
