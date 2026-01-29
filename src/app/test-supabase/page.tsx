"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestSupabasePage() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult("Testing...");

    try {
      // Test 1: Check Supabase client initialization
      setResult(prev => prev + "\n✓ Supabase client initialized");

      // Test 2: Try to get session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        setResult(prev => prev + "\n✗ Session check failed: " + sessionError.message);
      } else {
        setResult(prev => prev + "\n✓ Session check passed");
      }

      // Test 3: Try a simple signup
      const testEmail = `test${Date.now()}@test.com`;
      const testPassword = "test123456";

      setResult(prev => prev + `\n\nAttempting signup with: ${testEmail}`);

      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            full_name: "Test User",
          },
        },
      });

      if (error) {
        setResult(prev => prev + "\n✗ Signup failed: " + error.message);
        setResult(prev => prev + "\n✗ Error details: " + JSON.stringify(error, null, 2));
      } else {
        setResult(prev => prev + "\n✓ Signup successful!");
        setResult(prev => prev + "\n  User: " + (data.user ? "Created" : "Null"));
        setResult(prev => prev + "\n  Session: " + (data.session ? "Active" : "Waiting for email confirmation"));

        if (data.user && !data.session) {
          setResult(prev => prev + "\n\n⚠️ EMAIL CONFIRMATION IS ENABLED");
          setResult(prev => prev + "\n   You need to disable it in Supabase!");
        }
      }

    } catch (err: any) {
      setResult(prev => prev + "\n✗ CRITICAL ERROR: " + err.message);
      setResult(prev => prev + "\n✗ Stack: " + (err.stack || "No stack trace"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔍 Supabase Connection Test</h1>

      <div style={{ marginBottom: "1rem" }}>
        <h2>Environment Variables:</h2>
        <pre style={{ background: "#f0f0f0", padding: "1rem", borderRadius: "8px" }}>
          SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || "NOT SET"}
          {"\n"}
          SUPABASE_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "SET (hidden)" : "NOT SET"}
        </pre>
      </div>

      <button
        onClick={testConnection}
        disabled={loading}
        style={{
          padding: "1rem 2rem",
          fontSize: "1rem",
          background: "#0047AB",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: "1rem"
        }}
      >
        {loading ? "Testing..." : "Run Connection Test"}
      </button>

      {result && (
        <div style={{ marginTop: "1rem" }}>
          <h2>Test Results:</h2>
          <pre style={{
            background: "#1a1a1a",
            color: "#00ff00",
            padding: "1rem",
            borderRadius: "8px",
            whiteSpace: "pre-wrap",
            maxHeight: "500px",
            overflow: "auto"
          }}>
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
