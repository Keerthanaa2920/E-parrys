import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiFolder, FiCheckCircle } from 'react-icons/fi';
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
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">Category Configuration</h1>
        <p className="text-xs text-slate-400 mt-1">Manage, add, or archive custom marketplace categories.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Add Form */}
        <div className="md:col-span-1">
          <form onSubmit={handleAdd} className="rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/65 p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-455 border-b border-slate-800 pb-2">
              Add New Category
            </h3>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Category Name</label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Masonry & Bricks"
                className="w-full rounded-lg border border-[var(--color-brand-border)] bg-slate-950 px-3 py-2 text-xs text-slate-350 focus:border-[var(--color-brand-cyan)] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-650 py-2.5 text-xs font-bold text-white shadow-lg hover:from-cyan-500 hover:to-indigo-550 transition"
            >
              <FiPlus className="h-4.5 w-4.5" />
              <span>Create Category</span>
            </button>
          </form>
        </div>

        {/* Categories list */}
        <div className="md:col-span-2 rounded-xl border border-[var(--color-brand-border)] bg-[#0f172a]/65 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/60 border-b border-[var(--color-brand-border)] text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Category ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4 text-center">Live Listings</th>
                <th className="py-3 px-4 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-xs text-slate-300">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/30 transition">
                  <td className="py-3.5 px-4 font-mono font-semibold text-[var(--color-brand-cyan)]">{c.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-200">{c.name}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-400">{c.itemsCount}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(c.id, c.name)}
                      className="flex h-7 w-7 items-center justify-center rounded border border-slate-700 bg-slate-900 text-slate-400 hover:border-rose-500/30 hover:text-rose-455 transition focus:outline-none ml-auto"
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
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-emerald-500/20 bg-slate-950 px-4 py-3 text-xs font-semibold text-slate-200 shadow-2xl"
          >
            <FiCheckCircle className="h-4.5 w-4.5 text-emerald-450" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
