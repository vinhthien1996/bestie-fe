import React, { useEffect, useState } from "react";
import axios from "axios";

interface ProductListProps {
  email: string | undefined | null;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // if (!email) return;
    setLoading(true);
    setError(null);
    const apiUrl = process.env.REACT_APP_API_URL || 'https://bestie-be.onrender.com';
    axios.get(`${apiUrl}/products`)
      .then((res: { data: any }) => {
        if (res.data && typeof res.data === 'object' && res.data.message === 'B?n chua cài d?t app!') {
          setError(res.data.message);
          setProducts(null);
        } else {
          setProducts(res.data);
        }
      })
      .catch((err: any) => {
        if (err.response && err.response.status === 404 && err.response.data?.message) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: 900, position: 'relative' }}>
      <h3 style={{ fontWeight: 600, fontSize: 20, marginBottom: 14, textAlign: 'center' }}>
        Danh sách s?n ph?m
      </h3>
      {error === 'B?n chua cài d?t app!' && (
        <div style={{
          background: '#fffbe6',
          color: '#ad6800',
          border: '1px solid #ffe58f',
          borderRadius: 6,
          padding: '14px 18px',
          marginBottom: 18,
          textAlign: 'center',
          fontWeight: 500,
          fontSize: 15,
          maxWidth: 500,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {error}
        </div>
      )}
      {loading && <div>Ðang t?i d? li?u s?n ph?m...</div>}
      {error && error !== 'B?n chua cài d?t app!' && <div style={{ color: 'red' }}>L?i: {error}</div>}
      {products && Array.isArray(products) && !error && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
            marginTop: 10,
          }}
        >
          {products.map((p: any) => (
            <div
              key={p.id}
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                padding: 18,
                minHeight: 160,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: 'cover',
                    borderRadius: 8,
                    marginBottom: 10,
                    background: '#f3f4f6',
                    border: '1px solid #e5e7eb',
                  }}
                />
              )}
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6, color: '#222', textAlign: 'center' }}>{p.title}</div>
              {p.body_html && (
                <div
                  style={{
                    fontSize: 13,
                    color: '#444',
                    textAlign: 'center',
                    opacity: 0.85,
                  }}
                  dangerouslySetInnerHTML={{ __html: p.body_html }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 
