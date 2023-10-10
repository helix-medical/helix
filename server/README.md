![banner](https://github.com/Xavier2p/helix/blob/main/.github/assets/helix-banner-server.png?raw=true)

# The Helix Project: `server`

[![version](https://img.shields.io/github/package-json/v/xavier2p/helix?filename=server%2Fpackage.json&style=for-the-badge&logo=nodedotjs&logoColor=%23339933&label=version&color=%23339933)](./package.json)
[![workflow](https://img.shields.io/github/actions/workflow/status/xavier2p/helix/build-and-release.yml?label=ci&logo=github&style=for-the-badge)](../.github/workflows/build-and-release.yml)

<!-- Concept -->
The Helix Project ([website](https://xavier2p.github.io/helix)) is a Patient Management System (PMS) specially built for Osteopaths purposes. You can find some popular features like:

+ Patient management (medical history, appointments, billing, ...)
+ Appointment management (personal and professional calendar ...)
+ Billing management (invoices, export to Excel, ...)
+ Multi-user management (with different roles for the whole cabinet)

All that features are available in a single application, with a simple and intuitive interface, and **for ever** free!

## Technical stack

The server is built with [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com). We use [TypeScript](https://www.typescriptlang.org) to write our code, and [MariaDB](https://mariadb.org) as database.

## Development

```bash
# Clone the repository
git clone https://github.com/Xavier2p/helix.git && cd helix/client

# Install dependencies
npm install nodemon concurrently

# Run the application
npm run dev
```

## Contributing

Feel free to open a pull request if you want to contribute to the project!

## License

This project is licensed under the [GPLv3 License](https://github.com/Xavier2p/helix/blob/main/LICENSE).
