# Schema

```mermaid
flowchart TB
subgraph Routers
 RE[/Events\]
 RAP[/Appointments\]
 RAC[/Accounting\]
 RP[/Patients\]
 RU[/Users\]
 RA[/Auth\]
end

subgraph Middlewares
 MEJ(ExpressJSON) -->MC(Credentials)
 MC --> MCORS(CORS)
 MCORS --> MCP(CookiesParser)
 MCP --> MLOG(LoggerCheckpoint)
end

subgraph Databases
 EVNT_DB[(Events)]
 APPS_DB[(Appointments)]
 ACCS_DB[(Accounting)]
 PTNS_DB[(Patients)]
 USRS_DB[(Users)]
end

MLOG --> MLC{{API Gateway}}
MLC --> RE
MLC --> RAP
MLC --> RAC
MLC --> RP
MLC --> RU
MLC --> RA
MLC --> R404{{Error Handler}}
RP <---> PTNS_DB
RAP <---> APPS_DB
RE <---> EVNT_DB
RAC <---> ACCS_DB
RU <---> USRS_DB
RA <---> USRS_DB

click RE "/api/events.html"
click RP "/api/patients.html"
click RAP "/api/appointments.html"
click RAC "/api/accounting.html"
click RU "/api/users.html"
click RA "/api/auth.html"
```
