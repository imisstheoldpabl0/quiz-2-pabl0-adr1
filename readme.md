# Quiz II - Adr1 y Pabl0

Este proyecto consiste en un Quiz que hace uso de JavaScript para crear una Single Page Application que permita logear a usuarios con Firebase y que guarden sus partidas, además de visualizar sus estadísticas en un gráfico.

## Preview

!["Captura de pantalla de la página de inicio (registro y login de usuarios)."](./assets/images/Screenshot%202024-03-14%20at%2012.43.42.png)

## Table of Contents

- [Acerca de](#acerca-de)
- [Cómo usarlo](#como-usarlo)
- [Uso](#uso)
- [Tecnologías](#tecnologías)
- [Licencia](#licencia)

## Acerca de

En el Quiz II, se hace un fetch a una API que genera preguntas aleatorias para después pintarlas en el DOM a través de JavaScript.

## Cómo usarlo

Para jugar al Quiz II sigue estos pasos:

1. Clona este repositorio a tu máquina local:

   ```bash
   git clone https://github.com/imisstheoldpabl0/quiz-2-pabl0-adr1
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd quiz-2-pabl0-adr1
   ```
3. Abre el archivo `index.html` en tu navegador para visualizar la aplicación web.

## Uso

Una vez abierta la aplicación web, te deberás registrar con un email y contraseña en el panel izquierdo. Una vez registrado, se te logeará automáticamente en el sistema, y lo podrás comprobar si tu email aparece en la parte superior de la página. Si ya tienes cuenta, simplemente deberás de hacer login con tus datos. Una vez iniciada sesión, podrás acceder al Quiz II haciendo click en el botón de jugar del panel derecho. Cuando hayas completado las 10 preguntas del quiz, se te presentarán 3 opciones:

- Otra partida: Podrás jugar de nuevo y almacenar tus resultados
- Mostrar gráfica: Visualizar gráficos con las estadísticas de tus partidas más recientes
- Log out: Volver a la página de inicio y deslogearte del sistema.

## Tecnologías

El Quiz II hace uso de las siguientes tecnologías:

- JavaScript (asincronía)
- ES6
- HTML
- CSS

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.