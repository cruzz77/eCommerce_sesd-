import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ordersApi from '../api/orders';
import { Order } from '../types';
import OrderStatusBadge from '../components/OrderStatusBadge';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await ordersApi.getById(id!);
      setOrder(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 border-2 border-amber-accent border-t-transparent rounded-full animate-spin" /></div>;
  if (!order) return <div className="h-screen flex items-center justify-center bg-background">Order Not Found</div>;

  return (
    <div className="pt-32 px-8 md:px-20 pb-20 max-w-7xl mx-auto">
      <Link to="/orders" className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-amber-accent transition-colors flex items-center gap-2 mb-12">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Archives
      </Link>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20 border-b border-white-alpha pb-12">
        <div>
          <p className="font-mono text-[10px] uppercase text-muted tracking-widest mb-4 italic">Confirmation Voucher</p>
          <h1 className="font-display text-5xl uppercase italic tracking-tighter mb-4">
            Order #{order._id.substring(order._id.length - 8).toUpperCase()}
          </h1>
          <p className="font-mono text-xs text-muted">Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
        </div>
        <div className="flex flex-col items-end gap-4">
          <OrderStatusBadge status={order.status} />
          <p className="font-mono text-[10px] uppercase tracking-widest text-success bg-success/10 px-4 py-2 border border-success/20">Payment Verified</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        {/* ITEMS */}
        <div className="lg:col-span-2 space-y-12">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted italic">Archived Pieces</h2>
          <div className="space-y-8">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-8 group">
                <div className="w-24 h-32 bg-surface border border-white-alpha overflow-hidden shrink-0">
                  <img src={(item.productId as any).images?.[0] || 'https://via.placeholder.com/400x600'} alt={item.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-display text-xl uppercase italic mb-2 tracking-wide">{item.name}</h3>
                  <div className="flex justify-between items-end border-b border-white-alpha/20 pb-4">
                    <span className="font-mono text-[10px] text-muted uppercase tracking-widest">Qty: {item.qty}</span>
                    <span className="font-display text-lg">₹{item.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS SIDEBAR */}
        <div className="space-y-12 bg-surface border border-white-alpha p-8 h-fit">
          <section>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-accent mb-6 italic border-b border-amber-accent/20 pb-2 w-fit">Shipping Destination</h3>
            <div className="font-mono text-xs space-y-2 uppercase tracking-widest leading-relaxed">
              <p className="text-ice">{order.shippingAddress.name}</p>
              <p className="text-muted">{order.shippingAddress.address}</p>
              <p className="text-muted">{order.shippingAddress.city} - {order.shippingAddress.pin}</p>
            </div>
          </section>

          <section>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-accent mb-6 italic border-b border-amber-accent/20 pb-2 w-fit">Fiscal Summary</h3>
            <div className="space-y-4 font-mono text-xs uppercase tracking-widest">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>₹{order.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Logistic Fee</span>
                <span className="text-success">N/A (Courtesy)</span>
              </div>
              <div className="pt-4 border-t border-white-alpha flex justify-between text-xl font-display text-ice">
                <span className="italic">Grand Total</span>
                <span>₹{order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
