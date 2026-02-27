import { LogtoConfig, LogtoProvider, UserScope } from '@logto/react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: Replace with env variables and proxy
  const authConfig: LogtoConfig = {
    endpoint: 'http://localhost:3010/',
    appId: 'hhm8fu4f01r4hlw9q7n1s',
    scopes: [UserScope.Email, UserScope.Identities, UserScope.Organizations, UserScope.Roles, 'api:read', 'api:write'],
    resources: ['http://localhost:3001/api'],
  };

  return <LogtoProvider config={authConfig}>{children}</LogtoProvider>;
};

export default AuthProvider;
