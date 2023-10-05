<div align="center">
    <img src="https://github.com/helix-medical/.github/blob/main/assets/helix-banner-server.png?raw=true" />
    <h1>The Helix Project: <code>server</code></h1>
    <div>
        <img src="https://img.shields.io/github/actions/workflow/status/helix-medical/server/push-images.yml?label=Build%20to%20Docker&logo=github&style=for-the-badge" />
        <img src="https://img.shields.io/github/languages/top/helix-medical/server?logo=typescript&style=for-the-badge" />
    </div>
    <div>
        <img src="https://img.shields.io/docker/image-size/xavier2p/helix-server/latest?label=IMAGE%20SIZE&style=for-the-badge&logo=docker" />
        <img src="https://img.shields.io/docker/v/xavier2p/helix-server?label=image%20version&style=for-the-badge&logo=docker" />
        <img src="https://img.shields.io/docker/pulls/xavier2p/helix-server?style=for-the-badge&logo=docker&label=pulls" />
    </div>
</div>

<!-- ![CodeQL Analysis](https://img.shields.io/github/actions/workflow/status/helix-medical/client/github-code-scanning/codeql) -->

<!-- Concept -->
The Helix Project ([website](https://helix-medical.github.io)) is a Patient Management System (PMS) specially built for Osteopaths purposes. You can find some popular features like:

+ Patient management (medical history, appointments, billing, ...)
+ Appointment management (personal and professional calendar ...)
+ Billing management (invoices, export to Excel, ...)
+ Multi-user management (with different roles for the whole cabinet)

All that features are available in a single application, with a simple and intuitive interface, and **for ever** free!

## Technical stack

The server is built with [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com). We use [TypeScript](https://www.typescriptlang.org) to write our code, and [MariaDB](https://mariadb.org) as database.

## Installation

Please see the [installation guide](https://helix-medical.github.io/docs/getting-started/index.html) for more information.

## Development

```bash
# Clone the repository
git clone https://github.com/helix-medical/server.git && cd client

# Install dependencies
npm install

# Run the application
npm run dev

# Run the production version
npm start
```

## Contributing

Feel free to open a pull request if you want to contribute to the project!

## License

This project is licensed under the [GPLv3 License](https://github.com/helix-medical/server/blob/main/LICENSE).
