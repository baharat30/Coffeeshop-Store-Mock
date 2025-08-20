import { useEffect, useState } from "react";
import "./header.css";
import SearchDropdown from '../../components/SearchDropdown/searchdropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ContactModal from "../contactmodal/contactmodal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEllipsisV } from "@fortawesome/free-solid-svg-icons"; // سه‌نقطه اضافه شد

import { faFillDrip } from '@fortawesome/free-solid-svg-icons';
import {
  faCartShopping,
  faMagnifyingGlass,
  faUser,
  faCircleHalfStroke,
  faMugSaucer
} from "@fortawesome/free-solid-svg-icons";
//import { useCart } from '../../hooks/useCart';
import { supabase } from '../../supabaseClient';
import AboutModal from "../AboutModal/aboutmodal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  //const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  //const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // const toggleMobileMenu = () => {
  //   setMobileMenuOpen(!mobileMenuOpen);
  // };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.classList.remove('light', 'dark'); 
    document.body.classList.add(theme);             
  }, [theme]);

useEffect(() => {
  if (user && user.email) {
    setTimeout(() => setShowWelcomeModal(true), 100); 
  }
}, [user]);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    setDropdownVisible(false);
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowLogoutModal(true);

    setTimeout(() => {
      setShowLogoutModal(false);
      navigate("/checkout");
    }, 2000); // بعد از ۲ ثانیه
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setIsMoreOpen(false);  // وقتی از موبایل به دسکتاپ میریم، بسته بشه
        setIsMenuOpen(false);  // هم منوی همبرگری بسته بشه
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest('.mobile-menu') &&
        !target.closest('.mobile-more') &&
        !target.closest('.mobile-only') // دکمه‌ها
      ) {
        setIsMenuOpen(false);
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <header className="fixed top-0 left-0 w-screen h-[55px] z-50 flex justify-between items-center px-6 bg-[var(--header-background-color)] text-[var(--text-color)]">

      {/* آیکون همبرگری - موبایل */}
      <button
        className="mobile-only p-2"
        onClick={(e) => {
          e.stopPropagation();
          setIsMoreOpen(false); // سه‌نقطه بسته بشه
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <FontAwesomeIcon icon={faBars} className="fa-icon cursor-pointer" />
      </button>
      {/* منوی همبرگری موبایل */}
      {isMenuOpen && (
        <div className="mobile-menu absolute top-[55px] left-0 w-64 bg-[var(--header-background-color)] text-[var(--text-color)] shadow-lg z-50 p-4">
          <ul className="flex flex-col gap-4">
            <li><Link to="/menu" onClick={() => setIsMenuOpen(false)}>Cafe Menu</Link></li>
            <li><Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setShowAboutModal(true); setIsMenuOpen(false); }}>About Us</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setShowModal(true); setIsMenuOpen(false); }}>Contact Us</a></li>
          </ul>
        </div>
      )}

      {/* ناوبری سمت چپ - دسکتاپ */}
      <nav className="navbarLeft desktop-only">
        <ul className="flex gap-8 list-none text-[15px] font-bold">
          <li><Link to="/menu" className="hover:text-yellow-400">Cafe Menu</Link></li>
          <li><Link to="/shop" className="hover:text-yellow-400">Shop</Link></li>
          <li>
            <a href="#" className="hover:text-yellow-400"
              onClick={(e) => { e.preventDefault(); setShowAboutModal(true); }}>
              About Us
            </a>
          </li>
          <li>
            <Link to="#" className="hover:text-yellow-400"
              onClick={(e) => { e.preventDefault(); setShowModal(true); }}>
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>

      {/* لوگو */}
      <Link to="/" className="hover:text-yellow-400">
        <div className="titr text-[22px] font-caveat text-[#c5ebc6] px-1 transition-transform duration-300 hover:scale-110">
          HESS Coffee
          <FontAwesomeIcon className="coffeeh" icon={faMugSaucer} />
          <FontAwesomeIcon className="coffeeH" icon={faMugSaucer} />
        </div>
      </Link>

      {/* سمت راست */}
      <nav className="navbarRight flex items-center gap-3">
        {/* سبد خرید همیشه نمایش داده می‌شود */}
        <Link to="/cart" className="cart-icon relative hover:text-yellow-400">
          <FontAwesomeIcon icon={faCartShopping} className="fa-icon" />
          {totalQuantity > 0 && (
            <span className="cart-count bibi absolute -top-2 -right-3 bg-red-600 text-white text-[10px] rounded-full px-1.5 py-0.5">
              {totalQuantity}
            </span>
          )}
        </Link>


        {/* موبایل: سه‌نقطه */}
        <button
          className="mobile-only p-2"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(false); // همبرگر بسته بشه
            setIsMoreOpen(!isMoreOpen);
          }}
        >
          <FontAwesomeIcon icon={faEllipsisV} className="fa-icon cursor-pointer" />
        </button>

        {isMoreOpen && (
          <div className="mobile-more absolute top-[55px]  right-0 w-48 bg-[var(--header-background-color)] text-[var(--text-color)] shadow-lg z-50 p-4">
            <ul className="flex flex-col gap-4">
              <li>
                <div className="search-dropdown mobile-small-search">
                  <SearchDropdown />
                </div>
              </li>
              {user ? (
                <>
                  <li><Link to="/profile" onClick={() => setIsMoreOpen(false)}>Profile</Link></li>
                  {cartItems.length > 0 && <li><Link to="/payment" state={{ cartItems }} onClick={() => setIsMoreOpen(false)}>Complete Purchase</Link></li>}
                  <li><button onClick={() => { handleLogout(); setIsMoreOpen(false); }}>Logout</button></li>
                </>
              ) : (
                <li><Link to="/checkout" onClick={() => setIsMoreOpen(false)}>Login / Signup</Link></li>
              )}
              <li>
                <button
                  onClick={() => { toggleTheme(); setIsMoreOpen(false); }}
                  className="theme-toggle-button-mobile"
                >
                  <FontAwesomeIcon icon={faCircleHalfStroke} className="fa-icon" />
                  Dark / Light
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* دسکتاپ: آیکون‌ها */}
        <div className="desktop-only flex items-center gap-6"> {/* gap رو بزرگتر کردیم */}
          <SearchDropdown />

          {user ? (
            <div
              className="dropdown-wrapper relative"
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}
            >
              <FontAwesomeIcon
                icon={faUser}
                className="fa-icon cursor-pointer p-2 rounded hover:bg-[var(--button-hover-bg-color)]"
              />
              {dropdownVisible && (
                <div className="dropdown-menu absolute top-full right-0 min-w-[160px] bg-[var(--header-background-color)] border border-[var(--text-color)] rounded-lg shadow-md z-50">
                  <Link
                    to="/profile"
                    className="dropdown-item block px-4 py-2 text-center hover:bg-[var(--button-hover-bg-color)]"
                  >
                    Profile
                  </Link>
                  {cartItems.length > 0 && (
                    <Link
                      to="/payment"
                      state={{ cartItems }}
                      className="dropdown-item cp hover:text-yellow-400"
                    >
                      Complete Purchase
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-center w-full hover:bg-[var(--button-hover-bg-color)] rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/checkout">
              <FontAwesomeIcon
                icon={faUser}
                className="fa-icon cursor-pointer p-2 rounded hover:bg-[var(--button-hover-bg-color)]"
              />
            </Link>
          )}

          <button onClick={toggleTheme} className="theme-toggle-button">
            <FontAwesomeIcon icon={faCircleHalfStroke} className="fa-icon" />
          </button>

        </div>
      </nav>


      {/* مودال‌ها */}
      <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />

      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowLogoutModal(false)}>×</button>
            <h2>Logged Out</h2>
            <p>You have successfully logged out.</p>
          </div>
        </div>
      )}
      {showWelcomeModal && (
        <div className="modal-overlay" onClick={() => setShowWelcomeModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowWelcomeModal(false)}>×</button>
            <h2>Welcome!</h2>
            <p>سلام {user.email} عزیز</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;                                                                    