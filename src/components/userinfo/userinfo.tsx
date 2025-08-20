import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import UserCard from '../../components/userCard/usercard';

const UserInfo = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.log('No user logged in.');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user data:', error.message);
      } else {
        setUserData(data);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) return null;

  return (
    <UserCard
      fullName={userData.full_name}
      email={userData.email}
      username={userData.username}
      mobile={userData.mobile}
      address={userData.address}
    />
  );
};

export default UserInfo;
