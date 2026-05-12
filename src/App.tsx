import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import Articles from './pages/Articles';
import ArticleDetails from './pages/ArticleDetails';
import Account from './pages/Account';
import AdminArticles from './pages/admin/AdminArticles';
import AdminArticleForm from './pages/admin/AdminArticleForm';
import AdminAuthors from './pages/admin/AdminAuthors';
import AdminSkinConcerns from './pages/admin/AdminSkinConcerns';
import AdminSkinTypes from './pages/admin/AdminSkinTypes';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/account" element={<Account />} />
        
        {/* Admin Routes */}
        <Route path="/admin/articles" element={<AdminArticles />} />
        <Route path="/admin/article/new" element={<AdminArticleForm />} />
        <Route path="/admin/article/edit/:id" element={<AdminArticleForm />} />
        <Route path="/admin/authors" element={<AdminAuthors />} />
        <Route path="/admin/concerns" element={<AdminSkinConcerns />} />
        <Route path="/admin/skin-types" element={<AdminSkinTypes />} />
      </Routes>
    </Router>
  );
}
