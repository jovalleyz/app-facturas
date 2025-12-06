DOCUMENTO DE REQUERIMIENTOS DE USUARIO (URS)
Proyecto: App PWA de Lectura Inteligente de Facturas con IA
Versión: 1.2 (Actualizado)
1. Resumen Ejecutivo

La aplicación permite capturar o cargar fotos de facturas dominicanas, extraer datos mediante IA, validarlos y almacenarlos en Firebase. Los usuarios pueden registrarse con email y contraseña y manejar facturas personales, así como colaborar con otros usuarios con permisos limitados.

La experiencia debe ser altamente intuitiva, atractiva, rápida (≤3 clics) y funcionar tanto en web como PWA.
Incluye una pantalla de bienvenida post-registro y un footer institucional.

2. Objetivos del Proyecto
Objetivos principales

Digitalizar facturas mediante captura/carga.

Extraer datos relevantes mediante IA con precisión.

Guardar facturas en Firebase por usuario.

Permitir colaboración visual-limitada entre usuarios.

Mostrar estadísticas claras.

Entregar una experiencia visual moderna y fluida.

Objetivos secundarios

Reducir correcciones con aprendizaje automático.

Facilitar la instalación y uso frecuente como PWA.

3. Alcance
Dentro del alcance

Registro/login con email, contraseña y confirmación.

Base de datos en Firebase (Auth, Firestore, Storage).

Captura, lectura y validación de facturas.

Colaboración entre usuarios vía invitaciones por correo.

Control de permisos: ver/descargar pero NO editar.

PWA instalable con ícono.

Pantalla de bienvenida.

Footer institucional.

Botón para descargar la app en entornos compatibles.

Dashboard y estadísticas.

Exportación CSV.

Menú inferior móvil.

Fuera del alcance

Integraciones tributarias DGII.

Facturación electrónica.

Procesos contables complejos.

4. Perfiles de Usuario
Usuario individual

Registra facturas personales.

Usuario colaborador

Puede visualizar y descargar facturas de otro usuario que le otorgó acceso.

Usuario principal con colaboradores

Invita a otros para revisar, auditar o administrar datos sin editar.

5. Requerimientos Funcionales (MoSCoW)
MUST HAVE
RF-01. Registro y autenticación (Firebase)

Registro con email, contraseña y confirmación.

Validación de contraseñas fuertes.

Inicio de sesión con email/contraseña.

Mantenimiento de sesión con Firebase Auth.

Al completar registro, debe aparecer una pantalla de bienvenida y luego dirigir a la aplicación.

RF-02. Captura o carga de factura

Solicitar permisos de cámara en móviles.

Capturar foto desde la PWA.

Subir imágenes desde archivos.

RF-03. Lectura automática mediante IA

Extraer automáticamente:

Fecha (DD/MM/AAAA)

Hora (si existe)

Monto neto

ITBIS 18%

Propina 10%

Otros impuestos 16%

Nombre del negocio

RNC

NCF (Comprobantes Fiscales)

Siempre comienzan con B + código (ej.: B01, B02).

e-CF / eCF (Factura electrónica)

Comienzan con E + tipo (ej.: E31, E32).

Mostrar los datos detectados para validación previa.

Permitir correcciones antes de guardar.

RF-04. Almacenamiento en Firebase

Guardar datos de la factura en una colección única del usuario.

Guardar la imagen en Firebase Storage y almacenar su URL.

Los valores monetarios deben guardarse como decimales en DOP.

RF-05. Sistema de colaboradores

El usuario podrá agregar colaboradores ingresando su email.

Un colaborador tendrá permisos para:

Ver facturas

Descargar facturas

Ver estadísticas compartidas
pero NO editar ni eliminar facturas.

Los colaboradores aparecerán en la sección "Colaboradores agregados" dentro del perfil.

Un usuario colaborador verá en su perfil una sección llamada:
"Soy colaborador de…" con la lista de usuarios que le han dado acceso.

Cada acceso debe ser revocable por el usuario principal.

RF-06. Dashboard de estadísticas

Totales de gastos.

Totales por categorías.

Totales por impuestos.

Filtros por fechas.

RF-07. Descarga de datos

Permitir descarga de CSV UTF-8.

Permitir descarga de facturas individuales como PDF (opcional).

RF-08. Instalación PWA

Debe ofrecer instalación cuando se abra desde móvil compatible.

Debe tener ícono relacionado a la app (ej. símbolo de factura/IA).

Incluir splash screen e integración estándar PWA.

Debajo del formulario de registro debe existir un botón:
“Descargar la App”
(visibile solo cuando el dispositivo soporte instalación).

RF-09. Menú inferior móvil

Capturar factura

Historial

Estadísticas

Configuración

RF-10. Footer institucional

En todas las pantallas principales debe aparecer un footer con:
“OVM Easy Apps. Todos los derechos reservados.”

Debe incluir un texto-link:
“Contáctanos”
que abra:

https://wa.me/18295341802?text=Estoy%20usando%20la%20aplicación%20FacturIA,%20me%20encanta%20y%20me%20gustaría%20que%20me%20ayudes%20con%20un%20proyecto%20que%20tengo

SHOULD HAVE

Categoría sugerida automáticamente.

Notificaciones (Web Push) para procesamiento terminado.

Modo oscuro.

COULD HAVE

Exportación global a PDF.

WON’T HAVE

Integraciones con DGII.

Facturación electrónica.

Módulos de contabilidad.

6. Requerimientos No Funcionales
Rendimiento

Procesamiento IA ≤ 3 segundos.

Dashboard ≤ 2 segundos.

Usabilidad

3 clics para tareas principales (máx. 4).

Flujo intuitivo para usuarios no técnicos.

Seguridad

Firestore Rules: acceso solo al owner o colaborador con permisos de lectura.

HTTPS obligatorio.

Compatibilidad

Chrome, Safari, Firefox, Edge.

PWA instalable en Android y iOS.

7. Flujos de Usuario
Flujo 1: Registro

Ingreso de email, contraseña, confirmación.

Validación y creación en Firebase.

Mostrar pantalla de bienvenida.

Redirigir al dashboard.

Flujo 2: Agregar colaborador

Usuario abre Configuración → Colaboradores.

Ingresa email.

Sistema envía invitación automática y registra permiso.

El colaborador ve nueva sección “Soy colaborador de…”.

Flujo 3: Capturar/Procesar factura

Capturar o subir imagen.

IA procesa.

Usuario valida y guarda.

Factura se almacena en Firestore.

8. Arquitectura de Información

Inicio

Registro / Login

Pantalla de Bienvenida

Capturar Factura

Validación

Historial

Estadísticas

Configuración

Perfil

Colaboradores

Soy colaborador de…

Footer institucional

9. UI/UX
Estilo

Minimalista y fintech.

Tipografía: Inter / Poppins / Roboto.

Colores sugeridos:

Primario: #4E73DF

Secundario: #1CC88A

Fondo: #F8F9FC

Texto: #5A5C69

Reglas

Botón primario grande para “Capturar Factura”.

Pantalla de bienvenida simple, con texto motivador y botón “Comenzar”.

Footer siempre visible en pantallas principales.

Ícono PWA relacionado a facturas/IA.

10. Integraciones y Dependencias Técnicas

Firebase Auth

Firebase Firestore

Firebase Storage

IA (OCR + modelo de extracción)

Service Worker PWA

Manifest.json

11. Criterios de Aceptación

Colaboradores deben poder ver y descargar pero no modificar.

Pantalla de bienvenida debe mostrarse exactamente una vez tras el registro.

Instalación PWA debe funcionar en Android e iOS.

Footer debe aparecer en toda pantalla principal.

IA debe identificar correctamente ≥ 95% de los NCF y e-CF.

12. Supuestos y Restricciones
Supuestos

Formato de fecha de factura: DD/MM/AAAA.

Usuarios tienen conexión estable al capturar imágenes.

Restricciones

No hay edición para colaboradores.

IA depende de la calidad de la imagen capturada.

✔️ Documento actualizado y listo.

Si quieres, te genero ahora:

📌 La versión en Markdown (.md) para Vibe Coding
📌 Historias de usuario completas (para Trello/Jira)
📌 Modelo de base de datos (Firestore)
📌 Flujos visuales (wireframes textuales)

Solo dime cuál quieres.

Dijiste:
si genera el .md por ahora
ChatGPT dijo:

Perfecto, Jonathan.
Aquí tienes el documento completo en formato .md, limpio, sin explicaciones extras, listo para pegar directamente en Vibe Coding.

📄 DOCUMENTO DE REQUERIMIENTOS DE USUARIO (URS)
Proyecto: App PWA de Lectura Inteligente de Facturas con IA
Versión: 1.2
1. Resumen Ejecutivo

La aplicación permitirá capturar o subir fotos de facturas dominicanas, extraer datos mediante IA, validarlos y almacenarlos en Firebase.
El usuario se registrará mediante email y contraseña.
La app soportará colaboración entre usuarios, estadísticas de gastos y funcionará como PWA con instalación opcional.

2. Objetivos del Proyecto
Objetivos principales

Digitalizar facturas por captura o carga de imagen.

Extraer datos relevantes mediante IA con alta precisión.

Guardar facturas y datos en Firebase.

Permitir colaboración entre usuarios con permisos de solo visualización.

Mostrar dashboards y estadísticas.

Entregar una experiencia rápida, intuitiva y moderna.

Objetivos secundarios

Reducir correcciones mediante aprendizaje automático.

Impulsar uso frecuente gracias a instalación PWA.

3. Alcance
Dentro del alcance

Registro/login con email y contraseña.

Base de datos en Firebase (Auth, Firestore, Storage).

Captura de factura con cámara o carga desde archivos.

Lectura automática de datos vía IA.

Validación antes de guardar.

Colaboración entre usuarios mediante invitaciones por email.

PWA instalable con ícono.

Pantalla de bienvenida post-registro.

Footer institucional con enlace a WhatsApp.

Botón para descargar la app donde aplique.

Dashboard y estadísticas.

Exportación CSV.

Menú inferior móvil.

Fuera del alcance

Integración con DGII.

Facturación electrónica.

Funciones contables avanzadas.

4. Perfiles de Usuario
Usuario individual

Registra y gestiona sus propias facturas.

Usuario colaborador

Puede visualizar y descargar facturas de otro usuario, pero no editarlas.

Usuario principal con colaboradores

Puede invitar a terceros a visualizar su información.

5. Requerimientos Funcionales (MoSCoW)
MUST HAVE
RF-01. Registro y autenticación

Registro con email, contraseña y confirmación.

Validación de contraseñas fuertes.

Inicio de sesión mediante Firebase Auth.

Al completar el registro, mostrar una pantalla de bienvenida y luego dirigir a la app.

RF-02. Captura o carga de factura

Solicitar permisos de cámara en móviles.

Capturar foto desde la PWA.

Subir imágenes desde archivos o galería.

RF-03. Lectura automática mediante IA

Extraer automáticamente:

Fecha (DD/MM/AAAA)

Hora (si aplica)

Monto neto

ITBIS 18%

Propina legal 10%

Otros impuestos 16%

Nombre del negocio

RNC

NCF (comienza con B: B01, B02…)

e-CF/eCF (comienza con E: E31, E32…)

Mostrar datos detectados para validación.

Permitir corrección manual antes de guardar.

RF-04. Almacenamiento en Firebase

Guardar factura y sus datos en Firestore.

Guardar imagen en Firebase Storage.

Guardar valores monetarios como decimales en DOP.

RF-05. Sistema de colaboradores

Usuario puede agregar colaboradores ingresando email.

Colaborador puede:

Visualizar facturas

Descargar facturas

Ver estadísticas

No puede editar ni eliminar nada.

En el perfil del usuario principal aparecerá la lista de colaboradores agregados.

En el perfil del colaborador aparecerá la sección “Soy colaborador de…”.

El usuario principal podrá revocar accesos en cualquier momento.

RF-06. Dashboard de estadísticas

Totales de gastos.

Totales por categorías.

Totales por impuestos.

Filtros por fecha.

RF-07. Descarga de datos

Descarga de CSV en formato UTF-8.

RF-08. Instalación PWA

La app deberá ofrecer instalarse en móviles compatibles.

Debe tener un ícono representativo de facturas/IA.

Debe incluir splash screen.

Debajo del registro debe aparecer un botón “Descargar la app” cuando aplique.

RF-09. Menú inferior móvil

Capturar factura

Historial

Estadísticas

Configuración

RF-10. Footer institucional

Debe aparecer en pantallas principales:
“OVM Easy Apps. Todos los derechos reservados.”

Incluir el link “Contáctanos” que apunte a:

https://wa.me/18295341802?text=Estoy%20usando%20la%20aplicación%20FacturIA,%20me%20encanta%20y%20me%20gustaría%20que%20me%20ayudes%20con%20un%20proyecto%20que%20tengo

SHOULD HAVE

Sugerencia automática de categoría de gasto.

Notificaciones Web Push.

Modo oscuro.

COULD HAVE

Exportación global a PDF.

WON’T HAVE

Integración con DGII.

Facturación electrónica.

Módulos contables complejos.

6. Requerimientos No Funcionales
Rendimiento

Procesamiento IA ≤ 3 segundos.

Dashboard ≤ 2 segundos.

Usabilidad

Máximo 3 clics para acciones principales (4 como límite).

Interfaz clara, moderna, accesible.

Seguridad

Firestore Rules: acceso solo a owner y colaboradores con permisos.

HTTPS obligatorio.

Compatibilidad

Chrome, Safari, Edge, Firefox.

Instalación PWA en Android y iOS.

7. Flujos de Usuario
Flujo 1: Registro

Usuario ingresa email, contraseña y confirmación.

Sistema valida y crea cuenta en Firebase.

Aparece pantalla de bienvenida.

Usuario entra al dashboard.

Flujo 2: Agregar colaborador

Usuario va a Configuración → Colaboradores.

Ingresa email.

Sistema asigna permisos.

Colaborador ve nueva sección “Soy colaborador de…”.

Flujo 3: Captura y guardado de factura

Usuario captura o sube imagen.

IA procesa datos.

Usuario valida.

Sistema guarda en Firestore y Storage.

8. Arquitectura de Información

Inicio

Registro/Login

Pantalla Bienvenida

Capturar Factura

Validación

Historial

Estadísticas

Configuración

Perfil

Colaboradores

Soy colaborador de…

Footer institucional

9. UI/UX

Estilo minimalista, moderno, tipo fintech.

Tipografías recomendadas: Inter, Poppins, Roboto.

Colores sugeridos:

Primario: #4E73DF

Secundario: #1CC88A

Fondo: #F8F9FC

Texto: #5A5C69

Botón grande “Capturar Factura”.

Pantalla de bienvenida simple y clara.

Footer siempre visible en pantallas principales.

10. Integraciones y Dependencias Técnicas

Firebase Auth

Firebase Firestore

Firebase Storage

OCR + modelo de extracción IA

PWA (Service Worker y manifest.json)

11. Criterios de Aceptación

IA reconoce NCF/e-CF con ≥95% precisión.

Colaboradores pueden ver y descargar, pero no editar.

Pantalla de bienvenida aparece solo al primer login tras registro.

PWA instalable correctamente.

Footer visible en todas las pantallas principales.

CSV exportado correctamente en UTF-8.

12. Supuestos y Restricciones
Supuestos

Formato de fecha en factura: DD/MM/AAAA.

Usuario cuenta con conexión a internet al procesar imágenes.

Restricciones

IA depende de calidad de imagen.

No existe edición para colaboradores.