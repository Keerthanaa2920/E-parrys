import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiShoppingCart, FiTrash2, FiMinus, FiPlus, FiCheckCircle, FiClock } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { mockDbService } from '../../services/mockDbService';
import { AnimatePresence, motion } from 'framer-motion';

export const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Success Modal State
  const [orderRef, setOrderRef] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    // Generate simulated order reference number
    const randomRef = `EP-${Math.floor(100000 + Math.random() * 900000)}`;

    // Save orders to mock DB for each item in the cart
    cartItems.forEach(item => {
      mockDbService.addOrder({
        productId: item.product.id,
        productName: item.product.productName,
        vendorName: item.product.vendorName,
        buyerName: 'Guest User', // No customer details needed
        quantity: item.quantity,
        amount: item.product.amount * item.quantity
      });
    });

    setOrderRef(randomRef);
    setSuccessModalOpen(true);

    // Clear cart after placing order
    clearCart();
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.amount * item.quantity, 0);

  return (
    <div className="bg-parrys-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FiShoppingCart className="text-parrys-terracotta h-6 w-6" />
          <h1 className="text-3xl font-bold text-parrys-charcoal font-serif">Your Sourcing Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl border border-parrys-surface-dim p-12 text-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-parrys-cream border border-parrys-surface-dim flex items-center justify-center text-parrys-muted mx-auto mb-6">
              <FiShoppingCart className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-parrys-charcoal font-serif mb-2">Your Cart is Empty</h2>
            <p className="text-sm text-parrys-muted mb-8 max-w-md mx-auto">
              You haven't added any construction materials to your cart yet. Browse our catalogue to build your order proposal.
            </p>
            <Link
              to="/products"
              className="inline-block bg-parrys-terracotta text-white px-8 py-3 rounded-custom text-sm font-bold uppercase tracking-wider hover:bg-parrys-terracotta-dark transition-colors shadow-lg shadow-parrys-terracotta/20"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const unit = (item.product as any).unit || 'units';
                const minQty = (item.product as any).minQty || 10;
                return (
                  <div
                    key={item.product.id}
                    className="bg-white rounded-xl border border-parrys-surface-dim p-5 flex flex-col sm:flex-row gap-5 justify-between items-start sm:items-center shadow-sm"
                  >
                    <div className="space-y-1.5 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted font-mono bg-parrys-cream px-2 py-0.5 rounded">
                        {item.product.vendorName}
                      </span>
                      <h3 className="text-lg font-bold text-parrys-charcoal font-serif">
                        {item.product.productName}
                      </h3>
                      <div className="text-xs text-parrys-muted font-mono font-semibold">
                        ₹{item.product.amount} / {unit} • Min. {minQty} {unit}s
                      </div>
                    </div>

                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex flex-col items-end gap-1">
                        <div className="text-sm font-bold text-parrys-terracotta font-mono">
                          ₹{(item.product.amount * item.quantity).toLocaleString('en-IN')}
                        </div>
                        {/* Quantity controls */}
                        <div className="flex items-center rounded-lg border border-parrys-surface-dim bg-parrys-cream p-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 text-slate-500 hover:text-parrys-charcoal disabled:opacity-40 transition-colors"
                            disabled={item.quantity <= minQty}
                          >
                            <FiMinus className="h-3 w-3" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || minQty)}
                            className="w-12 text-center bg-transparent border-0 text-sm font-bold font-mono focus:ring-0 p-0"
                          />
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 text-slate-500 hover:text-parrys-charcoal transition-colors"
                          >
                            <FiPlus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-2 rounded-full hover:bg-rose-50"
                        title="Remove item"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-parrys-surface-dim p-6 shadow-sm sticky top-28">
                <h2 className="text-sm font-bold text-parrys-muted uppercase tracking-wider mb-6">Order Summary</h2>
                
                <div className="space-y-4 text-sm mb-6">
                  <div className="flex justify-between items-center text-parrys-charcoal font-semibold">
                    <span>Total Items</span>
                    <span className="font-mono">{cartItems.length}</span>
                  </div>
                  <div className="h-px bg-parrys-surface-dim/50"></div>
                  <div className="flex justify-between items-center text-lg font-bold text-parrys-charcoal font-serif">
                    <span>Total Proposal</span>
                    <span className="text-parrys-terracotta font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="text-[11px] text-parrys-muted italic leading-relaxed bg-parrys-cream border border-parrys-surface-dim/30 p-3 rounded-lg mb-6">
                  * Note: This is an estimated price proposal. Our distributor team will contact you to finalize logistics discounts, tax inputs, and site unloading specs.
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-parrys-terracotta text-white py-3.5 rounded-custom text-sm font-bold uppercase tracking-wider hover:bg-parrys-terracotta-dark transition-colors shadow-lg shadow-parrys-terracotta/20"
                >
                  Confirm & Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {successModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSuccessModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl border border-parrys-surface-dim p-6 md:p-8 max-w-md w-full shadow-2xl relative z-10 text-center space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                <FiCheckCircle className="h-8 w-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-parrys-terracotta uppercase tracking-widest font-mono">
                  Order Submitted
                </span>
                <h3 className="text-xl font-bold font-serif text-parrys-charcoal">
                  Direct Sourcing Initialized!
                </h3>
                <p className="text-xs text-parrys-muted font-mono font-bold">
                  Order Proposal Ref: {orderRef}
                </p>
              </div>

              <div className="bg-parrys-cream border border-parrys-surface-dim/40 rounded-xl p-4 text-xs text-parrys-charcoal leading-relaxed text-left space-y-2">
                <p className="font-bold flex items-center gap-1.5 text-parrys-terracotta">
                  <FiClock className="shrink-0" />
                  <span>Next Steps</span>
                </p>
                <p>
                  Our operations team has received your materials proposal and will process it shortly. Thank you for choosing E-Parrys!
                </p>
              </div>

              <button
                onClick={() => {
                  setSuccessModalOpen(false);
                  navigate('/');
                }}
                className="w-full bg-parrys-charcoal text-white hover:bg-parrys-terracotta py-3 rounded-custom text-xs font-bold uppercase transition-colors"
              >
                Return to Storefront
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
