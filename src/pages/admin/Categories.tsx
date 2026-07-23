import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState([
    { id: "CAT-001", name: "Cement & Aggregates", itemsCount: 18 },
    { id: "CAT-002", name: "Steel & Reinforcement", itemsCount: 15 },
    { id: "CAT-003", name: "Ceramics & Flooring", itemsCount: 12 },
    { id: "CAT-004", name: "Electricals & Pipes", itemsCount: 9 },
    { id: "CAT-005", name: "Paints & Wall Finishes", itemsCount: 6 }
  ]);

  const [newCatName, setNewCatName] = useState('');
  const [toast, setToast] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;

    const newCat = {
      id: `CAT-${(categories.length + 1).toString().padStart(3, '0')}`,
      name: newCatName,
      itemsCount: 0
    };

    setCategories([...categories, newCat]);
    setNewCatName('');
    
    setToast(`Category ${newCat.name} created successfully.`);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    setCategories(categories.filter(c => c.id !== id));
    setToast(`Category ${name} deleted.`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Category Configuration</h1>
        <p className="text-xs text-gray-500 mt-1">Manage, add, or archive custom marketplace categories.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Add Form */}
        <div className="md:col-span-1">
          <form onSubmit={handleAdd} className="rounded-xl border border-orange-100 bg-white p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 border-b border-orange-100 pb-2">
              Add New Category
            </h3>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Category Name</label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Masonry & Bricks"
                className="w-full rounded-lg border border-orange-200 bg-white px-3 py-2 text-xs text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/20 hover:from-orange-400 hover:to-orange-500 transition"
            >
              <FiPlus className="h-4.5 w-4.5" />
              <span>Create Category</span>
            </button>
          </form>
        </div>

        {/* Categories list */}
        <div className="md:col-span-2 rounded-xl border border-orange-100 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-orange-50/50 border-b border-orange-100 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                <th className="py-3 px-4">Category ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4 text-center">Live Listings</th>
                <th className="py-3 px-4 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50 text-xs text-gray-700">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-orange-50/30 transition">
                  <td className="py-3.5 px-4 font-mono font-semibold text-orange-600">{c.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{c.name}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-gray-500">{c.itemsCount}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(c.id, c.name)}
                      className="flex h-7 w-7 items-center justify-center rounded border border-orange-200 bg-white text-gray-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition focus:outline-none ml-auto shadow-sm"
                      title="Archive Category"
                    >
                      <FiTrash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-xs font-semibold text-gray-800 shadow-2xl"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-500" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
