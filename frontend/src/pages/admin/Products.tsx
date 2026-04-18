import React, { useEffect, useState } from 'react';
import productsApi from '../../api/products';
import { Product, Category } from '../../types';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    images: ['https://picsum.photos/800/600']
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resP, resC] = await Promise.all([
        productsApi.list({ limit: 100 }),
        productsApi.listCategories()
      ]);
      setProducts(resP.data.data.items);
      setCategories(resC.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await productsApi.update(editingId, formData);
      } else {
        await productsApi.create(formData);
      }
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ name: '', description: '', price: '', stock: '', categoryId: '', images: ['https://picsum.photos/800/600'] });
      fetchData();
    } catch (err) {
      alert('Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Archive this piece permanentely?')) return;
    try {
      await productsApi.delete(id);
      fetchData();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="pt-32 px-8 md:px-20 pb-20">
      <div className="flex justify-between items-end mb-12">
        <h1 className="font-display text-5xl uppercase italic">Inventory</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn-amber">Add New Piece</button>
      </div>

      <div className="bg-surface border border-white-alpha overflow-hidden">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-white/5 uppercase tracking-widest">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white-alpha">
            {products.map(product => (
              <tr key={product._id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-display text-sm tracking-wide">{product.name}</td>
                <td className="p-4">{typeof product.categoryId === 'object' ? product.categoryId.name : 'N/A'}</td>
                <td className="p-4">₹{product.price}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        setEditingId(product._id);
                        setFormData({
                          name: product.name,
                          description: product.description,
                          price: product.price.toString(),
                          stock: product.stock.toString(),
                          categoryId: typeof product.categoryId === 'object' ? product.categoryId._id : (product.categoryId as string),
                          images: product.images
                        });
                        setIsModalOpen(true);
                      }}
                      className="text-amber-accent hover:underline"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="text-error hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/80 backdrop-blur-md">
          <form onSubmit={handleCreateOrUpdate} className="bg-surface border border-white-alpha p-12 w-full max-w-2xl space-y-8 animate-fade-up">
            <h2 className="font-display text-3xl uppercase italic">{editingId ? 'Edit Piece' : 'Add New Piece'}</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <input 
                required
                placeholder="Name"
                className="col-span-2 bg-black/40 border border-white-alpha p-4 font-mono text-xs focus:border-amber-accent outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <textarea 
                required
                placeholder="Description"
                className="col-span-2 bg-black/40 border border-white-alpha p-4 font-mono text-xs h-32 focus:border-amber-accent outline-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
              <input 
                required
                placeholder="Price"
                type="number"
                className="bg-black/40 border border-white-alpha p-4 font-mono text-xs focus:border-amber-accent outline-none"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
              <input 
                required
                placeholder="Stock"
                type="number"
                className="bg-black/40 border border-white-alpha p-4 font-mono text-xs focus:border-amber-accent outline-none"
                value={formData.stock}
                onChange={e => setFormData({...formData, stock: e.target.value})}
              />
              <select
                required
                className="bg-black/40 border border-white-alpha p-4 font-mono text-xs focus:border-amber-accent outline-none"
                value={formData.categoryId}
                onChange={e => setFormData({...formData, categoryId: e.target.value})}
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button type="submit" className="flex-1 btn-amber">{editingId ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 btn-ghost">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
