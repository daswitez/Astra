# Astra — Backlog Completo
### Proyecto: AS | Metodología: Scrum | Board: Astra

---

## ÉPICAS

| ID | Épica | Descripción | Estado |
|---|---|---|---|
| AS-E1 | Autenticación y Acceso | Registro, login, sesiones y seguridad | ✅ Completado |
| AS-E2 | Onboarding y Workspace | Creación y unión a organizaciones | ✅ Completado |
| AS-E3 | Team Board (Kanban) | Gestión de tareas con drag & drop | ✅ Completado |
| AS-E4 | Team Chat | Mensajería en tiempo real por workspace | ✅ Completado |
| AS-E5 | Files & Assets | Subida y gestión de archivos compartidos | ✅ Completado |
| AS-E6 | Flowcharts | Diagramas de flujo integrados | ✅ Completado |
| AS-E7 | Whiteboard / Brainstorming | Canvas infinito para ideación | 🔄 En progreso |
| AS-E8 | AI Omnibar | Búsqueda y comandos con IA | 📋 Backlog |
| AS-E9 | Flow Mode / Pomodoro | Modo de trabajo profundo con temporizador | 📋 Backlog |
| AS-E10 | Analytics DORA + SPACE | Métricas de productividad de equipo | 📋 Backlog |
| AS-E11 | Notificaciones y Menciones | Alertas en tiempo real y @menciones | 📋 Backlog |
| AS-E12 | Infraestructura y DevOps | CI/CD, testing, monitoreo | 🔄 En progreso |

---

## SPRINT 1 — Fundación (Completado ✅)

### AS-E1 · Autenticación y Acceso

---

**AS-1 · Página de registro con email y contraseña**
- Tipo: Story | Puntos: 3 | Prioridad: Alta
- **Como** usuario nuevo **quiero** registrarme con email y contraseña **para** acceder a Astra sin necesidad de confirmación de email.
- **Criterios de aceptación:**
  - [ ] Formulario con campos email y contraseña
  - [ ] El usuario se crea confirmado automáticamente (sin email de confirmación)
  - [ ] Redirige a /onboarding tras el registro exitoso
  - [ ] Muestra error si el email ya existe
- **Estado:** ✅ Completado

---

**AS-2 · Página de login con email y contraseña**
- Tipo: Story | Puntos: 2 | Prioridad: Alta
- **Como** usuario existente **quiero** iniciar sesión con mis credenciales **para** acceder a mi workspace.
- **Criterios de aceptación:**
  - [ ] Formulario con email y contraseña
  - [ ] Redirige a /onboarding si tiene sesión activa
  - [ ] Muestra error de credenciales inválidas
  - [ ] Link a /register para usuarios nuevos
- **Estado:** ✅ Completado

---

**AS-3 · Cerrar sesión**
- Tipo: Task | Puntos: 1 | Prioridad: Alta
- **Como** usuario **quiero** cerrar sesión **para** proteger mi cuenta en dispositivos compartidos.
- **Criterios de aceptación:**
  - [ ] Botón de sign out en el menú de perfil
  - [ ] Redirige a /login al cerrar sesión
  - [ ] Invalida la sesión en el servidor
- **Estado:** ✅ Completado

---

**AS-4 · Registro sin email de confirmación (auto-confirm)**
- Tipo: Task | Puntos: 2 | Prioridad: Alta
- **Como** desarrollador **quiero** que los usuarios se creen ya confirmados **para** evitar la fricción del email de confirmación durante el MVP.
- **Criterios de aceptación:**
  - [ ] Usar Supabase Service Role Key para `admin.auth.admin.createUser`
  - [ ] Parámetro `email_confirm: true` en la creación
  - [ ] No se envía email al usuario
- **Estado:** ✅ Completado

---

### AS-E2 · Onboarding y Workspace

**AS-5 · Pantalla de onboarding — crear organización**
- Tipo: Story | Puntos: 3 | Prioridad: Alta
- **Como** usuario nuevo **quiero** crear mi organización **para** tener mi propio workspace de equipo.
- **Criterios de aceptación:**
  - [ ] Input para nombre de empresa
  - [ ] Llama a función RPC `create_company_workspace`
  - [ ] Genera código de invitación único de 6 caracteres
  - [ ] Redirige a /app con el org ID como query param
- **Estado:** ✅ Completado

---

**AS-6 · Pantalla de onboarding — unirse a organización**
- Tipo: Story | Puntos: 2 | Prioridad: Alta
- **Como** usuario nuevo **quiero** unirme a una organización existente con un código **para** colaborar con mi equipo.
- **Criterios de aceptación:**
  - [ ] Input de código de 6 caracteres (mayúsculas)
  - [ ] Llama a función RPC `join_organization_by_code`
  - [ ] Error si el código no existe
  - [ ] Redirige a /app del workspace unido
- **Estado:** ✅ Completado

---

**AS-7 · Multi-organización — cambiar entre workspaces**
- Tipo: Story | Puntos: 2 | Prioridad: Media
- **Como** usuario miembro de varias organizaciones **quiero** cambiar entre ellas **para** gestionar múltiples equipos desde una sola cuenta.
- **Criterios de aceptación:**
  - [ ] Menú de perfil lista todas las organizaciones del usuario
  - [ ] Click en organización cambia el workspace activo
  - [ ] Organización activa aparece resaltada
  - [ ] Código de invitación visible junto a cada org
- **Estado:** ✅ Completado

---

**AS-8 · Crear organización adicional desde el perfil**
- Tipo: Story | Puntos: 1 | Prioridad: Media
- **Como** usuario **quiero** crear otra organización desde mi perfil **para** gestionar múltiples empresas o proyectos.
- **Criterios de aceptación:**
  - [ ] Formulario de "Create another company" en el menú de perfil
  - [ ] Funciona igual que el onboarding inicial
- **Estado:** ✅ Completado

---

## SPRINT 2 — Core Features (Completado ✅)

### AS-E3 · Team Board (Kanban)

**AS-9 · Vista Kanban con columnas de estado**
- Tipo: Story | Puntos: 5 | Prioridad: Alta
- **Como** miembro del equipo **quiero** ver las tareas organizadas por estado **para** tener visibilidad del progreso del equipo.
- **Criterios de aceptación:**
  - [ ] 4 columnas: To Do, In Progress, Review, Done
  - [ ] Cada columna muestra el conteo de tareas
  - [ ] Las tareas muestran título, descripción (preview) y prioridad
  - [ ] Columna vacía muestra estado placeholder
- **Estado:** ✅ Completado

---

**AS-10 · Crear tarea desde modal overlay**
- Tipo: Story | Puntos: 3 | Prioridad: Alta
- **Como** miembro del equipo **quiero** crear tareas con título, descripción y prioridad **para** registrar trabajo pendiente.
- **Criterios de aceptación:**
  - [ ] Modal con campos: título (requerido), descripción, prioridad
  - [ ] Prioridad con radio buttons: Low, Medium (default), High
  - [ ] La tarea aparece en el board sin recargar la página
  - [ ] Input se limpia al cerrar el modal
- **Estado:** ✅ Completado

---

**AS-11 · Drag & drop para cambiar estado de tarea**
- Tipo: Story | Puntos: 5 | Prioridad: Alta
- **Como** miembro del equipo **quiero** arrastrar tareas entre columnas **para** actualizar su estado de forma rápida e intuitiva.
- **Criterios de aceptación:**
  - [ ] Arrastar más de 8px activa el drag
  - [ ] Columna destino resalta al pasar por encima
  - [ ] Actualización optimista: el cambio se ve inmediatamente
  - [ ] Sincronización con la DB en background sin recargar
  - [ ] DragOverlay muestra la tarjeta con rotación durante el drag
- **Estado:** ✅ Completado

---

**AS-12 · Modal de detalle de tarea**
- Tipo: Story | Puntos: 3 | Prioridad: Alta
- **Como** miembro del equipo **quiero** ver los detalles completos de una tarea **para** entender su contexto y estado.
- **Criterios de aceptación:**
  - [ ] Click en tarjeta abre modal de detalle
  - [ ] Muestra: título, descripción completa, badge de prioridad, badge de estado
  - [ ] Botón de cerrar (X) y click en backdrop cierran el modal
  - [ ] Animación de entrada/salida fluida
- **Estado:** ✅ Completado

---

**AS-13 · Eliminar tarea con confirmación en 2 pasos**
- Tipo: Story | Puntos: 2 | Prioridad: Alta
- **Como** miembro del equipo **quiero** eliminar tareas con confirmación **para** evitar borrados accidentales.
- **Criterios de aceptación:**
  - [ ] Botón "Delete task" en el modal de detalle
  - [ ] Primer click muestra "Delete this task? Yes, delete / Cancel"
  - [ ] Segundo click elimina y cierra el modal sin recargar
  - [ ] Estado "Deleting..." durante la operación
- **Estado:** ✅ Completado

---

**AS-14 · Badges de prioridad en tarjetas**
- Tipo: Task | Puntos: 1 | Prioridad: Media
- **Criterios de aceptación:**
  - [ ] High: rojo | Medium: ámbar | Low: azul
  - [ ] Badge visible en la tarjeta y en el modal de detalle
- **Estado:** ✅ Completado

---

**AS-15 · Columna Done con estilo completado**
- Tipo: Task | Puntos: 1 | Prioridad: Media
- **Criterios de aceptación:**
  - [ ] Columna tono morado
  - [ ] Tareas con texto tachado e ícono de check morado
- **Estado:** ✅ Completado

---

### AS-E4 · Team Chat

**AS-16 · Vista de mensajes del canal**
- Tipo: Story | Puntos: 3 | Prioridad: Alta
- **Como** miembro del equipo **quiero** ver el historial de mensajes del canal **para** estar al día con la comunicación del equipo.
- **Criterios de aceptación:**
  - [ ] Lista de mensajes con avatar, nombre, hora y cuerpo
  - [ ] Auto-scroll al último mensaje al cargar
  - [ ] Estado vacío: "No messages yet. Start the conversation."
  - [ ] Últimos 20 mensajes cargados desde el servidor
- **Estado:** ✅ Completado

---

**AS-17 · Enviar mensajes sin recargar la página**
- Tipo: Story | Puntos: 3 | Prioridad: Alta
- **Como** miembro del equipo **quiero** enviar mensajes y verlos aparecer instantáneamente **para** tener una experiencia de chat fluida.
- **Criterios de aceptación:**
  - [ ] Input en la parte inferior del chat
  - [ ] Enter o botón de envío manda el mensaje
  - [ ] Input se limpia automáticamente tras enviar
  - [ ] No recarga la página — usa useTransition + router.refresh()
  - [ ] Botón pulsa/anima durante el envío
- **Estado:** ✅ Completado

---

**AS-18 · Mensajes en tiempo real con Supabase Realtime**
- Tipo: Story | Puntos: 5 | Prioridad: Alta
- **Como** miembro del equipo **quiero** que los mensajes de mis compañeros aparezcan automáticamente **para** no tener que recargar la página para ver novedades.
- **Criterios de aceptación:**
  - [ ] Suscripción a INSERT en tabla messages filtrado por channel_id
  - [ ] Nuevo mensaje dispara router.refresh() automáticamente
  - [ ] La suscripción se activa al entrar al chat y se limpia al salir
  - [ ] Auto-scroll al recibir nuevo mensaje
- **Estado:** ✅ Completado

---

## SPRINT 3 — Files & Navegación (Completado ✅)

### AS-E5 · Files & Assets

**AS-19 · Subir imágenes y PDFs al workspace**
- Tipo: Story | Puntos: 5 | Prioridad: Alta
- **Como** miembro del equipo **quiero** subir archivos al workspace **para** compartir recursos con mi equipo.
- **Criterios de aceptación:**
  - [ ] Área de drag & drop con estado visual al arrastrar
  - [ ] Click para abrir el selector de archivos
  - [ ] Soporta: imágenes (PNG, JPG, GIF, WebP) y PDFs
  - [ ] Upload directo a Supabase Storage (bucket workspace-files)
  - [ ] Metadatos guardados en tabla workspace_files
  - [ ] Estado "Uploading..." durante la subida
- **Estado:** ✅ Completado

---

**AS-20 · Galería de archivos del workspace**
- Tipo: Story | Puntos: 3 | Prioridad: Alta
- **Como** miembro del equipo **quiero** ver todos los archivos subidos **para** acceder a los recursos compartidos fácilmente.
- **Criterios de aceptación:**
  - [ ] Grid responsive: 2 cols móvil, 3 cols tablet, 4 cols desktop
  - [ ] Imágenes: miniatura cuadrada con object-cover
  - [ ] PDFs: ícono de documento con etiqueta "PDF"
  - [ ] Nombre del archivo y fecha de subida bajo cada card
  - [ ] Click abre el archivo en nueva pestaña
- **Estado:** ✅ Completado

---

**AS-21 · Eliminar archivo propio**
- Tipo: Story | Puntos: 2 | Prioridad: Media
- **Como** miembro del equipo **quiero** eliminar archivos que subí **para** mantener el workspace organizado.
- **Criterios de aceptación:**
  - [ ] Botón de eliminar visible al hover sobre la card
  - [ ] Elimina de Supabase Storage y de la tabla workspace_files
  - [ ] Card desaparece sin recargar la página
  - [ ] Solo el uploader puede eliminar su propio archivo (RLS)
- **Estado:** ✅ Completado

---

**AS-22 · Seguridad RLS en archivos**
- Tipo: Task | Puntos: 2 | Prioridad: Alta
- **Criterios de aceptación:**
  - [ ] Solo miembros del workspace ven los archivos (SELECT policy)
  - [ ] Solo miembros pueden subir archivos (INSERT policy)
  - [ ] Solo el uploader puede eliminar sus archivos (DELETE policy)
  - [ ] Políticas en storage.objects para el bucket workspace-files
- **Estado:** ✅ Completado

---

**AS-23 · Card "Files & Assets" en el Home Hub**
- Tipo: Task | Puntos: 1 | Prioridad: Media
- **Criterios de aceptación:**
  - [ ] Muestra el conteo de archivos del workspace
  - [ ] Color teal, ícono FolderOpen
  - [ ] Click navega a la vista de files
- **Estado:** ✅ Completado

---

### Navegación y UX Global

**AS-24 · Navegación entre vistas sin recargar**
- Tipo: Story | Puntos: 2 | Prioridad: Alta
- **Como** usuario **quiero** navegar entre Chat, Board y Files **para** acceder a todas las herramientas del workspace.
- **Criterios de aceptación:**
  - [ ] Tab Bar con: ← (volver) | Chat | Board | Files
  - [ ] Visible en todas las vistas excepto Home
  - [ ] Flecha ← lleva de vuelta al Home Hub
  - [ ] Vista activa resaltada en el tab
- **Estado:** ✅ Completado

---

**AS-25 · Home Hub con grid de herramientas**
- Tipo: Story | Puntos: 3 | Prioridad: Alta
- **Como** usuario **quiero** ver todas las herramientas disponibles al entrar **para** navegar rápidamente al área que necesito.
- **Criterios de aceptación:**
  - [ ] Grid 3 columnas: Team Board, Flowcharts, Files & Assets, Brainstorming, Team Chat
  - [ ] Cada card muestra: ícono, título, descripción y meta (conteo o acción)
  - [ ] Animaciones hover con glow de color
  - [ ] Responsive: 2 cols en móvil, 3 en desktop
- **Estado:** ✅ Completado

---

**AS-26 · Loading screen al entrar a la app**
- Tipo: Task | Puntos: 1 | Prioridad: Baja
- **Criterios de aceptación:**
  - [ ] Pantalla de carga con ícono Sparkles y barra de progreso
  - [ ] Duración: 1.2 segundos con animación de salida blur
  - [ ] Texto: "Initializing Spatial OS"
- **Estado:** ✅ Completado

---

**AS-27 · OmniBar de búsqueda (⌘K)**
- Tipo: Story | Puntos: 2 | Prioridad: Media
- **Criterios de aceptación:**
  - [ ] Abre con Cmd+K / Ctrl+K
  - [ ] Cierra con ESC
  - [ ] Overlay con blur del fondo
  - [ ] Input de búsqueda con autoFocus
  - [ ] Sugerencias estáticas (base para AI)
- **Estado:** ✅ Completado (UI base)

---

**AS-28 · Suprimir error de hidratación por extensiones del browser**
- Tipo: Bug | Puntos: 1 | Prioridad: Alta
- **Criterios de aceptación:**
  - [ ] `suppressHydrationWarning` en el elemento `<body>`
  - [ ] No aparece error de hidratación por Grammarly u otras extensiones
- **Estado:** ✅ Completado

---

## SPRINT 4 — Backlog (Próximo)

### AS-E8 · AI Omnibar

**AS-29 · Búsqueda semántica por workspace**
- Tipo: Story | Puntos: 8 | Prioridad: Alta
- **Como** usuario **quiero** buscar tareas, mensajes y archivos con lenguaje natural **para** encontrar información rápidamente.
- **Criterios de aceptación:**
  - [ ] Input de búsqueda en OmniBar funcional
  - [ ] Resultados de tareas, mensajes y archivos
  - [ ] Integración con Claude API para búsqueda semántica
  - [ ] Resultados en menos de 500ms
- **Estado:** 📋 Backlog

---

**AS-30 · Crear tareas desde el OmniBar con lenguaje natural**
- Tipo: Story | Puntos: 5 | Prioridad: Media
- **Como** usuario **quiero** escribir "crear tarea: revisar diseño de login" **para** crear tareas sin abrir el modal.
- **Estado:** 📋 Backlog

---

**AS-31 · Resumir el workspace activo con IA**
- Tipo: Story | Puntos: 5 | Prioridad: Media
- **Como** usuario **quiero** pedir un resumen del estado del workspace **para** ponerme al día rápidamente.
- **Estado:** 📋 Backlog

---

### AS-E9 · Flow Mode / Pomodoro

**AS-32 · Temporizador Pomodoro completo**
- Tipo: Story | Puntos: 5 | Prioridad: Media
- **Como** usuario **quiero** iniciar un Pomodoro de 25 minutos con la tarea activa **para** mantenerme enfocado.
- **Criterios de aceptación:**
  - [ ] Temporizador cuenta regresiva real (no estático)
  - [ ] Play / Pause funcionales
  - [ ] Notificación al terminar el ciclo
  - [ ] Animación del círculo SVG sincronizada con el tiempo
- **Estado:** 📋 Backlog

---

**AS-33 · Marcar tarea como completada desde Flow Mode**
- Tipo: Story | Puntos: 3 | Prioridad: Media
- **Criterios de aceptación:**
  - [ ] Botón "Complete Task" funcional en Flow Mode
  - [ ] Mueve la tarea a Done en el board
  - [ ] Sale del Flow Mode automáticamente
- **Estado:** 📋 Backlog

---

**AS-34 · Sonidos ambientes en Flow Mode**
- Tipo: Story | Puntos: 2 | Prioridad: Baja
- **Criterios de aceptación:**
  - [ ] Botón de volumen abre selector de sonido
  - [ ] Opciones: lluvia, café, blanco, silencio
  - [ ] Persiste preferencia en localStorage
- **Estado:** 📋 Backlog

---

### AS-E10 · Analytics DORA + SPACE

**AS-35 · Dashboard de métricas de productividad**
- Tipo: Epic Task | Puntos: 13 | Prioridad: Media
- **Métricas DORA:**
  - [ ] Deployment Frequency (tareas completadas por sprint)
  - [ ] Lead Time (tiempo promedio de To Do a Done)
  - [ ] Change Failure Rate (tareas regresadas a revisión)
  - [ ] Mean Time to Recovery
- **Métricas SPACE:**
  - [ ] Satisfaction (NPS interno)
  - [ ] Performance (tareas completadas vs planificadas)
  - [ ] Activity (mensajes, commits, archivos subidos)
  - [ ] Communication (participación en canales)
  - [ ] Efficiency (tiempo en cada columna Kanban)
- **Estado:** 📋 Backlog

---

### AS-E11 · Notificaciones y Menciones

**AS-36 · @menciones en mensajes de chat**
- Tipo: Story | Puntos: 5 | Prioridad: Media
- **Criterios de aceptación:**
  - [ ] Escribir @ muestra lista de miembros del workspace
  - [ ] Mensaje con mención resalta el nombre del usuario
  - [ ] Notificación al usuario mencionado
- **Estado:** 📋 Backlog

---

**AS-37 · Comentarios en tareas**
- Tipo: Story | Puntos: 5 | Prioridad: Media
- **Criterios de aceptación:**
  - [ ] Sección de comentarios en el modal de detalle de tarea
  - [ ] Input para añadir comentario
  - [ ] Lista de comentarios con autor y timestamp
  - [ ] Conteo de comentarios visible en la tarjeta del board
- **Estado:** 📋 Backlog

---

**AS-38 · Notificaciones en tiempo real**
- Tipo: Story | Puntos: 8 | Prioridad: Media
- **Criterios de aceptación:**
  - [ ] Badge de notificaciones en el header
  - [ ] Notificación al ser mencionado
  - [ ] Notificación al asignarte una tarea
  - [ ] Panel de notificaciones con historial
- **Estado:** 📋 Backlog

---

### AS-E12 · Infraestructura

**AS-39 · Tests E2E con Playwright**
- Tipo: Task | Puntos: 8 | Prioridad: Alta
- **Criterios de aceptación:**
  - [ ] Test: registro → onboarding → crear tarea → drag → eliminar
  - [ ] Test: enviar mensaje → aparece en realtime
  - [ ] Test: subir archivo → aparece en galería
  - [ ] CI/CD con GitHub Actions
- **Estado:** 📋 Backlog

---

**AS-40 · Configurar CI/CD con GitHub Actions**
- Tipo: Task | Puntos: 3 | Prioridad: Alta
- **Criterios de aceptación:**
  - [ ] Pipeline en cada PR: lint + typecheck + build
  - [ ] Deploy automático a Vercel en merge a main
  - [ ] Variables de entorno en GitHub Secrets
- **Estado:** 📋 Backlog

---

**AS-41 · Dominio propio y deploy en producción**
- Tipo: Task | Puntos: 2 | Prioridad: Alta
- **Criterios de aceptación:**
  - [ ] Deploy en Vercel con dominio astrapp.io (o similar)
  - [ ] SSL automático
  - [ ] Variables de entorno de producción configuradas
- **Estado:** 📋 Backlog

---

**AS-42 · Rate limiting y protección de endpoints**
- Tipo: Task | Puntos: 3 | Prioridad: Media
- **Criterios de aceptación:**
  - [ ] Rate limit en registro: máx 5 por IP por hora
  - [ ] Rate limit en login: máx 10 intentos por 15 min
  - [ ] Middleware de protección en rutas /app
- **Estado:** 📋 Backlog

---

## RESUMEN DE VELOCIDAD

| Sprint | Stories | Puntos | Estado |
|---|---|---|---|
| Sprint 1 — Fundación | 8 | 16 | ✅ Completado |
| Sprint 2 — Core Features | 12 | 34 | ✅ Completado |
| Sprint 3 — Files & Nav | 10 | 21 | ✅ Completado |
| Sprint 4 — AI & Analytics | 14 | 68 | 📋 Planificado |
| **Total** | **44** | **139** | |

---

## DEFINICIÓN DE DONE (DoD)

Para que una historia se considere completada debe cumplir:
- [ ] Funcionalidad implementada según criterios de aceptación
- [ ] Sin errores de TypeScript (`npx tsc --noEmit` limpio)
- [ ] RLS configurado si involucra datos de usuario
- [ ] No hay `redirect()` en server actions que muten datos (usar `revalidatePath` + `router.refresh()`)
- [ ] UI probada manualmente en el flujo principal
- [ ] Sin regresiones en otras features

---

*Generado el 18/06/2026 · Proyecto AS · Astra Productivity OS*
