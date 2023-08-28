Back-end javascript avec postMan sur de multiple requete CRUD

Fonctionnalité :              Utilisateurs                     |    Produits          
                         -création de multiple utilisateurs        -récuperer un produits
                         -crée un utilisateur                      - récuperer tous les produits avec pagination et filtres
                         -connexion utilisateur                    - mise à jour du produit
                         -récuperer tous les utilisateurs          - supprimer un produit
                         -récuperer un utilisateur
                         -supprimer tous les utilisateurs
                         -supprimer un utilisateurs
                         -mettre à jour un utilisateur
                         -bloquer un utilisateur
                         -débloquer un utilisateur
                         -assigner un rôle à l'utilisateur
                          -déconnexion 
                        -réinitialiser le mot de passe
                         -modifier le mot de passe

  
                      utilisation de Jsonwebtoken
                       utilisation des cookies

                       
POST	/api/users/register	Crée un nouvel utilisateur
POST	/api/users/login	Connecte un utilisateur
GET	/api/users	Récupère tous les utilisateurs
GET	/api/users/:id	Récupère un utilisateur par ID
PUT	/api/users/:id	Met à jour un utilisateur par ID
DELETE	/api/users/:id	Supprime un utilisateur par ID
PUT	/api/users/:id/block	Bloque un utilisateur par ID
PUT	/api/users/:id/unblock	Débloque un utilisateur par ID
PUT	/api/users/:id/assign-role	Assigner un rôle à l'utilisateur
POST	/api/users/logout	Déconnecte l'utilisateur
POST	/api/users/reset-password	Réinitialise le mot de passe
PUT	/api/users/change-password	Modifie le mot de passe

POST	/api/products	Crée un nouveau produit
GET	/api/products/:id	Récupère un produit par ID
GET	/api/products	Récupère tous les produits avec pagination et filtres
PUT	/api/products/:id	Met à jour un produit par ID
DELETE	/api/products/:id	Supprime un produit par ID



/////// dépendances ///////
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
- slugify: 1.6.6
