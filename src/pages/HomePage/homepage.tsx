import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // برای بررسی state
import { supabase } from '../../supabaseClient';

import HeroGallery from '../../components/HeroGallery/herogallery';
import AboutSection from '../../components/AboutSection/aboutsection';
import HomeMenu from '../../components/homeMenu/homemenu';
import HomeShop from '../../components/homeshop/homeshop';
import WelcomeModal from '../../components/welcomemodal/welcomemodal';

function HomePage() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [fullName, setFullName] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', user.id)
          .single();
        if (data?.full_name) setFullName(data.full_name);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (location.state?.justLoggedIn) {
      setShowWelcome(true);
      // پاک کردن state تا با رفرش دوباره مودال نیاد
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      {showWelcome && fullName && (
        <WelcomeModal name={fullName} onClose={() => setShowWelcome(false)} />
      )}

      <HeroGallery />
      <AboutSection />
      <HomeMenu />
      <HomeShop />
    </>
  );
}

export default HomePage;
