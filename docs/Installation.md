## Installation

> **A prendre en compte avant l'installation**
>
> Merci de vous assurer que vous avez bien lu les [précautions d'usage](disclaimer.md) avant d'installer Helix.

### Pré-requis

La philosophie de Helix est d'être hébergé chez soi, en *self-hosting*. C'est un gage de confidentialité, non négligeable dans le milieu médical, et cela permet à Helix de rester gratuit, et sans publicités.

Pour cela, il faut donc prévoir un peu de matériel et d'espace disque. Voici les pré-requis:

+ Un serveur. Cela peut être un simple ordinateur, ou un serveur dédié. Nous recommandons d'utiliser un serveur NAS, qui offre une certaine simplicité et une fiabilité important. Il faut au minimum:
  + 4 Go de RAM
  + 32 Go d'espace disque (pour uen installation pérenne)
  + Un processeur récent (Intel Core i3 ou supérieur, ou équivalent)
+ [Docker](https://docs.docker.com/get-docker/) et [Docker Compose](https://docs.docker.com/compose/compose-file/)
+ [Git](https://git-scm.com/downloads)
<!-- + [lx-tool](../lx-tool/install.md) -->

### Étapes

Commencez par télécharger le fichier `docker-compose.yml`:

```bash
# with curl
curl -o docker-compose.yml https://raw.githubusercontent.com/Xavier2p/helix/main/docker-compose.yml
# or with wget
wget https://raw.githubusercontent.com/Xavier2p/helix/main/docker-compose.yml
```

Téléchargez ensuite le fichier de configuration `.env`:

```bash
# with curl
curl -o .env https://raw.githubusercontent.com/Xavier2p/helix/main/.env.example
# or with wget
wget https://raw.githubusercontent.com/Xavier2p/helix/main/.env.example && mv .env.example .env
```

Vous pouvez maintenant éditer le fichier `.env` avec votre éditeur de texte favori. Les variables à modifier sont:

+ `DB_ROOT_PASSWORD`: le mot de passe de l'utilisateur root de la base de données.
+ `DB_USER`: le nom d'utilisateur de la base de données.
+ `DB_PATH`: le chemin vers le dossier de la base de données. Par défaut, il est situé dans le dossier `data` du dossier courant.
+ `ACCESS_TOKEN_SECRET`: la clé secrète utilisée pour générer les tokens d'authentification. A génerer avec `openssl rand -hex 32`.
+ `REFRESH_TOKEN_SECRET`: la clé secrète utilisée pour générer les tokens de rafraichissement. A génerer avec `openssl rand -hex 32`.

Vous pouvez maintenant lancer Helix avec la commande suivante:

```bash
docker-compose up -d
```

Et c'est tout ! Helix est maintenant installé et fonctionnel. Vous pouvez vous connecter à l'adresse `http://localhost` (ou `http://<server-ip>` si vous utilisez un serveur distant).
