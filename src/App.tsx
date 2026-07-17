import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/footer';

import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Contact } from './pages/Contact';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Cart } from './pages/Cart';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Products />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/carrito" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;