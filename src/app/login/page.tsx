"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

// Extend the type for session.user
interface UserWithExtraFields {
  id?: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  avatarUrl?: string | null;
  provider?: string | null;
}

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const called = useRef(false);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3002';

  useEffect(() => {
    if (status === "loading") return;
    if (session && !called.current) {
      const user = session.user as UserWithExtraFields;
      if (!user) return;
      called.current = true;
      fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id || "",
          email: user.email || "",
          name: user.name || "",
          avatarUrl: user.avatarUrl || user.image || "",
          provider: user.provider || "google",
        }),
      }).catch(console.error);
      router.replace("/");
    }
  }, [session, status, router]);

  if (session) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          background: 'rgba(255, 255, 255, 0.25)',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
          minWidth: 340,
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2 style={{ marginBottom: 28, fontWeight: 700, fontSize: 24, color: '#222', letterSpacing: 1 }}>
          Ðang nh?p
        </h2>
        <button
          onClick={() => signIn('google')}
          style={{
            background: 'rgba(66,133,244,0.85)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 28px',
            fontSize: 17,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(66,133,244,0.10)',
            transition: 'background 0.2s, box-shadow 0.2s',
            backdropFilter: 'blur(2px)',
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(66,133,244,1)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(66,133,244,0.18)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(66,133,244,0.85)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(66,133,244,0.10)';
          }}
        >
          Ðang nh?p v?i Google
        </button>
      </div>
    </div>
  );
} 
