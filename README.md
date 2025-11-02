# Informe del Proyecto: Pantalla de Login con Autenticación

Este proyecto corresponde a una implementación de pantalla de login y navegación inicial en una aplicación desarrollada con **React Native** y **Expo Router**. La mayor parte del sistema fue realizada siguiendo las instrucciones del profesor, con algunas adaptaciones para resolver problemas prácticos encontrados durante el desarrollo.

## Estructura del Proyecto

La organización de archivos sigue la convención de rutas basada en archivos de `expo-router`. Las carpetas principales relacionadas con la funcionalidad de login son:

app/
├── login.tsx # Pantalla de inicio de sesión
├── \_layout.tsx # Navegación principal envuelta por AuthProvider
├── (tabs)/ # Pantallas accesibles sólo después de login
│ ├── index.tsx # Pantalla principal
│ ├── explore.tsx # Segunda pestaña
│ └── \_layout.tsx # Layout de pestañas
components/
└── context/
└── auth-context.tsx # Lógica de autenticación con React Context

## Autenticación

Se implementó un sistema de autenticación básico mediante `React Context`. Este permite:

- Validar credenciales a partir de un arreglo de usuarios estáticos (`EXPECTED_USERS`).
- Exponer al usuario actual mediante `user`.
- Funciones `login(username, password)` y `logout()` accesibles en toda la app.

### Usuarios esperados (hardcoded)

```ts
const EXPECTED_USERS = [
  { id: "1", name: "User", password: "1234" },
  { id: "2", name: "Admin", password: "admin" },
];


Lógica del login

La función login() fue modificada para retornar un valor booleano, lo que permite controlar si el usuario puede avanzar a la vista principal. Esto permite que la navegación ocurra sólo si las credenciales son correctas.

const success = login(userName, password);

if (success) {
  router.replace("/(tabs)");
} else {
  Alert.alert("Login Failed", "Invalid username or password");
}

Problemas enfrentados y soluciones

1. Acceso sin validar credenciales

Problema: Al llamar a login(), el usuario era redirigido a la pantalla principal aun si las credenciales eran incorrectas.

Solución: Se modificó login() para que retorne un valor booleano (true si las credenciales son válidas, false si no lo son). Luego, en el LoginScreen, se evalúa este resultado antes de redirigir.

⸻

2. Doble alerta al fallar login

Problema: Una vez arreglada la transición, al fallar el login, se mostraban dos alertas: una en el componente login.tsx y otra en la función login() del contexto.

Solución: Se comentó la alerta dentro de la función login() y se dejó el control de la alerta únicamente en el componente login.tsx.

⸻

3. No redirige a /login al iniciar

Problema: A pesar de usar unstable_settings.anchor = "login" en el layout global, el comportamiento no era consistente en todos los dispositivos (por ejemplo, en iPhone se accedía directo a /index). Se intentó cambiar el app.json para cambiar el entry point, sin resultado.

Solución: Se utilizó un useEffect() en index.tsx para redirigir manualmente al login si no hay usuario autenticado (eliminado por ahora por generar otros problemas):

useEffect(() => {
  if (!user) {
    router.replace("/login");
  }
}, [user]);

Esto asegura que el sistema siempre redirige a /login si no hay sesión iniciada.

Estado Actual del Sistema
	•	Login validado contra usuarios predefinidos.
	•	Navegación protegida: no es posible acceder a /(tabs) si no se ha iniciado sesión.
	•	Logout funcional, redirige correctamente a la pantalla de login.
	•	Estructura modular y clara, con separación entre contexto, pantallas y navegación.

Créditos

Este desarrollo fue basado en las clases del profesor, incorporando algunos ajustes adicionales para solucionar problemas prácticos no previstos en la estructura inicial, principalmente relacionados con navegación condicional y control de flujo según el estado de autenticación.

El informe fue desarrollado usando IA para mejorar el orden y redacción del mismo.

```
