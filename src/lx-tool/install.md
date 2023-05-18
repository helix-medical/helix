# Installation

## Prérequis

Pour installer l'utilitaire `lx`, vous devez avoir installé [Rust](https://www.rust-lang.org/tools/install) et [Git](https://git-scm.com/downloads).

## Étapes

Pour installer l'utilitaire `lx`, exécutez la commande suivante dans un terminal :

```bash
git clone https://github.com/helix-medical/lx-tool.git && cd lx-tool
cargo install --path .
```

Une fois que l'utilitaire est installé, vous pouvez le compiler pour pouvoir l'utiliser sans avoir à le réinstaller à chaque fois :

```bash
cargo build --release
sudo cp target/release/lx /usr/local/bin/lx
```

Pour tester que l'utilitaire est bien installé, vous pouvez exécuter la commande suivante :

```bash
lx --help
```

Vous devriez voir s'afficher l'aide de l'utilitaire.

Vous voilà fin prêt pour l'installation et la configuration d'Helix !
