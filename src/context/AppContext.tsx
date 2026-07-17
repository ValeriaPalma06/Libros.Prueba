import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, User, CartItem } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { fetchInitialUsers } from '../services/api';

interface AppContextType {
  products: Product[];
  users: User[];
  currentUser: User | null;
  cart: CartItem[];
  registerUser: (newUser: Omit<User, 'id' | 'failedAttempts' | 'isBlocked'>) => { success: boolean; message: string };
  loginUser: (email: string, pass: string) => { success: boolean; message: string };
  logoutUser: () => void;
  addToCart: (product: Product) => { success: boolean; message: string };
  clearCartAndRestoreStock: () => void;
  checkoutCart: () => { success: boolean; message: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'products';
const PRODUCTS_VERSION_STORAGE_KEY = 'productsVersion';
const PRODUCTS_VERSION = 1;

const readStoredState = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const readStoredProducts = (): Product[] => {
  try {
    const savedVersion = localStorage.getItem(PRODUCTS_VERSION_STORAGE_KEY);
    const versionMatches = savedVersion === PRODUCTS_VERSION.toString();

    if (!versionMatches) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      localStorage.setItem(PRODUCTS_VERSION_STORAGE_KEY, PRODUCTS_VERSION.toString());
      return INITIAL_PRODUCTS;
    }

    const savedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    return savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
};

const persistUsers = (usersToSave: User[]) => {
  localStorage.setItem('users', JSON.stringify(usersToSave));
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => readStoredProducts());

  const [users, setUsers] = useState<User[]>(() => readStoredState('users', []));

  const [currentUser, setCurrentUser] = useState<User | null>(() => readStoredState('currentUser', null));

  const [cart, setCart] = useState<CartItem[]>(() => readStoredState('cart', []));

  // Precargar usuarios de la API externa solo una vez
  useEffect(() => {
    const initApiUsers = async () => {
      const isApiLoaded = localStorage.getItem('api_users_loaded');
      if (!isApiLoaded) {
        const fetchedUsers = await fetchInitialUsers();
        if (fetchedUsers.length > 0) {
          setUsers((prevUsers) => {
            const existingEmails = new Set(prevUsers.map((u) => u.email.toLowerCase()));
            const newUsers = fetchedUsers.filter((u) => !existingEmails.has(u.email.toLowerCase()));
            const updated = [...prevUsers, ...newUsers];
            localStorage.setItem('users', JSON.stringify(updated));
            return updated;
          });
          localStorage.setItem('api_users_loaded', 'true');
        }
      }
    };
    initApiUsers();
  }, []);

  // Guardar en LocalStorage al actualizar estados
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    persistUsers(users);
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Registro
  const registerUser = (userData: Omit<User, 'id' | 'failedAttempts' | 'isBlocked'>) => {
    const normalizedEmail = userData.email.toLowerCase();
    const currentUsers = readStoredState<User[]>('users', users);
    const emailExist = currentUsers.some((u) => u.email.toLowerCase() === normalizedEmail);
    if (emailExist) {
      return { success: false, message: 'El correo electrónico ya se encuentra registrado.' };
    }

    const newUser: User = {
      ...userData,
      email: normalizedEmail,
      id: Date.now().toString(),
      failedAttempts: 0,
      isBlocked: false,
    };

    const updatedUsers = [...currentUsers, newUser];
    setUsers(updatedUsers);
    persistUsers(updatedUsers);

    return { success: true, message: 'Usuario registrado exitosamente.' };
  };

  // Login con bloqueo a los 3 intentos
  const loginUser = (email: string, pass: string) => {
    const normalizedEmail = email.toLowerCase();
    const currentUsers = readStoredState<User[]>('users', users);
    const userIndex = currentUsers.findIndex((u) => u.email.toLowerCase() === normalizedEmail);

    if (userIndex === -1) {
      return { success: false, message: 'Usuario no encontrado.' };
    }

    const targetUser = currentUsers[userIndex];

    if (targetUser.isBlocked) {
      return { success: false, message: 'Tu cuenta se encuentra bloqueada por superar el límite de intentos.' };
    }

    if (targetUser.password === pass) {
      const updatedUsers = currentUsers.map((user, index) =>
        index === userIndex ? { ...user, failedAttempts: 0 } : user
      );
      const authenticatedUser = updatedUsers[userIndex];

      if (currentUser && currentUser.id !== authenticatedUser.id) {
        clearCartAndRestoreStock();
      }

      setUsers(updatedUsers);
      persistUsers(updatedUsers);
      setCurrentUser(authenticatedUser);
      return { success: true, message: 'Inicio de sesión exitoso.' };
    }

    const newAttempts = targetUser.failedAttempts + 1;
    const updatedUsers = currentUsers.map((user, index) =>
      index === userIndex
        ? { ...user, failedAttempts: newAttempts, isBlocked: newAttempts >= 3 ? true : user.isBlocked }
        : user
    );

    setUsers(updatedUsers);
    persistUsers(updatedUsers);

    if (newAttempts >= 3) {
      return { success: false, message: 'Has superado el límite de 3 intentos fallidos. Tu cuenta ha sido bloqueada.' };
    }

    return { success: false, message: `Contraseña incorrecta. Intento ${newAttempts} de 3.` };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    clearCartAndRestoreStock();
  };

  // Carrito de compras
  const addToCart = (product: Product) => {
    if (!currentUser) {
      return { success: false, message: 'Debes iniciar sesión para agregar productos al carrito.' };
    }

    if (product.stock <= 0) {
      return { success: false, message: 'Este producto no tiene stock disponible.' };
    }

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === product.id);

      if (existingItemIndex > -1) {
        return prevCart.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prevCart, { product, quantity: 1 }];
    });

    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p))
    );

    return { success: true, message: 'Producto agregado al carrito.' };
  };

  const clearCartAndRestoreStock = () => {
    setCart((prevCart) => {
      setProducts((prevProducts) =>
        prevProducts.map((prod) => {
          const itemInCart = prevCart.find((c) => c.product.id === prod.id);
          if (itemInCart) {
            return { ...prod, stock: prod.stock + itemInCart.quantity };
          }
          return prod;
        })
      );
      return [];
    });
  };

  const checkoutCart = () => {
    if (cart.length === 0) {
      return { success: false, message: 'El carrito está vacío.' };
    }
    // Descontar el stock permanentemente (ya fue reducido al agregar al carrito)
    setCart([]);
    return { success: true, message: '¡Compra realizada con éxito! Gracias por tu preferencia.' };
  };

  return (
    <AppContext.Provider
      value={{
        products,
        users,
        currentUser,
        cart,
        registerUser,
        loginUser,
        logoutUser,
        addToCart,
        clearCartAndRestoreStock,
        checkoutCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe usarse dentro de un AppProvider');
  }
  return context;
};