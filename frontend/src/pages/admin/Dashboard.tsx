import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productsApi from '../../api/products';
import ordersApi from '../../api/orders';
import { Order, Product } from '../../types';
import OrderStatusBadge from '../../components/OrderStatusBadge';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0, users: 0 });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [lowStock, setLowStock] = useState<Product[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const ordersRes = await ordersApi.getAllOrders();
      const productsRes = await productsApi.list();
      const lowStockRes = await productsApi.getLowStock();

      const orders = ordersRes.data.data;
      const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

      setStats({
        revenue: totalRevenue,
        orders: orders.length,
        products: productsRes.data.data.total,
        users: 12 // Mocked for now
      });

      setRecentOrders(orders.slice(0, 5));
      setLowStock(lowStockRes.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-32 px-8 md:px-20 pb-20">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="font-display text-5xl uppercase italic mb-2">Admin Control</h1>
          <p className="font-mono text-[10px] uppercase text-amber-accent tracking-[0.3em]">Management Console</p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {[
          { label: 'Total Revenue', value: `₹${stats.revenue.toLocaleString()}` },
          { label: 'Orders', value: stats.orders },
          { label: 'Products', value: stats.products },
          { label: 'Users', value: stats.users },
        ].map(stat => (
          <div key={stat.label} className="bg-surface border border-white-alpha p-8">
            <p className="font-mono text-[10px] uppercase text-muted tracking-widest mb-2">{stat.label}</p>
            <p className="font-display text-3xl">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* RECENT ORDERS */}
        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-8 italic">Recent Orders</h2>
          <div className="bg-surface border border-white-alpha overflow-hidden">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-white/5 uppercase tracking-widest">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white-alpha">
                {recentOrders.map(order => (
                  <tr key={order._id}>
                    <td className="p-4">{order._id.substring(0, 8)}</td>
                    <td className="p-4">₹{order.totalAmount}</td>
                    <td className="p-4"><OrderStatusBadge status={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* LOW STOCK ALERT */}
        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-error/60 mb-8 italic">Low Stock Alerts</h2>
          <div className="space-y-4">
            {lowStock.map(product => (
              <div key={product._id} className="bg-error/5 border border-error/20 p-4 flex justify-between items-center">
                <div>
                  <p className="font-display text-lg uppercase">{product.name}</p>
                  <p className="font-mono text-[10px] uppercase text-muted tracking-widest">Stock: {product.stock} Units</p>
                </div>
                <Link to="/admin/products" className="font-mono text-[10px] uppercase tracking-widest bg-error/10 px-4 py-2 hover:bg-error/20 transition-colors">Resolve</Link>
              </div>
            ))}
            {lowStock.length === 0 && <p className="text-muted font-mono text-xs">Inventory levels healthy.</p>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
