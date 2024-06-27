import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebaseConfig';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up');
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing up with Google:', error);
      alert('Error signing up with Google');
    }
  };

  const styles = {
    container: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/phishing_cyber_attack.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    formContainer: {
      background: 'linear-gradient(135deg, rgba(89, 204, 181, 0.1) 10%, rgba(6, 8, 8, 0.7) 90%)',
      padding: '1.5rem', // 24px / 16px = 1.5rem
      margin: '4rem', // 128px / 16px = 8rem
      borderRadius: '0.5rem', // 8px / 16px = 0.5rem
      boxShadow: '0 0.25rem 0.375rem rgba(0, 0, 0, 0.1)', // 4px / 16px = 0.25rem, 6px / 16px = 0.375rem
      backdropFilter: 'blur(0.625rem)', // 10px / 16px = 0.625rem
      border: '0.0625rem solid rgba(255, 255, 255, 0.18)', // 1px / 16px = 0.0625rem
    },
    heading: {
      fontSize: '3rem', // 24px / 16px = 1.5rem
      fontWeight: 'bold',
      marginBottom: '1rem', // 16px / 16px = 1rem
    },
    label: {
      display: 'block',
      color: 'white',
      marginBottom: '0.5rem',
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #4A5568',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      color: 'white',
      borderRadius: '0.25rem',
      marginBottom: '1rem',
    },
    button: {
      width: '100%',
      padding: '0.5rem',
      borderRadius: '0.25rem',
      marginBottom: '1rem',
    },
    signUpButton: {
      backgroundColor: '#4A5568',
      color: 'white',
    },
    googleButton: {
      backgroundColor: '#59CCB5',
      color: 'white',
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
    },
    buttonFlex: {
      flex: 1,
    },
    welcomeMessage: {
      position: 'absolute',
      top: '0.5rem',
      left: '35%',
      transform: 'translateX(-50%)',
      fontSize: '4rem',
      fontWeight: 'bold',
      zIndex: 10,
      letterSpacing: '-0.025em', // Reduce letter spacing
      textShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.5)', // Add text shadow
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.welcomeMessage}><h1>Unlock the secrets of phishing attacks</h1></div>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Sign Up</h2>
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
          <button type="submit" style={{ ...styles.button, ...styles.signUpButton }}>
            Sign Up
          </button>
          <button type="button" onClick={handleGoogleSignUp} style={{ ...styles.button, ...styles.googleButton }}>
            Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
