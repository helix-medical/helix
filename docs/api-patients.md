## Schema

```mermaid
flowchart TB
 PTNS{{/api/patients}} -- Read All --> MRAPTNS{GET} ---> PTNS_READALL{{/}}
 PTNS -- Read One --> MROPTNS{GET} ---> PTNS_READONE{{/:id}}
 PTNS -- Appointment --> MAPTNS{GET} ---> PTNS_APP{{/appointment}}
 PTNS -- Create --> MCPTNS{PST} --> MWCPTNS[[Create]] --> PTNS_CREATE{{/add}}
 PTNS -- Update --> MUPTNS{PUT} --> MWUPTNS[[Update]] --> PTN_UPDATE{{/:id}}
 PTNS -- Delete --> MDPTNS{DEL} ---> PTNS_DEL{{/:id}}

click PTNS_READALL "#read-all"
click PTNS_READONE "#read-one"
click PTNS_APP "#appointment"
click PTNS_CREATE "#create"
click PTN_UPDATE "#update"
click PTNS_DEL "#delete"
```

## Middleware

!!! info "Middlewares"
    The middlewares are used to check if the request body is valid.
    Return a `406 NOT_ACCEPTABLE` error if the request body is invalid.
    Else, the request is passed to the next middleware.

### Create

Check if the request body is valid.

```json title="Request Body"
{
    "name": "string",
    "lastName": "string",
    "birthDate": "YYYY-MM-DD",
    "sex": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "city": "string",
    "job": "string",
    "doctor": "string",
    "passif": "string",
}
```

### Update

Check if the request body is valid.

```json title="Request Body"
{
    "name": "string",
    "lastName": "string",
    "birthDate": "YYYY-MM-DD",
    "sex": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "city": "string",
    "job": "string",
    "doctor": "string",
    "passif": "string",
}
```

## Endpoints

### Read All

Return all patients

```json title="Response Body"
[
    {
    "id": "[0-9a-fA-F]{8}",
    "name": "string",
    "lastName": "string",
    "birthDate": "YYYY-MM-DD",
    "sex": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "city": "string",
    "job": "string",
    "doctor": "string",
    "passif": "string",
    },
    ...
]
```

### Read One

Return one patient.

```json title="Response Body"
{
    "id": "[0-9a-fA-F]{8}",
    "name": "string",
    "lastName": "string",
    "birthDate": "YYYY-MM-DD",
    "sex": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "city": "string",
    "job": "string",
    "doctor": "string",
    "passif": "string",
}
```
