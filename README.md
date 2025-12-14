# TaskFlow Mobile App

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![React Native](https://img.shields.io/badge/React_Native-v0.72-61DAFB.svg)
![Expo](https://img.shields.io/badge/Expo-Router-black.svg)

Aplicación móvil integral para la gestión de tareas personales. Este proyecto ha evolucionado desde un prototipo local hacia una arquitectura de software robusta, integrando autenticación vía API REST, manejo de sesiones con JWT y mejoras significativas en la experiencia de usuario (UX).

## 📱 Características Principales

### Autenticación y Seguridad

- **Integración API REST:** Comunicación asíncrona mediante `Axios` para Login y Registro.
- **Seguridad JWT:** Decodificación y manejo de tokens JSON Web Tokens para sesiones de usuario.
- **Persistencia Segura:** Almacenamiento de sesión utilizando `AsyncStorage` (adaptable a SecureStore).
- **Rutas Protegidas:** Sistema de navegación condicional que restringe el acceso a `/(tabs)` solo a usuarios autenticados.

### Gestión de Tareas (Core & UX)

- **CRUD Completo:** Sincronización de tareas con backend remoto.
- **Safety Guard (UX):** Implementación de alertas nativas de confirmación antes de eliminar tareas críticas, previniendo acciones accidentales.
- **Feedback Visual:** Indicadores de carga y estados de operación.

## 🛠️ Stack Tecnológico

- **Framework:** React Native (Expo SDK 49+)
- **Navegación:** Expo Router v2
- **Cliente HTTP:** Axios
- **Seguridad:** Jose (JWT Decoding)
- **Estado:** React Context API + Custom Hooks
- **Lenguaje:** TypeScript

## 📂 Arquitectura del Proyecto

El proyecto sigue una arquitectura modular escalable:

```text
app/
├── (tabs)/            # Vistas principales protegidas (Home, Profile)
├── login.tsx          # Pantalla de Autenticación
├── _layout.tsx        # Configuración de Navegación y Contexto
components/
├── context/           # AuthContext (Estado Global)
├── ui/                # Componentes Reutilizables (Botones, Items)
services/              # Capa de Comunicación con API
│   ├── auth-service.ts
│   └── todo-service.ts
utils/                 # Utilidades (Storage, Helpers)
constants/             # Configuración (API URL, Tipos)

Instalación y Ejecución
Clonar el repositorio:

Bash

git clone https://github.com/Di-To/prueba-1-expo
cd prueba-1-expo

Instalar dependencias:

Bash

npm install

Ejecutar la aplicación:

Bash

npx expo start

🤝 Colaboradores
Desarrollado en equipo para la asignatura de Desarrollo Móvil:

Diego Toledo

Mario Díaz

Javier Vidal

Proyecto académico - 2025
```
