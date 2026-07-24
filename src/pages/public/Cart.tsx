import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiShoppingCart,
  FiTrash2,
  FiMinus,
  FiPlus,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiShield,
  FiFileText,
  FiMapPin,
  FiPackage,
  FiArrowRight,
  FiArrowLeft,
  FiDownload,
  FiCheck,
  FiBriefcase,
  FiTag,
  FiPercent,
  FiBox,
  FiLayers,
  FiPrinter,
  FiLock,
  FiCreditCard,
  FiSmartphone,
  FiPhone,
  FiUser,
  FiHome,
  FiInfo,
  FiRefreshCw
} from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { mockDbService } from '../../services/mockDbService';
import { ordersApi } from '../../api/orders.api';
import { AnimatePresence, motion } from 'framer-motion';
import type { IMarketplaceItem } from '../../types/dashboard';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, addToCart } = useCart();
  const navigate = useNavigate();

  // 3-Step Wizard Navigation State (1: Materials, 2: Logistics & GST, 3: Razorpay Checkout)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Logistics & Business Tax State
  const [pincode, setPincode] = useState('600001');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState('Plot No 45, Phase III, Industrial Estate, Guindy');
  const [siteContactPerson, setSiteContactPerson] = useState('Rajesh Kumar (Site Manager)');
  const [contactPhone, setContactPhone] = useState('+91 98401 23456');
  const [gstin, setGstin] = useState('33AAAAA0000A1Z5');
  const [companyName, setCompanyName] = useState('Apex Infrastructure & Construction');
  const [unloadingPref, setUnloadingPref] = useState<'flatbed' | 'crane' | 'labor'>('flatbed');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'neft' | 'po'>('razorpay');
  const [razorpaySimModalOpen, setRazorpaySimModalOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [razorpayPaymentId, setRazorpayPaymentId] = useState('');
  const [simUpiId, setSimUpiId] = useState('builder@upi');
  const [simCardNo, setSimCardNo] = useState('4111 •••• •••• 1111');
  const [simBank, setSimBank] = useState('HDFC Bank');

  // Modals
  const [orderRef, setOrderRef] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // Dynamically load Razorpay SDK if not present
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Recommended items for empty cart or quick cross-sells
  const allProducts = mockDbService.getProducts();
  const cartProductIds = new Set(cartItems.map((item) => item.product.id));
  const recommendedProducts = allProducts.filter((p) => !cartProductIds.has(p.id)).slice(0, 3);

  // Calculation Helpers
  const getEffectiveUnitPrice = (product: IMarketplaceItem, qty: number) => {
    const base = product.amount;
    if (product.pricingTiers && product.pricingTiers.length > 0) {
      const sorted = [...product.pricingTiers].sort((a, b) => b.minQty - a.minQty);
      const matched = sorted.find((t) => qty >= t.minQty);
      if (matched) {
        return { effectivePrice: matched.price, basePrice: base, discount: base - matched.price };
      }
    }
    return { effectivePrice: base, basePrice: base, discount: 0 };
  };

  const calculateTotalWeightInTonnes = () => {
    let totalKg = 0;
    cartItems.forEach((item) => {
      const weightPerUnit =
        (item.product as any).weightPerUnit ||
        (item.product.unitMeasure === 'tonnes' ? 1000 : 50);
      totalKg += weightPerUnit * item.quantity;
    });
    return (totalKg / 1000).toFixed(1);
  };

  // Subtotal & Financial Breakdown
  const baseSubtotal = cartItems.reduce((acc, item) => acc + item.product.amount * item.quantity, 0);

  const totalTierSavings = cartItems.reduce((acc, item) => {
    const { discount } = getEffectiveUnitPrice(item.product, item.quantity);
    return acc + discount * item.quantity;
  }, 0);

  const discountedSubtotal = baseSubtotal - totalTierSavings;

  const estimatedGst = Math.round(discountedSubtotal * 0.18); // 18% Standard Construction Tax

  const unloadingFee = unloadingPref === 'crane' ? 1200 : unloadingPref === 'labor' ? 800 : 0;

  const isFreeFreight = discountedSubtotal >= 50000;
  const freightFee = isFreeFreight || cartItems.length === 0 ? 0 : 2500;

  const totalProposalAmount = discountedSubtotal + estimatedGst + freightFee + unloadingFee;

  // Complete Order Creation Handler
  const finalizeOrderPlacement = (payId?: string, _mode?: string) => {
    if (cartItems.length === 0) return;

    const randomRef = `EP-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalPayId = payId || `pay_rzp_${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    cartItems.forEach((item) => {
      const { effectivePrice } = getEffectiveUnitPrice(item.product, item.quantity);
      
      // Save order to mock database and orders service
      ordersApi.createOrder({
        productId: item.product.id,
        productName: item.product.productName,
        vendorName: item.product.vendorName,
        buyerName: companyName.trim() || siteContactPerson || 'Guest Construction Manager',
        buyerPhone: contactPhone,
        quantity: item.quantity,
        amount: effectivePrice * item.quantity,
        status: 'pending',
        deliveryAddress: `${deliveryAddress}, Pincode: ${pincode}`,
        deliveryArea: `Pincode ${pincode}`,
        deliveryDate: new Date(Date.now() + 48 * 3600 * 1000).toISOString().split('T')[0]
      });
    });

    setOrderRef(randomRef);
    setRazorpayPaymentId(finalPayId);
    setSuccessModalOpen(true);
    setRazorpaySimModalOpen(false);
    setIsProcessingPayment(false);
    clearCart();
  };

  // Razorpay Checkout Execution Handler
  const handleInitiateRazorpayPayment = () => {
    if (cartItems.length === 0) return;
    setIsProcessingPayment(true);

    if (paymentMethod === 'razorpay') {
      // Check if Razorpay JS SDK is loaded and operational
      if (window.Razorpay) {
        try {
          const options = {
            key: 'rzp_test_eparrys_2026', // Razorpay Test Key Placeholder
            amount: totalProposalAmount * 100, // Amount in paise
            currency: 'INR',
            name: 'E-Parrys Construction Materials',
            description: `Bulk Material Order - ${cartItems.length} items (${calculateTotalWeightInTonnes()} MT)`,
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            handler: function (response: any) {
              const paymentId = response.razorpay_payment_id || `pay_${Date.now()}`;
              finalizeOrderPlacement(paymentId, 'Razorpay SDK');
            },
            prefill: {
              name: siteContactPerson || companyName || 'Site Manager',
              contact: contactPhone,
              email: 'procurement@eparrys.com'
            },
            notes: {
              address: deliveryAddress,
              pincode: pincode,
              gstin: gstin
            },
            theme: {
              color: '#02042B'
            },
            modal: {
              ondismiss: function () {
                setIsProcessingPayment(false);
              }
            }
          };

          const rzp = new window.Razorpay(options);
          rzp.on('payment.failed', function (response: any) {
            alert(`Payment Failed: ${response.error.description}`);
            setIsProcessingPayment(false);
          });
          rzp.open();
          return;
        } catch {
          // If SDK launch fails (e.g., test environment without live credentials), fallback to simulated Razorpay gateway
          setRazorpaySimModalOpen(true);
        }
      } else {
        // Razorpay SDK fallback simulation modal
        setRazorpaySimModalOpen(true);
      }
    } else {
      // Direct Bank Transfer (NEFT) or PO
      setTimeout(() => {
        finalizeOrderPlacement(`B2B-${paymentMethod.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`, paymentMethod);
      }, 600);
    }
  };

  return (
    <div className="bg-parrys-cream min-h-screen py-8 md:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Step Indicator Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-parrys-surface-dim/70 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-parrys-terracotta uppercase tracking-wider mb-1">
                <FiPackage className="h-4 w-4" />
                <span>B2B Material Procurement Portal</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-parrys-charcoal font-serif">
                Sourcing & Checkout Process
              </h1>
              <p className="text-xs md:text-sm text-parrys-muted mt-1">
                3-Step Procurement: Review line items, configure site delivery & GSTIN, and pay via Razorpay.
              </p>
            </div>

            {/* Quick Action Pill */}
            {cartItems.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="flex items-center gap-2 bg-white border border-parrys-surface-dim hover:border-parrys-terracotta text-parrys-charcoal hover:text-parrys-terracotta px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <FiPrinter className="h-4 w-4 text-parrys-terracotta" />
                  <span>Preview Quotation PDF</span>
                </button>
                <button
                  onClick={clearCart}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 font-semibold px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <FiTrash2 className="h-3.5 w-3.5" />
                  <span>Clear Cart</span>
                </button>
              </div>
            )}
          </div>

          {/* Interactive Workflow Progress Steps Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-6">
            {/* Step 1: Materials & Tonnage */}
            <button
              type="button"
              onClick={() => cartItems.length > 0 && setCurrentStep(1)}
              className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left cursor-pointer ${
                currentStep === 1
                  ? 'bg-white border-2 border-parrys-terracotta shadow-md'
                  : currentStep > 1
                  ? 'bg-emerald-50/80 border border-emerald-300 hover:border-emerald-500'
                  : 'bg-white/70 border border-parrys-surface-dim opacity-70'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  currentStep === 1
                    ? 'bg-parrys-terracotta text-white shadow-xs'
                    : currentStep > 1
                    ? 'bg-emerald-600 text-white'
                    : 'bg-parrys-surface-dim text-parrys-muted'
                }`}
              >
                {currentStep > 1 ? <FiCheck className="h-4 w-4" /> : '1'}
              </div>
              <div>
                <div className="text-xs font-bold text-parrys-charcoal">Materials & Tonnage</div>
                <div className="text-[10px] text-parrys-muted">Review line items & tiers</div>
              </div>
            </button>

            {/* Step 2: Logistics & GST */}
            <button
              type="button"
              onClick={() => cartItems.length > 0 && setCurrentStep(2)}
              className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left cursor-pointer ${
                currentStep === 2
                  ? 'bg-white border-2 border-parrys-terracotta shadow-md'
                  : currentStep > 2
                  ? 'bg-emerald-50/80 border border-emerald-300 hover:border-emerald-500'
                  : 'bg-white/70 border border-parrys-surface-dim opacity-80'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  currentStep === 2
                    ? 'bg-parrys-terracotta text-white shadow-xs'
                    : currentStep > 2
                    ? 'bg-emerald-600 text-white'
                    : 'bg-parrys-surface-dim text-parrys-muted'
                }`}
              >
                {currentStep > 2 ? <FiCheck className="h-4 w-4" /> : '2'}
              </div>
              <div>
                <div className="text-xs font-bold text-parrys-charcoal">Logistics & GST</div>
                <div className="text-[10px] text-parrys-muted">Site address & GSTIN inputs</div>
              </div>
            </button>

            {/* Step 3: Razorpay Checkout */}
            <button
              type="button"
              onClick={() => cartItems.length > 0 && setCurrentStep(3)}
              className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left cursor-pointer ${
                currentStep === 3
                  ? 'bg-white border-2 border-parrys-terracotta shadow-md'
                  : 'bg-white/70 border border-parrys-surface-dim opacity-80'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  currentStep === 3
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-parrys-surface-dim text-parrys-muted'
                }`}
              >
                3
              </div>
              <div>
                <div className="text-xs font-bold text-parrys-charcoal">Razorpay Checkout</div>
                <div className="text-[10px] text-parrys-muted">UPI / Card / Bank Payment</div>
              </div>
            </button>
          </div>
        </div>

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <div className="space-y-12">
            <div className="bg-white rounded-2xl border border-parrys-surface-dim/80 p-10 md:p-16 text-center shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-parrys-cream/50 rounded-full blur-3xl pointer-events-none" />
              <div className="w-24 h-24 rounded-full bg-parrys-cream border border-parrys-surface-dim flex items-center justify-center text-parrys-terracotta mx-auto mb-6 shadow-inner">
                <FiShoppingCart className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold text-parrys-charcoal font-serif mb-3">
                Your Procurement Cart is Empty
              </h2>
              <p className="text-sm text-parrys-muted max-w-lg mx-auto mb-8 leading-relaxed">
                You haven't selected any construction materials yet. Explore our verified factory catalogue to build bulk order proposals with volume tier discounts and Razorpay checkout options.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-parrys-terracotta text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-parrys-terracotta-dark transition-all shadow-lg shadow-parrys-terracotta/20"
                >
                  <span>Explore Product Catalogue</span>
                  <FiArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/brands"
                  className="inline-flex items-center gap-2 bg-white border border-parrys-surface-dim text-parrys-charcoal hover:border-parrys-terracotta px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>Browse Top Brands</span>
                </Link>
              </div>
            </div>

            {/* Quick Add Recommendations */}
            {recommendedProducts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-parrys-charcoal font-serif flex items-center gap-2">
                    <FiTag className="text-parrys-terracotta" />
                    <span>Popular Construction Essentials</span>
                  </h3>
                  <Link to="/products" className="text-xs font-bold text-parrys-terracotta hover:underline">
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendedProducts.map((prd) => {
                    const unit = prd.unitMeasure || 'units';
                    const minQty = prd.minOrderQty || 10;
                    return (
                      <div
                        key={prd.id}
                        className="bg-white rounded-xl border border-parrys-surface-dim p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-[10px] font-bold font-mono uppercase bg-parrys-cream text-parrys-muted px-2 py-0.5 rounded border border-parrys-surface-dim/40">
                              {prd.vendorName}
                            </span>
                            {prd.specGrade && (
                              <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                                {prd.specGrade}
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-parrys-charcoal font-serif text-base leading-snug">
                            {prd.productName}
                          </h4>
                          <p className="text-xs text-parrys-muted font-mono">
                            ₹{prd.amount.toLocaleString('en-IN')} / {unit}
                          </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-parrys-surface-dim/50 flex items-center justify-between">
                          <span className="text-[11px] text-parrys-muted font-mono">
                            Min: {minQty} {unit}s
                          </span>
                          <button
                            onClick={() => addToCart(prd, minQty)}
                            className="bg-parrys-charcoal hover:bg-parrys-terracotta text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <FiPlus className="h-3.5 w-3.5" />
                            <span>Quick Add</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Main Interactive 3-Step Wizard Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Current Step Content (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* STEP 1 VIEW: Materials & Tonnage */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Summary Pill Bar */}
                  <div className="bg-white rounded-xl border border-parrys-surface-dim p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-parrys-charcoal font-semibold">
                        <FiBox className="text-parrys-terracotta" />
                        <span>
                          Total Items: <strong className="font-mono text-base">{cartItems.length}</strong>
                        </span>
                      </div>
                      <div className="h-4 w-px bg-parrys-surface-dim" />
                      <div className="flex items-center gap-2 text-parrys-charcoal font-semibold">
                        <FiTruck className="text-amber-600" />
                        <span>
                          Est. Freight Tonnage:{' '}
                          <strong className="font-mono text-base text-parrys-terracotta">
                            {calculateTotalWeightInTonnes()} MT
                          </strong>
                        </span>
                      </div>
                    </div>

                    {totalTierSavings > 0 && (
                      <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full border border-emerald-200">
                        <FiPercent className="h-3.5 w-3.5" />
                        <span>Bulk Tier Savings: ₹{totalTierSavings.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>

                  {/* Items List */}
                  <div className="space-y-4">
                    {cartItems.map((item) => {
                      const unit = item.product.unitMeasure || (item.product as any).unit || 'units';
                      const minQty = item.product.minOrderQty || (item.product as any).minQty || 1;
                      const { effectivePrice, basePrice, discount } = getEffectiveUnitPrice(
                        item.product,
                        item.quantity
                      );

                      const itemTotalKg =
                        ((item.product as any).weightPerUnit || (unit === 'tonnes' ? 1000 : 50)) *
                        item.quantity;
                      const itemTotalTonnes = (itemTotalKg / 1000).toFixed(2);

                      return (
                        <div
                          key={item.product.id}
                          className="bg-white rounded-2xl border border-parrys-surface-dim p-5 md:p-6 shadow-xs hover:border-parrys-surface-dim transition-all space-y-4"
                        >
                          {/* Top Meta Line: Vendor, Category, SKU & Stock */}
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-parrys-surface-dim/40 pb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-parrys-charcoal bg-parrys-cream px-2.5 py-1 rounded-md border border-parrys-surface-dim/60 font-mono flex items-center gap-1">
                                <FiShield className="text-emerald-600 h-3 w-3" />
                                {item.product.vendorName}
                              </span>
                              <span className="text-xs text-parrys-muted font-mono">
                                Category: {item.product.category || 'Construction Materials'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                In Stock - Factory Ready
                              </span>
                            </div>
                          </div>

                          {/* Main Product Info & Controls */}
                          <div className="flex flex-col sm:flex-row gap-5 items-start justify-between">
                            {/* Icon & Title */}
                            <div className="flex gap-4 items-start flex-1">
                              <div className="w-14 h-14 rounded-xl bg-parrys-cream border border-parrys-surface-dim flex items-center justify-center text-parrys-terracotta shrink-0 shadow-xs">
                                <FiLayers className="h-7 w-7" />
                              </div>
                              <div className="space-y-1">
                                <h3 className="text-lg font-bold text-parrys-charcoal font-serif leading-tight">
                                  {item.product.productName}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 text-xs text-parrys-muted">
                                  {item.product.specGrade && (
                                    <span className="font-mono bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-bold text-[11px]">
                                      {item.product.specGrade}
                                    </span>
                                  )}
                                  <span className="font-mono text-[11px]">SKU: {item.product.sku}</span>
                                  {item.product.warehouse && (
                                    <span className="font-mono text-[11px] text-slate-500">
                                      • Ships from: {item.product.warehouse}
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs font-mono text-parrys-muted pt-1">
                                  Base Rate: ₹{basePrice.toLocaleString('en-IN')} / {unit}
                                </div>
                              </div>
                            </div>

                            {/* Price & Subtotal Column */}
                            <div className="text-right sm:self-start shrink-0">
                              <div className="text-xs text-parrys-muted font-mono">Line Item Total</div>
                              <div className="text-xl font-black text-parrys-terracotta font-mono">
                                ₹{(effectivePrice * item.quantity).toLocaleString('en-IN')}
                              </div>
                              {discount > 0 ? (
                                <div className="text-[10px] font-bold text-emerald-600 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-1">
                                  Tier Price: ₹{effectivePrice}/unit (Save ₹{(discount * item.quantity).toLocaleString('en-IN')})
                                </div>
                              ) : (
                                <div className="text-[10px] text-parrys-muted font-mono">Excl. Freight & Tax</div>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls & Quick Multipliers */}
                          <div className="bg-parrys-cream/70 border border-parrys-surface-dim/60 rounded-xl p-3 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-parrys-charcoal">Quantity:</span>
                              <div className="flex items-center rounded-lg border border-parrys-surface-dim bg-white shadow-xs p-1">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="p-2 text-slate-600 hover:text-parrys-terracotta disabled:opacity-30 transition-colors cursor-pointer"
                                  disabled={item.quantity <= minQty}
                                >
                                  <FiMinus className="h-3.5 w-3.5" />
                                </button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(
                                      item.product.id,
                                      Math.max(minQty, parseInt(e.target.value) || minQty)
                                    )
                                  }
                                  className="w-16 text-center bg-transparent border-0 text-sm font-extrabold font-mono focus:ring-0 p-0 text-parrys-charcoal"
                                />
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="p-2 text-slate-600 hover:text-parrys-terracotta transition-colors cursor-pointer"
                                >
                                  <FiPlus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <span className="text-xs font-mono font-bold text-parrys-muted">
                                {unit}s
                              </span>

                              {/* Quick Step Buttons */}
                              <div className="hidden sm:flex items-center gap-1.5">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 10)}
                                  className="text-[10px] font-mono font-bold bg-white border border-parrys-surface-dim hover:border-parrys-terracotta text-parrys-muted hover:text-parrys-terracotta px-2 py-1 rounded transition-colors cursor-pointer"
                                >
                                  +10
                                </button>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 50)}
                                  className="text-[10px] font-mono font-bold bg-white border border-parrys-surface-dim hover:border-parrys-terracotta text-parrys-muted hover:text-parrys-terracotta px-2 py-1 rounded transition-colors cursor-pointer"
                                >
                                  +50
                                </button>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 100)}
                                  className="text-[10px] font-mono font-bold bg-white border border-parrys-surface-dim hover:border-parrys-terracotta text-parrys-muted hover:text-parrys-terracotta px-2 py-1 rounded transition-colors cursor-pointer"
                                >
                                  +100
                                </button>
                              </div>
                            </div>

                            {/* Weight info & Remove Button */}
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-parrys-muted font-mono">
                                Est. Weight: <strong className="text-parrys-charcoal">{itemTotalTonnes} MT</strong> ({itemTotalKg.toLocaleString('en-IN')} kg)
                              </span>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-slate-400 hover:text-rose-600 transition-colors p-2 rounded-lg hover:bg-rose-50 cursor-pointer"
                                title="Remove line item"
                              >
                                <FiTrash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2 VIEW: Logistics & GST */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-2xl border border-parrys-surface-dim p-6 md:p-8 space-y-6 shadow-xs"
                >
                  <div className="flex items-center gap-3 border-b border-parrys-surface-dim pb-4">
                    <div className="w-10 h-10 rounded-xl bg-parrys-terracotta/10 text-parrys-terracotta flex items-center justify-center font-bold">
                      <FiTruck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-parrys-charcoal font-serif text-lg">
                        Site Delivery & Business GST Setup (Step 2 of 3)
                      </h3>
                      <p className="text-xs text-parrys-muted">
                        Configure destination site address, manager contact, GSTIN for 18% tax credit, and unloading method.
                      </p>
                    </div>
                  </div>

                  {/* Pincode & Delivery Address */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-parrys-charcoal flex items-center gap-1.5">
                        <FiMapPin className="text-parrys-terracotta" />
                        <span>Destination Site Pincode</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          placeholder="e.g. 600001"
                          className="flex-1 px-3.5 py-2.5 rounded-xl border border-parrys-surface-dim text-sm font-mono focus:border-parrys-terracotta outline-none"
                        />
                        <button
                          onClick={() => setPincodeChecked(true)}
                          className="bg-parrys-charcoal hover:bg-parrys-terracotta text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          Check
                        </button>
                      </div>
                      {pincodeChecked && (
                        <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                          <FiCheckCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>Express 24-48 hr Heavy Freight Available for PIN {pincode}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-parrys-charcoal flex items-center gap-1.5">
                        <FiHome className="text-parrys-terracotta" />
                        <span>Detailed Site Delivery Address</span>
                      </label>
                      <textarea
                        rows={2}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Full construction site address with landmark..."
                        className="w-full px-3.5 py-2 rounded-xl border border-parrys-surface-dim text-xs font-sans focus:border-parrys-terracotta outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Site Contact Person & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-parrys-charcoal flex items-center gap-1.5">
                        <FiUser className="text-parrys-terracotta" />
                        <span>Site Manager / Contact Person</span>
                      </label>
                      <input
                        type="text"
                        value={siteContactPerson}
                        onChange={(e) => setSiteContactPerson(e.target.value)}
                        placeholder="e.g. Rajesh Kumar (Site Engineer)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-parrys-surface-dim text-xs font-sans focus:border-parrys-terracotta outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-parrys-charcoal flex items-center gap-1.5">
                        <FiPhone className="text-parrys-terracotta" />
                        <span>On-Site Contact Phone Number</span>
                      </label>
                      <input
                        type="text"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+91 98401 23456"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-parrys-surface-dim text-xs font-mono focus:border-parrys-terracotta outline-none"
                      />
                    </div>
                  </div>

                  {/* Business GSTIN & Company Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 border-t border-parrys-surface-dim/40">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-parrys-charcoal flex items-center gap-1.5">
                        <FiBriefcase className="text-parrys-terracotta" />
                        <span>GSTIN for 18% Input Tax Credit (ITC)</span>
                      </label>
                      <input
                        type="text"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value.toUpperCase())}
                        placeholder="33AAAAA0000A1Z5"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-parrys-surface-dim text-sm font-mono uppercase focus:border-parrys-terracotta outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-parrys-charcoal flex items-center gap-1.5">
                        <FiBriefcase className="text-parrys-terracotta" />
                        <span>Registered Contracting Company Name</span>
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Company Name (e.g. Apex Infrastructure)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-parrys-surface-dim text-xs font-sans focus:border-parrys-terracotta outline-none"
                      />
                    </div>
                  </div>

                  {/* Unloading Preference Selector */}
                  <div className="space-y-3 pt-3 border-t border-parrys-surface-dim/40">
                    <label className="text-xs font-bold text-parrys-charcoal flex items-center gap-1.5">
                      <FiPackage className="text-parrys-terracotta" />
                      <span>On-Site Material Unloading Requirement</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setUnloadingPref('flatbed')}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          unloadingPref === 'flatbed'
                            ? 'border-parrys-terracotta bg-amber-50/50 shadow-xs'
                            : 'border-parrys-surface-dim hover:border-parrys-surface-dim/80 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-parrys-charcoal">Flatbed Truck Drop</span>
                          {unloadingPref === 'flatbed' && (
                            <FiCheck className="text-parrys-terracotta h-4 w-4" />
                          )}
                        </div>
                        <div className="text-[11px] text-parrys-muted">Standard - Client unloads site</div>
                        <div className="text-xs font-bold text-emerald-700 font-mono mt-1">FREE</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setUnloadingPref('crane')}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          unloadingPref === 'crane'
                            ? 'border-parrys-terracotta bg-amber-50/50 shadow-xs'
                            : 'border-parrys-surface-dim hover:border-parrys-surface-dim/80 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-parrys-charcoal">Hydraulic Crane</span>
                          {unloadingPref === 'crane' && (
                            <FiCheck className="text-parrys-terracotta h-4 w-4" />
                          )}
                        </div>
                        <div className="text-[11px] text-parrys-muted">Heavy rebar & tile pallets</div>
                        <div className="text-xs font-bold text-parrys-terracotta font-mono mt-1">+ ₹1,200</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setUnloadingPref('labor')}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          unloadingPref === 'labor'
                            ? 'border-parrys-terracotta bg-amber-50/50 shadow-xs'
                            : 'border-parrys-surface-dim hover:border-parrys-surface-dim/80 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-parrys-charcoal">Site Labor Crew</span>
                          {unloadingPref === 'labor' && (
                            <FiCheck className="text-parrys-terracotta h-4 w-4" />
                          )}
                        </div>
                        <div className="text-[11px] text-parrys-muted">Unloading crew provided</div>
                        <div className="text-xs font-bold text-parrys-terracotta font-mono mt-1">+ ₹800</div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 VIEW: Razorpay Checkout */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-2xl border border-parrys-surface-dim p-6 md:p-8 space-y-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-parrys-surface-dim pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold font-mono text-sm shadow-xs">
                        RZP
                      </div>
                      <div>
                        <h3 className="font-bold text-parrys-charcoal font-serif text-lg">
                          Razorpay Payment Gateway (Step 3 of 3)
                        </h3>
                        <p className="text-xs text-parrys-muted">
                          Confirm line items & complete secure transaction via Razorpay SDK.
                        </p>
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1 font-mono">
                      <FiLock /> 256-bit SSL Encrypted
                    </span>
                  </div>

                  {/* Delivery & Site Summary Review */}
                  <div className="bg-parrys-cream/80 p-4 rounded-xl border border-parrys-surface-dim/70 space-y-2 text-xs">
                    <div className="font-bold text-parrys-charcoal flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <FiMapPin className="text-parrys-terracotta" />
                        <span>Destination Delivery Address</span>
                      </span>
                      <span className="text-emerald-700 font-mono text-[11px] font-extrabold">
                        PIN: {pincode}
                      </span>
                    </div>
                    <div className="text-parrys-muted font-sans pl-5">{deliveryAddress}</div>
                    <div className="flex flex-wrap gap-4 text-slate-600 pl-5 pt-1 text-[11px] font-mono">
                      <span>Manager: <strong>{siteContactPerson}</strong></span>
                      <span>Phone: <strong>{contactPhone}</strong></span>
                      {gstin && <span>GSTIN: <strong>{gstin}</strong></span>}
                    </div>
                  </div>

                  {/* Order Items Snapshot */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-parrys-charcoal flex justify-between">
                      <span>Order Items ({cartItems.length})</span>
                      <span className="font-mono text-parrys-terracotta">Est. Weight: {calculateTotalWeightInTonnes()} MT</span>
                    </div>
                    <div className="max-h-40 overflow-y-auto space-y-2 border border-parrys-surface-dim/60 rounded-xl p-3 bg-slate-50/50">
                      {cartItems.map((item) => {
                        const { effectivePrice } = getEffectiveUnitPrice(item.product, item.quantity);
                        return (
                          <div key={item.product.id} className="flex justify-between items-center text-xs">
                            <div>
                              <div className="font-bold text-parrys-charcoal">{item.product.productName}</div>
                              <div className="text-[10px] text-parrys-muted font-mono">
                                Qty: {item.quantity} {item.product.unitMeasure || 'units'} × ₹{effectivePrice}
                              </div>
                            </div>
                            <div className="font-mono font-bold text-parrys-charcoal">
                              ₹{(effectivePrice * item.quantity).toLocaleString('en-IN')}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-parrys-charcoal flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <FiCreditCard className="text-parrys-terracotta" />
                        <span>Select Preferred Payment Option</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        Test Mode Active
                      </span>
                    </label>

                    {/* Option 1: Razorpay (Featured) */}
                    <div
                      onClick={() => setPaymentMethod('razorpay')}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                        paymentMethod === 'razorpay'
                          ? 'border-blue-600 bg-slate-950 text-white shadow-md'
                          : 'border-parrys-surface-dim bg-white text-parrys-charcoal hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs font-mono shadow-xs">
                            RZP
                          </div>
                          <div>
                            <div className="text-sm font-bold flex items-center gap-2 font-serif">
                              <span>Razorpay Payment Gateway</span>
                              <span className="text-[9px] bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded font-mono font-bold">
                                RECOMMENDED
                              </span>
                            </div>
                            <div className={`text-xs ${paymentMethod === 'razorpay' ? 'text-slate-300' : 'text-parrys-muted'}`}>
                              Instant factory confirmation via UPI, Cards, NetBanking, and EMI.
                            </div>
                          </div>
                        </div>
                        {paymentMethod === 'razorpay' && <FiCheckCircle className="h-5 w-5 text-blue-400" />}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800 text-[10px] font-mono">
                        <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded flex items-center gap-1">
                          <FiSmartphone /> UPI (GPay/PhonePe/Paytm)
                        </span>
                        <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded flex items-center gap-1">
                          <FiCreditCard /> Visa / MasterCard / RuPay
                        </span>
                        <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded">NetBanking (HDFC/ICICI/SBI)</span>
                      </div>
                    </div>

                    {/* Option 2: NEFT / RTGS Wire Transfer */}
                    <div
                      onClick={() => setPaymentMethod('neft')}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        paymentMethod === 'neft'
                          ? 'border-parrys-terracotta bg-amber-50/70 text-parrys-charcoal shadow-xs'
                          : 'border-parrys-surface-dim bg-white text-parrys-charcoal hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold font-serif">B2B Direct Bank Transfer (NEFT / RTGS)</div>
                          <div className="text-[11px] text-parrys-muted mt-0.5">
                            Receive instant proforma invoice for corporate net banking transfer.
                          </div>
                        </div>
                        {paymentMethod === 'neft' && <FiCheck className="h-5 w-5 text-parrys-terracotta" />}
                      </div>
                    </div>

                    {/* Option 3: Purchase Order / Pay on Dispatch */}
                    <div
                      onClick={() => setPaymentMethod('po')}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        paymentMethod === 'po'
                          ? 'border-parrys-terracotta bg-amber-50/70 text-parrys-charcoal shadow-xs'
                          : 'border-parrys-surface-dim bg-white text-parrys-charcoal hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold font-serif">Purchase Order (PO) / Pay on Dispatch</div>
                          <div className="text-[11px] text-parrys-muted mt-0.5">
                            Submit company PO for credit terms verification and factory dispatch schedule.
                          </div>
                        </div>
                        {paymentMethod === 'po' && <FiCheck className="h-5 w-5 text-parrys-terracotta" />}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column: Sticky Executive Proposal Summary & Navigation (4 cols) */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="bg-white rounded-2xl border border-parrys-surface-dim p-6 shadow-md space-y-6">
                <div>
                  <h2 className="text-base font-bold text-parrys-charcoal font-serif uppercase tracking-wider">
                    Executive Proposal Summary
                  </h2>
                  <p className="text-[11px] text-parrys-muted font-mono mt-0.5">
                    Step {currentStep} of 3 • Proposal Calculation
                  </p>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center text-parrys-muted">
                    <span>Base Materials Price</span>
                    <span className="font-mono text-parrys-charcoal font-bold">
                      ₹{baseSubtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {totalTierSavings > 0 && (
                    <div className="flex justify-between items-center text-emerald-700 font-bold">
                      <span className="flex items-center gap-1">
                        <FiTag /> Bulk Tier Discount
                      </span>
                      <span className="font-mono">- ₹{totalTierSavings.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-parrys-muted">
                    <span>Subtotal (Excl. Tax)</span>
                    <span className="font-mono text-parrys-charcoal font-semibold">
                      ₹{discountedSubtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-parrys-muted">
                    <span className="flex items-center gap-1">
                      <span>Estimated GST (18%)</span>
                      <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded font-bold">ITC</span>
                    </span>
                    <span className="font-mono text-parrys-charcoal font-semibold">
                      ₹{estimatedGst.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-parrys-muted">
                    <span>Estimated Freight Fee</span>
                    <span className="font-mono text-parrys-charcoal font-semibold">
                      {isFreeFreight ? (
                        <span className="text-emerald-700 font-bold uppercase text-[11px]">Free Shipping</span>
                      ) : (
                        `₹${freightFee.toLocaleString('en-IN')}`
                      )}
                    </span>
                  </div>

                  {unloadingFee > 0 && (
                    <div className="flex justify-between items-center text-parrys-muted">
                      <span>Unloading Service</span>
                      <span className="font-mono text-parrys-charcoal font-semibold">
                        ₹{unloadingFee.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="h-px bg-parrys-surface-dim/70 my-2" />

                  <div className="flex justify-between items-baseline pt-1">
                    <div>
                      <div className="text-sm font-bold text-parrys-charcoal font-serif">
                        Est. Net Proposal Total
                      </div>
                      <div className="text-[10px] text-parrys-muted font-mono">Incl. All Taxes & Freight</div>
                    </div>
                    <div className="text-2xl font-black text-parrys-terracotta font-mono">
                      ₹{totalProposalAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Free Freight Progress Indicator */}
                {!isFreeFreight && (
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold text-amber-900">
                      <span>Free Logistics Threshold</span>
                      <span>₹{(50000 - discountedSubtotal).toLocaleString('en-IN')} away</span>
                    </div>
                    <div className="w-full bg-amber-200/60 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (discountedSubtotal / 50000) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Wizard Dynamic Navigation Action Buttons */}
                <div className="space-y-3 pt-2">
                  {currentStep === 1 && (
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="w-full bg-parrys-terracotta text-white py-4 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-parrys-terracotta-dark transition-all shadow-lg shadow-parrys-terracotta/25 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Proceed to Logistics & GST (Step 2)</span>
                      <FiArrowRight className="h-4 w-4" />
                    </button>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-2">
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="w-full bg-parrys-terracotta text-white py-4 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-parrys-terracotta-dark transition-all shadow-lg shadow-parrys-terracotta/25 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Proceed to Razorpay Checkout (Step 3)</span>
                        <FiArrowRight className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="w-full bg-white border border-parrys-surface-dim hover:bg-parrys-cream text-parrys-charcoal py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FiArrowLeft className="h-3.5 w-3.5" />
                        <span>Back to Materials</span>
                      </button>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-2">
                      <button
                        onClick={handleInitiateRazorpayPayment}
                        disabled={isProcessingPayment}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isProcessingPayment ? (
                          <>
                            <FiRefreshCw className="h-4 w-4 animate-spin" />
                            <span>Opening Razorpay Gateway...</span>
                          </>
                        ) : (
                          <>
                            <FiLock className="h-4 w-4" />
                            <span>
                              {paymentMethod === 'razorpay'
                                ? `Pay ₹${totalProposalAmount.toLocaleString('en-IN')} via Razorpay`
                                : `Confirm Order (₹${totalProposalAmount.toLocaleString('en-IN')})`}
                            </span>
                            <FiArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="w-full bg-white border border-parrys-surface-dim hover:bg-parrys-cream text-parrys-charcoal py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FiArrowLeft className="h-3.5 w-3.5" />
                        <span>Back to Logistics & GST</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Guarantee Badges */}
                <div className="space-y-2 pt-2 border-t border-parrys-surface-dim/50 text-[11px] text-parrys-muted">
                  <div className="flex items-center gap-2">
                    <FiShield className="text-emerald-600 h-4 w-4 shrink-0" />
                    <span>Direct Factory Tax Invoice & BIS Certificates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-parrys-terracotta h-4 w-4 shrink-0" />
                    <span>24-48 Hour Dedicated Dispatch Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiFileText className="text-slate-600 h-4 w-4 shrink-0" />
                    <span>Razorpay SSL 256-bit encrypted checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Razorpay Interactive Payment Gateway Simulation Modal */}
      <AnimatePresence>
        {razorpaySimModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setRazorpaySimModalOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl relative z-10 font-sans border border-slate-200"
            >
              {/* Razorpay Top Header Bar */}
              <div className="bg-[#02042B] text-white p-5 space-y-3 relative">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-black text-xs font-mono">
                      RZP
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-tight text-white font-serif">E-Parrys Direct Sourcing</h4>
                      <p className="text-[10px] text-blue-300 font-mono">Razorpay Secure Checkout Test Mode</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setRazorpaySimModalOpen(false);
                      setIsProcessingPayment(false);
                    }}
                    className="text-slate-400 hover:text-white text-sm cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">Total Amount</span>
                  <span className="text-lg font-black text-emerald-400 font-mono">
                    ₹{totalProposalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Razorpay Gateway Interactive Payment Methods */}
              <div className="p-6 space-y-5">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                    Payment Options (Test Environment)
                  </span>

                  {/* UPI Option */}
                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span className="flex items-center gap-2">
                        <FiSmartphone className="text-blue-600" />
                        <span>UPI Payment (Instant)</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-mono">GPay / PhonePe / Paytm</span>
                    </div>
                    <input
                      type="text"
                      value={simUpiId}
                      onChange={(e) => setSimUpiId(e.target.value)}
                      placeholder="username@upi"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:border-blue-600 outline-none bg-white"
                    />
                  </div>

                  {/* Card Option */}
                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span className="flex items-center gap-2">
                        <FiCreditCard className="text-blue-600" />
                        <span>Credit / Debit Card</span>
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">Visa / MasterCard</span>
                    </div>
                    <input
                      type="text"
                      value={simCardNo}
                      onChange={(e) => setSimCardNo(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:border-blue-600 outline-none bg-white"
                    />
                  </div>

                  {/* NetBanking Bank */}
                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span className="flex items-center gap-2">
                        <FiBriefcase className="text-blue-600" />
                        <span>NetBanking Bank Account</span>
                      </span>
                    </div>
                    <select
                      value={simBank}
                      onChange={(e) => setSimBank(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-sans focus:border-blue-600 outline-none bg-white"
                    >
                      <option value="HDFC Bank">HDFC Bank Corporate</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="State Bank of India">State Bank of India (SBI)</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 bg-blue-50 border border-blue-200 p-2.5 rounded-lg flex items-center gap-2">
                  <FiInfo className="text-blue-600 h-4 w-4 shrink-0" />
                  <span>Razorpay Test Key: <code className="font-mono font-bold">rzp_test_eparrys_2026</code></span>
                </div>

                {/* Simulate Payment Button */}
                <button
                  onClick={() => finalizeOrderPlacement(`pay_Rzp_${Math.floor(100000 + Math.random() * 900000)}`, 'Razorpay Simulated Gateway')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiCheckCircle className="h-4 w-4" />
                  <span>Simulate Payment Success (₹{totalProposalAmount.toLocaleString('en-IN')})</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quotation PDF Preview Modal */}
      <AnimatePresence>
        {quoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuoteModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-parrys-surface-dim p-6 md:p-8 max-w-2xl w-full shadow-2xl relative z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start border-b border-parrys-surface-dim pb-4">
                <div>
                  <span className="text-[10px] font-bold text-parrys-terracotta font-mono uppercase tracking-widest">
                    E-PARRYS FORMAL QUOTATION PROPOSAL
                  </span>
                  <h3 className="text-xl font-bold font-serif text-parrys-charcoal">
                    Material Procurement Quote Summary
                  </h3>
                </div>
                <button
                  onClick={() => setQuoteModalOpen(false)}
                  className="text-slate-400 hover:text-parrys-charcoal p-1 text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* PDF Document Simulation Header */}
              <div className="bg-parrys-cream/80 p-5 rounded-xl border border-parrys-surface-dim/60 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-parrys-charcoal font-serif">E-Parrys Construction Materials Ltd.</h4>
                    <p className="text-parrys-muted text-[11px]">Direct Factory Wholesale Division</p>
                  </div>
                  <div className="text-right font-mono text-[11px]">
                    <div>Date: {new Date().toLocaleDateString('en-IN')}</div>
                    <div>Quote Ref: EP-EST-{Math.floor(1000 + Math.random() * 9000)}</div>
                  </div>
                </div>

                {companyName && (
                  <div className="pt-2 border-t border-parrys-surface-dim/40">
                    <span className="font-bold text-parrys-charcoal">Prepared For:</span> {companyName}{' '}
                    {gstin && <span className="font-mono text-parrys-muted">({gstin})</span>}
                  </div>
                )}
              </div>

              {/* Items Table */}
              <div className="border border-parrys-surface-dim/70 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-parrys-surface-dim text-parrys-muted font-mono font-bold text-[11px]">
                      <th className="p-3">Material</th>
                      <th className="p-3">Vendor</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-right">Rate</th>
                      <th className="p-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-parrys-surface-dim/50 font-mono">
                    {cartItems.map((item) => {
                      const { effectivePrice } = getEffectiveUnitPrice(item.product, item.quantity);
                      return (
                        <tr key={item.product.id}>
                          <td className="p-3 font-sans font-semibold text-parrys-charcoal">
                            {item.product.productName}
                          </td>
                          <td className="p-3 text-parrys-muted text-[11px]">{item.product.vendorName}</td>
                          <td className="p-3 text-center font-bold">{item.quantity}</td>
                          <td className="p-3 text-right">₹{effectivePrice.toLocaleString('en-IN')}</td>
                          <td className="p-3 text-right font-bold text-parrys-charcoal">
                            ₹{(effectivePrice * item.quantity).toLocaleString('en-IN')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Total Calculation Line */}
              <div className="bg-slate-50 p-4 rounded-xl space-y-1.5 text-xs text-right font-mono">
                <div>Discounted Subtotal: ₹{discountedSubtotal.toLocaleString('en-IN')}</div>
                <div>GST (18% Input Credit): ₹{estimatedGst.toLocaleString('en-IN')}</div>
                <div>Freight & Unloading: ₹{(freightFee + unloadingFee).toLocaleString('en-IN')}</div>
                <div className="text-base font-extrabold text-parrys-terracotta pt-1 border-t border-slate-200">
                  Estimated Total: ₹{totalProposalAmount.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="flex-1 bg-parrys-charcoal hover:bg-parrys-terracotta text-white py-3 rounded-xl text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiDownload className="h-4 w-4" />
                  <span>Download / Print Quote</span>
                </button>
                <button
                  onClick={() => setQuoteModalOpen(false)}
                  className="px-5 border border-parrys-surface-dim hover:bg-parrys-cream text-parrys-charcoal rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Order Success Modal (With Razorpay Payment ID) */}
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
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-inner">
                <FiCheckCircle className="h-8 w-8" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold text-parrys-terracotta uppercase tracking-widest font-mono">
                  Order Confirmed & Payment Verified
                </span>
                <h3 className="text-xl font-bold font-serif text-parrys-charcoal">
                  Direct Factory Dispatch Initialized!
                </h3>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs text-parrys-muted font-mono font-bold bg-parrys-cream px-3 py-1 rounded-md border border-parrys-surface-dim/40 inline-block">
                    Order Ref: {orderRef}
                  </span>
                  {razorpayPaymentId && (
                    <span className="text-[11px] text-blue-700 font-mono bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Razorpay Payment ID: <strong>{razorpayPaymentId}</strong>
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-parrys-cream border border-parrys-surface-dim/50 rounded-xl p-4 text-xs text-parrys-charcoal leading-relaxed text-left space-y-2.5">
                <p className="font-bold flex items-center gap-1.5 text-parrys-terracotta">
                  <FiClock className="shrink-0" />
                  <span>Dispatch & Fulfillment Timeline</span>
                </p>
                <div className="space-y-1.5 text-[11px] text-parrys-muted">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[9px]">
                      ✓
                    </span>
                    <span>Payment captured via Razorpay Secure Gateway</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[9px]">
                      ✓
                    </span>
                    <span>Factory Gate Pass & Freight Truck Assigned</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[9px]">
                      •
                    </span>
                    <span>Site Manager will receive call prior to dispatch</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSuccessModalOpen(false);
                  navigate('/');
                }}
                className="w-full bg-parrys-charcoal text-white hover:bg-parrys-terracotta py-3.5 rounded-xl text-xs font-bold uppercase transition-colors shadow-xs cursor-pointer"
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

export default Cart;
