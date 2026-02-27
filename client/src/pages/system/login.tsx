import { useLogto } from '@logto/react';

const Login = () => {
  const { signIn } = useLogto();
  return signIn('http://localhost:3000/callback');
};

export default Login;
