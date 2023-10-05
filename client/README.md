<div align="center">
    <img src="https://github.com/helix-medical/.github/blob/main/assets/helix-banner-client.png?raw=true" />
    <h1>The Helix Project: <code>client</code></h1>
    <div>
        <img src="https://img.shields.io/github/actions/workflow/status/helix-medical/client/push-images.yml?label=Build%20to%20Docker&logo=github&style=for-the-badge" />
        <img src="https://img.shields.io/github/languages/top/helix-medical/client?logo=typescript&style=for-the-badge" />
    </div>
    <div>
        <img src="https://img.shields.io/docker/image-size/xavier2p/helix-client/latest?label=IMAGE%20SIZE&style=for-the-badge&logo=docker" />
        <img src="https://img.shields.io/docker/v/xavier2p/helix-client?label=image%20version&style=for-the-badge&logo=docker" />
        <img src="https://img.shields.io/docker/pulls/xavier2p/helix-client?style=for-the-badge&logo=docker&label=pulls" />
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

The client is built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/), and is available as a [Docker image](https://hub.docker.com/r/xavier2p/helix-client).
For UI design, we use [Mantine](https://mantine.dev/), a React UI library with a simple API and great docs.

## Installation

Please see the [installation guide](https://helix-medical.github.io/docs/getting-started/index.html) for more information.

## Development

```bash
# Clone the repository
git clone https://github.com/helix-medical/client.git && cd client

# Install dependencies
npm install

# Run the application
npm start

# To build the application and serve the production build
npm run deploy
```

## Contributing

Feel free to open a pull request if you want to contribute to the project!

## License

This project is licensed under the [GPLv3 License](https://github.com/helix-medical/client/blob/main/LICENSE).
