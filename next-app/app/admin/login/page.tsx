"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const AUTH_CONFIG = { username: "MBS12", password: "mbs1changed" };

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("mbs_admin_auth") === "true") {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = () => {
    const u = usernameRef.current?.value || "";
    const p = passwordRef.current?.value || "";
    if (u === AUTH_CONFIG.username && p === AUTH_CONFIG.password) {
      sessionStorage.setItem("mbs_admin_auth", "true");
      sessionStorage.setItem("mbs_admin_auth_time", Date.now().toString());
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div
      style={{
        fontFamily: "'Jost', sans-serif",
        background: "#17130F",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#F8F5EF",
          borderRadius: "16px",
          padding: "48px 40px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
        <img
          src="/logo/logo.png"
          alt="MBS"
          style={{ width: 64, height: 64, borderRadius: 12, objectFit: "contain", marginBottom: 16 }}
        />
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 24,
            fontWeight: 600,
            color: "#17130F",
            marginBottom: 4,
          }}
        >
          MBS Islamic Accessories
        </div>
        <div
          style={{
            fontSize: 14,
            color: "#888",
            marginBottom: 32,
            letterSpacing: 1,
            textTransform: "uppercase" as const,
            fontWeight: 400,
          }}
        >
          Admin Dashboard
        </div>

        {error && (
          <div
            style={{
              background: "#fef2f2",
              color: "#dc2626",
              fontSize: 13,
              padding: "10px 14px",
              borderRadius: 8,
              marginBottom: 20,
              border: "1px solid #fecaca",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ marginBottom: 20, textAlign: "left" }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#555", marginBottom: 6 }}>
            Username
          </label>
          <input
            ref={usernameRef}
            type="text"
            placeholder="Enter username"
            autoComplete="username"
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontFamily: "'Jost', sans-serif",
              fontSize: 15,
              border: "1.5px solid #ddd",
              borderRadius: 8,
              background: "#fff",
              color: "#17130F",
              outline: "none",
              boxSizing: "border-box" as const,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#C6A15B";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(198,161,91,0.15)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#ddd";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        <div style={{ marginBottom: 20, textAlign: "left" }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#555", marginBottom: 6 }}>
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter password"
            autoComplete="current-password"
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontFamily: "'Jost', sans-serif",
              fontSize: 15,
              border: "1.5px solid #ddd",
              borderRadius: 8,
              background: "#fff",
              color: "#17130F",
              outline: "none",
              boxSizing: "border-box" as const,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#C6A15B";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(198,161,91,0.15)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#ddd";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: 14,
            fontFamily: "'Jost', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: 0.5,
            background: "#C6A15B",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#b8933f")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#C6A15B")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
