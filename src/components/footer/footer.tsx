import React, { useEffect, useState } from "react";
import "./footer.css";
import Logo from "../../components/logo/logo";
import { Link, useNavigate } from "react-router-dom";
import AboutModal from "../../components/AboutModal/aboutmodal";
import ContactModal from "../../components/contactmodal/contactmodal";
import { supabase } from "../../supabaseClient";

const Footer = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoadingUser(false); 
    };
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const openAboutModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAboutModal(true);
  };

  const handleTrackOrderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      navigate("/profile"); 
    } else {
      navigate("/checkout"); 
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="app-container">
      <div className="main-content">{/* محتوای اصلی */}</div>

      <footer>
        <div className="container">
          <Link to="/" onClick={handleScrollToTop}>
            <Logo className="small-logo" />
          </Link>
          <div className="footerSectionL">
            <ul>
              <li>
                <Link to="/shop" onClick={handleScrollToTop}>
                  Home Coffee Machines
                </Link>
              </li>
              <li>
                <a onClick={openAboutModal}>About HESS Coffee</a>
              </li>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setShowContactModal(true);
                  }}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="footerSectionR">
            <ul>
              <li>
                <Link to="/menu" onClick={handleScrollToTop}>
                  Dine in menu
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={handleScrollToTop}>
                  Accessories and Essentials
                </Link>
              </li>
              <li>
                <a onClick={(e) => {
                  e.preventDefault();
                  if (loadingUser) return; 
                  if (user) navigate("/profile");
                  else navigate("/checkout");
                }}>
                  Track Your Order
                </a>

              </li>
            </ul>
          </div>
        </div>

        <div className="footerBottom">
          <p>© HESS Coffee. All rights reserved.</p>
        </div>
      </footer>

      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </div>
  );
};

export default Footer;
