import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { PaymentMethod } from '../types';
import ordersApi from '../api/orders';
import paymentsApi from '../api/payments';

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [method, setMethod] = useState<PaymentMethod>(PaymentMethod.CREDIT_CARD);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shipping, setShipping] = useState({
    name: '',
    address: '',
    city: '',
    pin: ''
  });

  const subtotal = cart?.items.reduce((sum, item) => sum + item.priceSnapshot * item.quantity, 0) || 0;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    try {
      // 1. Create Order
      const orderRes = await ordersApi.checkout({ shippingAddress: shipping });
      const order = orderRes.data.data;

      // 2. Initiate Payment
      const payRes = await paymentsApi.initiate({ orderId: order._id, method });
      
      if (payRes.data.success) {
        setShowSuccess(true);
        clearCart();
        setTimeout(() => navigate('/orders'), 3000);
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Transaction could not be authorized. Please verify your details.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="h-screen flex items-center justify-center bg-background p-8">
        <div className="max-w-md w-full text-center space-y-8 animate-fade-up">
          <div className="w-20 h-20 border border-amber-accent/30 rounded-full flex items-center justify-center mx-auto mb-12">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-amber-accent">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber-accent">Transaction Verified</p>
          <h2 className="font-display text-5xl uppercase italic">Order Sequence <br /> Initiated</h2>
          <p className="font-baskerville text-muted text-lg">
            Your selection has been archived and is being prepared for dispatch. Redirecting to your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 px-8 md:px-20 pb-20">
      <h1 className="font-display text-5xl uppercase italic mb-12">Checkout</h1>
      
      <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row gap-20">
        {/* LEFT: FORM */}
        <div className="flex-1 space-y-12">
          <section>
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-8 italic">Shipping Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                required
                placeholder="Full Name"
                className="bg-surface border border-white-alpha p-4 font-mono text-sm focus:border-amber-accent outline-none"
                value={shipping.name}
                onChange={e => setShipping({...shipping, name: e.target.value})}
              />
              <input 
                required
                placeholder="PIN Code"
                className="bg-surface border border-white-alpha p-4 font-mono text-sm focus:border-amber-accent outline-none"
                value={shipping.pin}
                onChange={e => setShipping({...shipping, pin: e.target.value})}
              />
              <input 
                required
                placeholder="Address"
                className="md:col-span-2 bg-surface border border-white-alpha p-4 font-mono text-sm focus:border-amber-accent outline-none"
                value={shipping.address}
                onChange={e => setShipping({...shipping, address: e.target.value})}
              />
              <input 
                required
                placeholder="City"
                className="bg-surface border border-white-alpha p-4 font-mono text-sm focus:border-amber-accent outline-none"
                value={shipping.city}
                onChange={e => setShipping({...shipping, city: e.target.value})}
              />
            </div>
          </section>

          <section>
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-8 italic">Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: PaymentMethod.CREDIT_CARD, label: 'Credit Card', icon: '💳' },
                { id: PaymentMethod.UPI, label: 'UPI', icon: '📱' },
                { id: PaymentMethod.WALLET, label: 'Wallet', icon: '💰' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMethod(item.id)}
                  className={`p-6 border flex flex-col items-center gap-4 transition-all ${method === item.id ? 'border-amber-accent bg-amber-accent/5' : 'border-white-alpha bg-surface hover:bg-white/5'}`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest">{item.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="w-full lg:w-96">
          <div className="bg-surface border border-white-alpha p-8 sticky top-32">
            <h2 className="font-display text-2xl uppercase italic mb-8">Summary</h2>
            <div className="space-y-4 font-mono text-xs uppercase tracking-widest mb-8">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <div className="pt-4 border-t border-white-alpha flex justify-between text-lg font-display">
                <span className="italic">Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
            </div>

            {errorMessage && (
              <div className="bg-error/10 border border-error/20 p-4 mb-6 animate-fade-up">
                <p className="font-mono text-[10px] uppercase text-error text-center tracking-widest leading-relaxed">
                  {errorMessage}
                </p>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading || !cart?.items.length}
              className="w-full btn-amber py-4 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
