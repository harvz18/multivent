# =========================
# Multivent Docker Setup
# Node + Expo Web Support
# =========================

FROM node:20

# Create app directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# If Expo project exists, install expo CLI globally
RUN npm install -g expo-cli

# Build web version if available (safe fallback)
RUN npm run build || echo "No build script found, skipping..."

# Expose common ports (Expo + Node)
EXPOSE 3000 19000 19001 19002

# Start app (fallback safe)
CMD ["npm", "start"]
