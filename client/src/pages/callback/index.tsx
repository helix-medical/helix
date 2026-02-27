import { useHandleSignInCallback } from '@logto/react';
import { useNavigate } from 'react-router-dom';

/**
 * OIDC Callback page
 */
const Callback = () => {
  const navigate = useNavigate();
  const { isLoading } = useHandleSignInCallback(() => {
    navigate('/');
  });

  if (isLoading) {
    return <div>Redirecting...</div>;
  }

  return null;
};

export default Callback;
