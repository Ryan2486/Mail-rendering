# Étape 1: Choisir l'image de base
FROM node:16

# Étape 2: Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Étape 3: Copier les fichiers de votre projet dans le conteneur
COPY package*.json ./

# Étape 4: Installer les dépendances
RUN npm install

# Étape 5: Copier tout le reste de votre code dans le conteneur
COPY . .

# Étape 6: Exposer le port sur lequel le serveur écoute (8082)
EXPOSE 8082

# Étape 7: Définir la commande pour démarrer votre application
CMD ["npm", "start"]
