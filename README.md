# Back-end JavaScript avec Postman pour des requêtes CRUD multiples

## Fonctionnalité : Utilisateurs | Produits

### Utilisateurs
- Création de multiples utilisateurs
- Créer un utilisateur
- Connexion utilisateur
- Récupérer tous les utilisateurs
- Récupérer un utilisateur
- Mettre à jour un utilisateur
- Supprimer un utilisateur
- Bloquer un utilisateur
- Débloquer un utilisateur
- Assigner un rôle à l'utilisateur
- Déconnexion
- Réinitialiser le mot de passe
- Modifier le mot de passe

### Produits
- Créer un nouveau produit
- Récupérer un produit par ID
- Récupérer tous les produits avec pagination et filtres
- Mettre à jour un produit par ID
- Supprimer un produit par ID

## Utilisation de JSON Web Token et Cookies

### Endpoints Utilisateurs

| Méthode | Endpoint                               | Description                           |
|---------|----------------------------------------|---------------------------------------|
| POST    | /api/users/register                    | Crée un nouvel utilisateur           |
| POST    | /api/users/login                       | Connecte un utilisateur              |
| GET     | /api/users                             | Récupère tous les utilisateurs        |
| GET     | /api/users/:id                         | Récupère un utilisateur par ID        |
| PUT     | /api/users/:id                         | Met à jour un utilisateur par ID      |
| DELETE  | /api/users/:id                         | Supprime un utilisateur par ID        |
| PUT     | /api/users/:id/block                   | Bloque un utilisateur par ID          |
| PUT     | /api/users/:id/unblock                 | Débloque un utilisateur par ID        |
| PUT     | /api/users/:id/assign-role             | Assigner un rôle à l'utilisateur     |
| POST    | /api/users/logout                      | Déconnecte l'utilisateur             |
| POST    | /api/users/reset-password              | Réinitialise le mot de passe          |
| PUT     | /api/users/change-password             | Modifie le mot de passe               |

### Endpoints Produits

| Méthode | Endpoint                               | Description                           |
|---------|----------------------------------------|---------------------------------------|
| POST    | /api/products                          | Crée un nouveau produit              |
| GET     | /api/products/:id                      | Récupère un produit par ID            |
| GET     | /api/products                          | Récupère tous les produits avec pagination et filtres |
| PUT     | /api/products/:id                      | Met à jour un produit par ID          |
| DELETE  | /api/products/:id                      | Supprime un produit par ID            |

## Dépendances
- async-handler: 0.0.3
- bcrypt: 5.1.0
- body-parser: 1.20.2
- cookie-parser: 1.4.6
- crypto: 1.0.1
- dotenv: 16.1.4
- express: 4.18.2
- express-async-handler: 1.2.0
- faker: 6.6.6
- jsonwebtoken: 9.0.0
- mongodb: 5.6.0
- mongoose: 7.2.4
- morgan: 1.10.0
- nodemailer: 6.9.3
- nodemon: 2.0.22
