# Auth

## Schema

```mermaid
flowchart TB
 AUTH{{/api/auth}} -- Login --> MLIAUTH{GET} ---> AUTH_LOGIN{{/login}}
 AUTH -- Refresh Token --> MROAUTH{GET} ---> AUTH_REFRESH{{/refresh-token}}
 AUTH -- Logout --> MLOAUTH{GET} ---> AUTH_LOGOUT{{/logout}}
```
