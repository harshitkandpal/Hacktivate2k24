import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebaseConfig';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in with Google:', error);
      alert('Error logging in with Google');
    }
  };

  const handleGoToSignUp = () => {
    navigate('/signup');
  };

  const styles = {
    container: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/phishing_cyber_attack.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      maxHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
    },
    formContainer: {
      background: 'linear-gradient(135deg, rgba(89, 204, 181, 0.1) 10%, rgba(6, 8, 8, 0.7) 90%)',
      padding: '1.5rem', // 24px / 16px = 1.5rem
      margin: '8rem', // 128px / 16px = 8rem
      borderRadius: '0.5rem', // 8px / 16px = 0.5rem
      boxShadow: '0 0.25rem 0.375rem rgba(0, 0, 0, 0.1)', // 4px / 16px = 0.25rem, 6px / 16px = 0.375rem
      backdropFilter: 'blur(0.625rem)', // 10px / 16px = 0.625rem
      border: '0.0625rem solid rgba(255, 255, 255, 0.18)', // 1px / 16px = 0.0625rem
    },
    heading: {
      fontSize: '1.5rem', // 24px / 16px = 1.5rem
      fontWeight: 'bold',
      marginBottom: '1rem', // 16px / 16px = 1rem
      color: 'white',
    },
    label: {
      display: 'block',
      color: 'white',
      marginBottom: '0.5rem', // 8px / 16px = 0.5rem
    },
    input: {
      width: '100%',
      padding: '0.5rem', // 8px / 16px = 0.5rem
      border: '0.0625rem solid #4A5568', // 1px / 16px = 0.0625rem
      backgroundColor: '#1A202C',
      color: 'white',
      borderRadius: '0.25rem', // 4px / 16px = 0.25rem
      marginBottom: '1rem', // 16px / 16px = 1rem
    },
    button: {
      width: '100%',
      padding: '0.5rem', // 8px / 16px = 0.5rem
      borderRadius: '0.25rem', // 4px / 16px = 0.25rem
      marginBottom: '1rem', // 16px / 16px = 1rem
    },
    loginButton: {
      backgroundColor: '#C7C8C8',
      color: 'white',
    },
    googleButton: {
      backgroundColor: '#59CCB5',
      color: 'white',
    },
    signUpButton: {
      backgroundColor: '#4A5568',
      color: 'white',
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem', // 16px / 16px = 1rem
    },
    buttonFlex: {
      flex: 1,
    },
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div className="mb-4">
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={{ ...styles.button, ...styles.loginButton }}>
            Login
          </button>
        </form>
        <div style={styles.buttonContainer}>
          <button type="button" onClick={handleGoToSignUp} style={{ ...styles.button, ...styles.signUpButton, ...styles.buttonFlex }}>
            Go to Sign Up
          </button>
          <button type="button" onClick={handleGoogleSignIn} style={{ ...styles.button, ...styles.googleButton, ...styles.buttonFlex }}>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
