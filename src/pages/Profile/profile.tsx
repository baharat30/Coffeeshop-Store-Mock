import { useEffect, useState } from "react";
import UserCard from "../../components/userCard/usercard";
import { supabase } from "../../supabaseClient";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import "./Profile.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    username: "",
    mobile: "",
    address: ""
  });

  // تابع برای گرفتن اطلاعات کاربر از سرور
  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("User not logged in");
      return;
    }
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)  // ← اینجا نام ستون id رو چک کن
      .single();

    if (error) {
      console.error("Error fetching user data:", error.message);
    } else {
      setUserInfo({ ...data, id: user.id });
      setFormData({
        full_name: data.full_name || "",
        email: data.email || "",
        username: data.username || "",
        mobile: data.mobile || "",
        address: data.address || ""
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userInfo) {
    return <p className="loading-message">Loading user info...</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = async () => {
    if (isEditing) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("User not logged in");
        return;
      }

      const { error } = await supabase
        .from("users")
        .update({
          full_name: formData.full_name,
          username: formData.username,
          mobile: formData.mobile,
          address: formData.address,
        })
        .eq("id", user.id); // نام ستون id را مطابق جدول خودت اصلاح کن

      if (error) {
        console.error("Error updating user info:", error.message);
        alert("Failed to update user info.");
      } else {
        // بعد از آپدیت، داده‌ها را دوباره از سرور بخوان
        await fetchUserData();
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: userInfo.full_name || "",
      email: userInfo.email || "",
      username: userInfo.username || "",
      mobile: userInfo.mobile || "",
      address: userInfo.address || ""
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Welcome back, {userInfo.full_name}! 👋</h1>

      <UserCard
        fullName={
          isEditing ? (
            <input name="full_name" value={formData.full_name} onChange={handleChange} />
          ) : userInfo.full_name
        }
        email={
          isEditing ? (
            <input name="email" value={formData.email} onChange={handleChange} disabled />
          ) : userInfo.email
        }
        username={
          isEditing ? (
            <input name="username" value={formData.username} onChange={handleChange} />
          ) : userInfo.username
        }
        mobile={
          isEditing ? (
            <input name="mobile" value={formData.mobile} onChange={handleChange} />
          ) : userInfo.mobile
        }
        address={
          isEditing ? (
            <textarea name="address" value={formData.address} onChange={handleChange} />
          ) : userInfo.address
        }
      />

      <div className="profile-buttons">
        {isEditing ? (
          <>
            <button className="edit-button" onClick={handleEditClick}>Save</button>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Info</button>
        )}
      </div>
      <div style={{ marginTop: 40 }}>
  <OrderHistory />
</div>
    </div>
  );
};

export default Profile;
