'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AuthGuard from "./AuthGuard";
import axios from "axios";
import ProductList from "./ProductList";

export default function Home() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // State cho export modal
  const [showExport, setShowExport] = useState(false);
  const [copied, setCopied] = useState(false);

  // Hàm generate script nhúng
  const generateEmbedScript = () => {
    // Có thể tuỳ chỉnh endpoint/script này theo backend
    return `<script src=\"http://localhost:3000/embed.js?email=${session?.user?.email || ''}\"></script>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateEmbedScript());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 font-[family-name:var(--font-geist-sans)]">
        <button
          onClick={() => signOut()}
          style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, background: '#eee', border: '1px solid #ccc', borderRadius: 6, padding: '8px 18px', fontWeight: 500, cursor: 'pointer' }}
        >
          Đăng xuất
        </button>
        {/* Thông tin user */}
        {session?.user && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            gap: 18,
            background: '#fff',
            borderRadius: 8,
            padding: '18px 28px',
            marginBottom: 32,
            border: '1px solid #e5e7eb',
            minWidth: 280,
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 18, color: '#222' }}>{session.user.name || 'No name'}</div>
              <div style={{ fontSize: 14, color: '#555', opacity: 0.85 }}>{session.user.email}</div>
            </div>
          </div>
        )}
        {/* Danh sách sản phẩm */}
        <div style={{ width: '100%', maxWidth: 900, position: 'relative' }}>
          <h3 style={{ fontWeight: 600, fontSize: 20, marginBottom: 14, textAlign: 'center' }}>
            Danh sách sản phẩm
            {/* Nút Export */}
            <button
              onClick={() => setShowExport(true)}
              style={{ marginLeft: 16, fontSize: 14, padding: '4px 14px', borderRadius: 5, border: '1px solid #ccc', background: '#f5f5f5', cursor: 'pointer', fontWeight: 500 }}
            >
              Export
            </button>
          </h3>
          {/* Modal export script */}
          {showExport && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.25)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
              onClick={() => setShowExport(false)}
            >
              <div
                  style={{
                    background: '#fff',
                  borderRadius: 10,
                  padding: 28,
                  minWidth: 340,
                  maxWidth: '90vw',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
                  position: 'relative',
                }}
                onClick={e => e.stopPropagation()}
              >
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 12 }}>Script nhúng vào web khác</div>
                <textarea
                  readOnly
                  value={generateEmbedScript()}
                  style={{ width: '100%', minHeight: 60, fontSize: 14, padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginBottom: 12, resize: 'none', background: '#f8f8f8' }}
                />
                <button
                  onClick={handleCopy}
                  style={{ padding: '6px 18px', borderRadius: 5, border: '1px solid #ccc', background: copied ? '#d1fae5' : '#f5f5f5', fontWeight: 500, cursor: 'pointer', marginRight: 10 }}
                >
                  {copied ? 'Đã copy!' : 'Copy'}
                </button>
                <button
                  onClick={() => setShowExport(false)}
                  style={{ padding: '6px 18px', borderRadius: 5, border: '1px solid #ccc', background: '#f5f5f5', fontWeight: 500, cursor: 'pointer' }}
                >
                  Đóng
                </button>
                </div>
            </div>
          )}
          {/* Render ProductList */}
          <ProductList />
        </div>
      </div>
    </AuthGuard>
  );
}
