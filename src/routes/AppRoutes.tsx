import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';

// Public Storefront Pages
import { Home } from '../pages/public/Home';
import { Products } from '../pages/public/Products';
import { Categories } from '../pages/public/Categories';
import { ProductDetails } from '../pages/public/ProductDetails';
import { About } from '../pages/public/About';
import { Contact } from '../pages/public/Contact';
import { Brands } from '../pages/public/Brands';
import { Login } from '../pages/public/Login';
import { VendorRegistration } from '../pages/public/VendorRegistration';

// FUTURE PORTALS - PLACEHOLDER IMPORTS (Ready for future implementation)
/*
import { VendorLayout } from '../layouts/VendorLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { Dashboard as VendorDashboard } from '../pages/vendor/Dashboard';
import { Products as VendorProducts } from '../pages/vendor/Products';
import { Inventory as VendorInventory } from '../pages/vendor/Inventory';
import { Orders as VendorOrders } from '../pages/vendor/Orders';
import { Profile as VendorProfile } from '../pages/vendor/Profile';
import { Dashboard as AdminDashboard } from '../pages/admin/Dashboard';
import { Vendors as AdminVendors } from '../pages/admin/Vendors';
import { Products as AdminProducts } from '../pages/admin/Products';
import { Categories as AdminCategories } from '../pages/admin/Categories';
import { Reports as AdminReports } from '../pages/admin/Reports';
*/

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public storefront routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vendor-registration" element={<VendorRegistration />} />
      </Route>

      {/* FUTURE IMPLEMENTATION: Vendor Portal routes */}
      {/* 
      <Route element={<VendorLayout />}>
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/vendor/products" element={<VendorProducts />} />
        <Route path="/vendor/inventory" element={<VendorInventory />} />
        <Route path="/vendor/orders" element={<VendorOrders />} />
        <Route path="/vendor/profile" element={<VendorProfile />} />
      </Route>
      */}

      {/* FUTURE IMPLEMENTATION: Admin Operations routes */}
      {/* 
      <Route 
        element={
          <AdminLayout 
            onReseedData={() => {}} 
            onTriggerError={() => {}} 
            onTriggerLoading={() => {}} 
          />
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/vendors" element={<AdminVendors />} />
        <Route path="/admin/products" element={<AdminProducts viewState="data" setViewState={() => {}} />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/reports" element={<AdminReports />} />
      </Route>
      */}

      {/* Redirect all unmatched back to public home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
