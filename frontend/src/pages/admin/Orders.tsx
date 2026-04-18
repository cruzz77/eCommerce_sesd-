import React, { useEffect, useState } from 'react';
import ordersApi from '../../api/orders';
import { Order, OrderStatus } from '../../types';
import OrderStatusBadge from '../../components/OrderStatusBadge';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await ordersApi.getAllOrders();
      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    try {
      await ordersApi.updateStatus(id, status);
      fetchOrders();
    } catch (err) {
      alert('Status update failed');
    }
  };

  return (
    <div className="pt-32 px-8 md:px-20 pb-20">
      <h1 className="font-display text-5xl uppercase italic mb-12">Total Transactions</h1>

      <div className="bg-surface border border-white-alpha overflow-hidden">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-white/5 uppercase tracking-widest">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white-alpha">
            {orders.map(order => (
              <tr key={order._id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold">{order._id.substring(0, 8)}...</td>
                <td className="p-4">
                  {typeof order.userId === 'object' ? order.userId.name : 'Guest'}
                </td>
                <td className="p-4">₹{order.totalAmount}</td>
                <td className="p-4"><OrderStatusBadge status={order.status} /></td>
                <td className="p-4 text-muted">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <select 
                    className="bg-black/40 border border-white-alpha p-2 font-mono text-[10px] outline-none"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value as OrderStatus)}
                  >
                    {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
