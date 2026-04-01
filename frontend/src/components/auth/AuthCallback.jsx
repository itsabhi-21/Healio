import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token); // save token
      navigate('/dashboard'); // redirect to dashboard
    } else {
      navigate('/login'); // something went wrong
    }
  }, []);

  return <div>Logging you in...</div>;
};

export default AuthCallback;