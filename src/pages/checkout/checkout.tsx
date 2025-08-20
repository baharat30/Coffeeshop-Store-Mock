import React, { useEffect, useState } from 'react';
import './checkout.css';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useLocation } from 'react-router-dom';

const CheckOut: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'login' | 'signup' | 'reset' | null>(null);
  const [showTerms, setShowTerms] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
const [isResetPassword, setIsResetPassword] = useState(false);
const [newPassword, setNewPassword] = useState('');


  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    phone: '',
    postalCode: '',
    address: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const location = useLocation();

  const handleSignup = async (email: string, password: string) => {
    const { data: signupData, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    console.log('User signed up:', signupData);

    if (signupData.user) {
      const user = signupData.user;

      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!existingUser) {
        const { error: insertError } = await supabase.from('users').insert([
          {
            id: user.id,
            email: user.email, 
            full_name: '', 
            username: '',
            mobile: '',
            phone: '',
            postalCode: '',
            address: '',
          },
        ]);

        if (insertError) {
          console.error('خطا در ذخیره‌ی اطلاعات کاربر:', insertError.message);
        }
      }
    }
  };


  const handleLogin = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    console.log('User logged in:', data);
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      alert('Google Sign-in failed: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: '',
      phone: '',
      postalCode: '',
      address: '',
    });
    setTermsAccepted(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (activeForm === 'login') {
      try {
        await handleLogin(formData.email, formData.password);
        setIsLoggedIn(true);
        setActiveForm(null);
        resetForm();
        navigate('/home', { state: { justLoggedIn: true } }); 
      } catch (error: any) {
        alert('Login failed: ' + error.message);
      }
    } else if (activeForm === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      if (!termsAccepted) {
        alert('Please accept the terms and conditions!');
        return;
      }

      try {
        await handleSignup(formData.email, formData.password);
        await handleLogin(formData.email, formData.password);

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
          alert('Error getting user info: ' + userError.message);
          return;
        }

        if (user) {
          const { error: insertError } = await supabase.from('users').insert([
            {
              id: user.id,
              email: formData.email,
              full_name: formData.fullName,
              username: formData.username,
              mobile: formData.mobile,
              phone: formData.phone,
              postalCode: formData.postalCode,
              address: formData.address,
            }
          ]);

          if (insertError) {
            alert('Error saving user data: ' + insertError.message);
            return;
          }
        }

        setIsLoggedIn(true);
        setActiveForm(null);
        resetForm();
        navigate('/home', { state: { justLoggedIn: true } });
      } catch (error: any) {
        alert('Signup failed: ' + error.message);
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setActiveForm(null);
    resetForm();
  };

  const TermsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Terms and Conditions</h2>
        <p>This section contains the terms and conditions of use.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );


const handleReset = async (e: React.FormEvent) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5173/checkout?mode=reset',
  });

  if (error) {
    alert('Error in sending password reset link' + error.message);
  } else {
    alert('A password reset link has been sent to your email.');
    setActiveForm('login');
    setEmail('');
  }
};

useEffect(() => {
  const hash = window.location.hash;
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode');

  const isRecovery = hash.includes('type=recovery');

  if (isRecovery || mode === 'reset') {
    setIsResetPassword(true);
    setActiveForm(null); 
  }
}, [location]);


  return (
    <div className="checkout-container">
      <div className="acc">Do You Have an Account?</div>

      {!isLoggedIn && (
        <>
          <div className="button-group">
            <button onClick={() => { setActiveForm('login'); setTermsAccepted(false); resetForm(); }}>Login</button>
            <button onClick={() => { setActiveForm('signup'); setTermsAccepted(false); resetForm(); }}>Signup</button>
            <button onClick={handleGoogleSignIn} style={{ backgroundColor: '#4285F4', color: 'white' }}>
              Sign in with Google
            </button>
          </div>

{activeForm === 'reset' && (
  <form
    onSubmit={handleReset}
    className="form"
    style={{ maxWidth: '350px', margin: '20px auto' }}
  >
    <h3>Reset your password</h3>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      required
    />
    <button type="submit">Send Reset Link</button>
    <p onClick={() => setActiveForm('login')} className="forgot-link clickable">
      ← Back to login
    </p>
  </form>
)}



{isResetPassword && (
  <form
    onSubmit={async (e) => {
      e.preventDefault();

      if (newPassword !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const { data, error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        alert('Error updating password: ' + error.message);
      } else {
        alert('Password successfully changed.');
        setIsResetPassword(false);
        setActiveForm('login');
        setNewPassword('');
        setFormData(prev => ({ ...prev, confirmPassword: '' }));
        navigate('/checkout');
      }
    }}
    className="form"
  >
    <h3>🔐 Set New Password</h3>
    <input
      type="password"
      placeholder="New password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Repeat new password"
      value={formData.confirmPassword}
      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
      required
    />
    <button type="submit">Update Password</button>
  </form>
)}



          {activeForm === 'login' && (
            <form onSubmit={handleSubmit} className="form">
              <input
                type="email"
                placeholder="Email"
                name="email"
                autoComplete="email"
                required
                pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                title="Please enter a valid email address"
                onChange={handleChange}
                value={formData.email}
                autoFocus
              />
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  value={formData.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 0, top: '39%', transform: 'translateY(-50%)' }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <p
                onClick={() => setActiveForm('reset')}
                className="forgot-link small-text clickable"
              >
                Forgot your password?
              </p>
              <button type="submit">Login</button>
            </form>
          )}

          {activeForm === 'signup' && (
            <form onSubmit={handleSubmit} className="form">
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
              <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 0, top: '39%', transform: 'translateY(-50%)' }}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: 0, top: '39%', transform: 'translateY(-50%)' }}>
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} />
              <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
              <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} />
              <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
              <label>
                <input type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} required />
                I accept the <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setShowTerms(true)}>terms and conditions</span>
              </label>
              <button type="submit">Signup</button>
            </form>
          )}
        </>
      )}

      {/* {isLoggedIn && (
        <div className="logged-in">
          <p>You are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => navigate('/home')}>Go to Home</button>
        </div>
      )} */}

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </div>
  );
};

export default CheckOut;
