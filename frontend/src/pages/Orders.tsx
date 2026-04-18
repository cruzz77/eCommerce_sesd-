import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ordersApi from '../api/orders';
import { Order } from '../types';
import OrderStatusBadge from '../components/OrderStatusBadge';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await ordersApi.getMyOrders();
      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 px-8 md:px-20 pb-20">
      <h1 className="font-display text-5xl uppercase italic mb-12">My Orders</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-surface animate-pulse" />)}
        </div>
      ) : orders.length === 0 ? (
        <div className="py-20 text-center opacity-40">
          <p className="font-mono text-xs uppercase tracking-widest">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-surface border border-white-alpha p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 animate-fade-up">
              <div>
                <p className="font-mono text-[10px] uppercase text-muted tracking-widest mb-1">Order ID</p>
                <p className="font-mono text-sm uppercase">{order._id.substring(0, 8)}...</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase text-muted tracking-widest mb-1">Date</p>
                <p className="font-mono text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase text-muted tracking-widest mb-1">Total</p>
                <p className="font-mono text-sm">₹{order.totalAmount.toLocaleString()}</p>
              </div>
              <OrderStatusBadge status={order.status} />
              <Link 
                to={`/order/${order._id}`}
                className="font-mono text-[10px] uppercase tracking-widest border border-white-alpha px-4 py-2 hover:bg-white/5 transition-colors"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
