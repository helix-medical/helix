# Installation

## Requirements

La philosophie de Helix est d'être hébergé chez soi, en *self-hosting*. C'est un gage de confidentialité, non négligeable dans le milieu médical, et cela permet à Helix de rester gratuit, et sans publicités.

Pour cela, il faut donc prévoir un peu de matériel et d'espace disque. Voici les pré-requis:

- Un serveur. Cela peut être un simple ordinateur, ou un serveur dédié. Nous recommandons d'utiliser un serveur NAS, qui offre une certaine simplicité et une fiabilité important. Il faut au minimum:
  - 4 Go de RAM
  - 32 Go d'espace disque (pour uen installation pérenne)
  - Un processeur récent (Intel Core i3 ou supérieur, ou équivalent)
- [Docker](https://docs.docker.com/get-docker/) et [Docker Compose](https://docs.docker.com/compose/compose-file/)

## Installation

Commencez par cloner le dépôt, et lancer les conteneurs Docker:
```bash
git clone https://github.com/helix-medical/releases && cd releases
```

Ensuite, lancez l'utilitaire d'installation:
```bash
lx config
```

L'utilitaire va vous demander quelques informations, et vous guider dans l'installation.
Enfin, déployez Helix:
```bash
lx deploy
```

Et c'est tout ! Helix est maintenant installé et fonctionnel. Vous pouvez vous connecter à l'adresse `http://localhost:3000` (ou `http://<votre-ip>:3000` si vous utilisez un serveur distant).

## Configuration
