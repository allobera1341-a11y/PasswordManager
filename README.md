# AI Secure Password Manager 🔐
**Dashboard de Ciberseguridad Profesional y Analizador de Entropía Local**

Un gestor de credenciales de alto rendimiento con arquitectura de "conocimiento cero" (zero-knowledge), diseñado para la generación de contraseñas de grado militar y análisis de seguridad inteligente mediante IA. Desarrollado para la excelencia académica y fiabilidad técnica.

> [!IMPORTANT]
> **Requisito de Sistema:** Este proyecto requiere **Node.js v18.0.0** o superior. Si usas una versión anterior, el servidor de desarrollo no arrancará.

## 🛠 Stack Tecnológico
- **Frontend:** React 18 + Vite
- **Estilo:** Tailwind CSS (Interfaz Profesional Minimalista)
- **Base de Datos:** Firebase Realtime Database (RTDB)
- **Seguridad:** Web Crypto API (AES-256-GCM)
- **Inteligencia:** Integración con OpenAI / Gemini para análisis de seguridad

## 🚀 Inicio Rápido (Guía para Profesores)

Sigue estos pasos para levantar el proyecto en menos de 2 minutos:

### 1. Preparar el entorno
Si tienes instalado `nvm`, asegúrate de usar una versión moderna de Node:
```bash
nvm use 20 || nvm install 20
```

### 2. Instalación
```bash
npm install
```

### 3. Configuración de Variables
Copia el archivo de ejemplo y rellena tus credenciales (Firebase es necesario para el historial):
```bash
cp .env.example .env
```

### 4. Ejecución
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

## 🛡 Arquitectura de Seguridad
- **Zero-Knowledge:** Las cadenas de texto sensibles nunca se transmiten en texto plano. Todo el cifrado ocurre localmente en el cliente.
- **Análisis Local:** Los cálculos de entropía y detección de patrones se realizan mediante JavaScript en un entorno aislado.
- **Privacidad Primero:** La IA solo recibe metadatos abstractos para dar consejos, nunca las contraseñas reales.

## 📊 Características Principales
- **Generación Inteligente:** Pools de entropía con modos: Standard, High y Maximum.
- **Auditoría en Tiempo Real:** Sincronización en vivo con Firebase y analíticas de sesión.
- **AI Insights:** Recomendaciones proactivas basadas en métricas criptográficas.
- **Modo Presentación:** Incluye un "Demo Controller" para cargar datos simulados rápidamente durante la exposición.

---
