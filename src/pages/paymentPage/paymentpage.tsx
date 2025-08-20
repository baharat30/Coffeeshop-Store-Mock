import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import Spinner from '../../components/spinner/spinner';
import './PaymentPage.css';
import { useCart } from '../../context/CartContext';

type CartItemType = {
    colorKey?: string;
    id: number;
    product_name?: string;
    title?: string;
    price: number;
    quantity?: number;
};

const shippingOptions = [
    { id: 'post', label: 'Express Post', cost: 55000 },
    { id: 'tipax', label: 'Tipax', cost: 'Pay on Delivery' },
];

const paymentMethods = [
    { id: 'saman', label: 'Saman Bank Gateway' },
    { id: 'mellat', label: 'Mellat Bank Gateway' },
    { id: 'snappay', label: 'Payment via SnappPay' },
];

const PaymentPage: React.FC = () => {
    const { cartItems, removeFromCart } = useCart();
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        postalCode: '',
        phone: '',
        email: '',
        customerNote: ''
    });

    const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0].id);
    const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);

    const selectedShippingCost = shippingOptions.find(o => o.id === selectedShipping)?.cost;

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0
    ) + (typeof selectedShippingCost === 'number' ? selectedShippingCost : 0);

    const handleRemoveItem = (id: number, colorKey?: string) => {
        removeFromCart(id, colorKey);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/checkout');
            } else {
                setUser(user);
            }
            setLoading(false);
        };
        fetchUser();
    }, [navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        alert('You must be logged in to place an order.');
        return;
    }

    try {
        // برای تست اول: همه کاربرهای لاگین شده اجازه دارند
        const { data: insertedOrders, error: insertError } = await supabase
            .from('orders')
            .insert([
                {
                    user_id: user.id, // ← حتماً UUID واقعی کاربر
                    full_name: formData.fullName,
                    address: formData.address,
                    postal_code: formData.postalCode,
                    phone: formData.phone,
                    email: formData.email,
                    note: formData.customerNote,
                    shipping_method: selectedShipping,
                    payment_method: selectedPayment,
                    total_price: totalPrice,
                    cart_items: JSON.parse(JSON.stringify(cartItems)),
                }
            ])
            .select();

        if (insertError) {
            console.error('Order submission error:', insertError);
            alert('An error occurred while placing the order.');
            return;
        }

        const insertedOrder = insertedOrders?.[0];
        if (insertedOrder) {
            navigate(`/payment-success?order_id=${insertedOrder.id}`);
        } else {
            alert('The order was placed successfully, but could not fetch order info.');
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        alert('An unexpected error occurred.');
    }
};

    if (loading) return <Spinner />;
    if (!user) return null;

    return (
        <div className="payment-page" style={{ maxWidth: 600, margin: 'auto', direction: 'ltr', textAlign: 'left', fontFamily: 'Tahoma, sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Payment Page</h1>
            <form onSubmit={handleSubmit}>

                {/* Your Information */}
                <div style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8, marginBottom: 20, textAlign: 'left' }}>
                    <h2 className="payment-page__heading" style={{ textAlign: 'left' }}>Your Information:</h2>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="First & Lastname"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: '1px solid #ccc', direction: 'ltr', textAlign: 'left' }}
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: '1px solid #ccc', direction: 'ltr', textAlign: 'left' }}
                    />
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: '1px solid #ccc', direction: 'ltr', textAlign: 'left' }}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: '1px solid #ccc', direction: 'ltr', textAlign: 'left' }}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: '1px solid #ccc', direction: 'ltr', textAlign: 'left' }}
                    />
                    <textarea
                        name="customerNote"
                        placeholder="Write your notes or comments here..."
                        value={formData.customerNote}
                        onChange={handleInputChange}
                        rows={4}
                        style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', direction: 'ltr', textAlign: 'left' }}
                    />
                </div>

                {/* Items in Your Order */}
                <div style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8, marginBottom: 20 }}>
                    <h2 className="payment-page__heading" style={{ textAlign: 'left' }}>Items in Your Order:</h2>
                    {cartItems.length === 0 ? (
                        <p style={{ fontSize: '19px', color: '#ab6464ff' }}>Your Shopping Cart is Empty</p>
                    ) : (
                        <ul className="payment-items-list">
                            {cartItems.map(item => (
                                <li key={item.id + (item.colorKey || '')} style={{ position: 'relative' }}>
                                    <img src={(item as any).selectedImage || (item as any).image || ''} alt={item.title || 'product'} />
                                    <div className="text-container">
                                        <div style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</div>
                                        <div>Quantity: {item.quantity || 1}</div>
                                        <div style={{ fontWeight: 'bold' }}>
                                            {(item.price * (item.quantity || 1)).toLocaleString()} Tomans
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item.id, item.colorKey)}
                                        style={{
                                            position: 'absolute',
                                            top: 5,
                                            right: 5,
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            color: '#a34667',
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            cursor: 'pointer',
                                            lineHeight: 1,
                                            padding: 0,
                                        }}
                                        aria-label="Remove item"
                                    >
                                        ×
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Delivery Method */}
                <div style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8, marginBottom: 20 }}>
                    <h2 className="payment-page__heading" style={{ textAlign: 'left' }}>Delivery Method:</h2>
                    {shippingOptions.map(option => (
                        <label key={option.id} style={{ display: 'block', marginBottom: 8, cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="shipping"
                                value={option.id}
                                checked={selectedShipping === option.id}
                                onChange={() => setSelectedShipping(option.id)}
                                style={{ marginRight: 8 }}
                            />
                            {option.label} (
                            {typeof option.cost === 'number' ? option.cost.toLocaleString() + ' Tomans' : option.cost}
                            )
                        </label>
                    ))}
                </div>

                {/* Payment Methods */}
                <div style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8, marginBottom: 20 }}>
                    <h2 className="payment-page__heading" style={{ textAlign: 'left' }}>Payment Methods:</h2>
                    {paymentMethods.map(method => (
                        <label key={method.id} style={{ display: 'block', marginBottom: 8, cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="payment"
                                value={method.id}
                                checked={selectedPayment === method.id}
                                onChange={() => setSelectedPayment(method.id)}
                                style={{ marginRight: 8 }}
                            />
                            {method.label}
                        </label>
                    ))}
                </div>

                <h2 className="payment-page__heading" style={{ textAlign: 'right' }}>Total Amount: {totalPrice.toLocaleString()} Tomans</h2>
                {cartItems.length > 0 && (
                    <button
                        type="submit"
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: 15,
                            backgroundColor: '#3d0808',
                            color: 'white',
                            fontSize: 18,
                            borderRadius: 8,
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Complete Purchase
                    </button>
                )}
            </form>
        </div>
    );
};

export default PaymentPage;
