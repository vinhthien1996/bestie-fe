import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axios from "axios";
const ProductList = ({ email }) => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3002';
    useEffect(() => {
        if (!email)
            return;
        setLoading(true);
        setError(null);
        axios.get(`${apiUrl}/shopify/products?email=${encodeURIComponent(email)}`)
            .then((res) => {
            if (res.data && typeof res.data === 'object' && res.data.message === 'B?n chua cài d?t app!') {
                setError(res.data.message);
                setProducts(null);
            }
            else {
                setProducts(res.data);
            }
        })
            .catch((err) => {
            var _a;
            if (err.response && err.response.status === 404 && ((_a = err.response.data) === null || _a === void 0 ? void 0 : _a.message)) {
                setError(err.response.data.message);
            }
            else {
                setError(err.message);
            }
        })
            .finally(() => setLoading(false));
    }, [email]);
    return (_jsxs("div", { style: { width: '100%', maxWidth: 900, position: 'relative' }, children: [_jsx("h3", { style: { fontWeight: 600, fontSize: 20, marginBottom: 14, textAlign: 'center' }, children: "Danh s\u00E1ch s\u1EA3n ph\u1EA9m" }), error === 'B?n chua cài d?t app!' && (_jsx("div", { style: {
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
                }, children: error })), loading && _jsx("div", { children: "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u s\u1EA3n ph\u1EA9m..." }), error && error !== 'B?n chua cài d?t app!' && _jsxs("div", { style: { color: 'red' }, children: ["L\u1ED7i: ", error] }), products && Array.isArray(products) && !error && (_jsx("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: 20,
                    marginTop: 10,
                }, children: products.map((p) => (_jsxs("div", { style: {
                        background: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: 8,
                        padding: 18,
                        minHeight: 160,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }, children: [p.image && (_jsx("img", { src: p.image, alt: p.title, style: {
                                width: 64,
                                height: 64,
                                objectFit: 'cover',
                                borderRadius: 8,
                                marginBottom: 10,
                                background: '#f3f4f6',
                                border: '1px solid #e5e7eb',
                            } })), _jsx("div", { style: { fontWeight: 600, fontSize: 16, marginBottom: 6, color: '#222', textAlign: 'center' }, children: p.title }), p.body_html && (_jsx("div", { style: {
                                fontSize: 13,
                                color: '#444',
                                textAlign: 'center',
                                opacity: 0.85,
                            }, dangerouslySetInnerHTML: { __html: p.body_html } }))] }, p.id))) }))] }));
};
export default ProductList;
