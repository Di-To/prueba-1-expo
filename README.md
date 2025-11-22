# TaskFlow Mobile App

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React Native](https://img.shields.io/badge/React_Native-v0.72-61DAFB.svg)
![Expo](https://img.shields.io/badge/Expo-Router-black.svg)

Aplicación móvil para la gestión de tareas personales, desarrollada con React Native y Expo Router. Este proyecto implementa un flujo de autenticación seguro mediante Context API y una interfaz optimizada para la productividad del usuario.

## 📱 Características Principales

### Autenticación y Seguridad

- **Login Seguro:** Validación de credenciales contra base de usuarios estática.
- **Persistencia de Sesión:** Gestión de estado global mediante `AuthContext`.
- **Rutas Protegidas:** Sistema de navegación condicional que impide el acceso no autorizado a las vistas principales (`/(tabs)`).

### Gestión de Tareas (Core)

- **Listado Optimizado:** Implementación de `FlatList` para renderizado eficiente de tareas.
- **CRUD Interactivo:** Creación, marcado (completado) y eliminación de tareas en tiempo real.
- **UX Mejorada:** Feedback visual inmediato y manejo de estados vacíos (Empty States).

## 🛠️ Stack Tecnológico

- **Framework:** React Native (Expo SDK 49+)
- **Navegación:** Expo Router v2 (File-based routing)
- **Lenguaje:** TypeScript
- **Estado:** React Context API
- **UI:** StyleSheet nativo con diseño responsivo

## 📂 Estructura del Proyecto

La arquitectura sigue las convenciones de Expo Router:

```text
app/
├── login.tsx          # Entry point de autenticación (Logica + UI)
├── _layout.tsx        # Root Layout con Auth Provider
├── (tabs)/            # Grupo de rutas protegidas
│   ├── index.tsx      # Dashboard principal (Lista de Tareas)
│   └── explore.tsx    # Vista secundaria
components/
├── ui/                # Componentes de presentación reutilizables
└── context/           # Lógica de negocio (AuthContext)
```

## 🚀 Instalación y Ejecución

1.  **Clonar el repositorio:**

    ```bash
    git clone <URL_DEL_REPO>
    cd taskflow-mobile
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install

    ```

3.  **Ejecutar la aplicación:**

    ```bash
    npx expo start
    ```

## 👤 Credenciales de Prueba

Para acceder a la aplicación en modo desarrollo, utilice los siguientes usuarios pre-configurados:

| Usuario   | Contraseña | Rol           |
| :-------- | :--------- | :------------ |
| **User**  | `1234`     | Estándar      |
| **Admin** | `admin`    | Administrador |

## 🤝 Colaboradores

- **[Diego Toledo, Mario Díaz, Javier Vidal]:** Arquitectura base, configuración de Expo Router y lógica de Contexto. Refactorización de UI/UX en Dashboard, optimización de listas (FlatList) y documentación técnica.

---
