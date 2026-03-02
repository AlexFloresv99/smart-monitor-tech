FROM node:20-slim

WORKDIR /app

# Copiamos los archivos de paquetes
COPY package*.json ./

# Instalamos dependencias (aquí se crearán los binarios de Tailwind en Linux)
RUN npm install

COPY . .

EXPOSE 5173

# Comando para desarrollo con Vite (importante el flag --host)
CMD ["npm", "run", "dev", "--", "--host"]