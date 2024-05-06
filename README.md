This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Cómo iniciar
Haga un clone de este repositorio usando:
`git clone https://github.com/Sakhurama/miclima`

Abra el proyecto en su editor de texto y en la terminal inicie el servidor de desarrollo usando:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Ingrese en su navegador a [http://localhost:3000](http://localhost:3000) para ver los resultados de la página.

## Cosa que debe saber para editarlo
☀️ Este proyecto consume información del clima de la API [OpenWeatherMap](https://openweathermap.org/api). Y usa una KEY de default, si desea cambiar la KEY debe ir a su proyecto en: `src/app/api/weather/route.ts`

💻 Para cambiar la estructura de la página o agregar nuevas funcionalidades debe hacerlo desde el archivo `src/app/page.tsx`

🎨 Si desea cambiar los estilos de este proyecto podrá hacerlo modificando el archivo `page.modules.css` que encontrará en la ruta: `src/app/styles/page.modules.css` la media query para estilizar la versión mobile podrá encontrarla en el mismo archivo apartir de la línea 181.

## Recursos utilizados
Para la funcionalidad y estetica de esta app se utilizaron diferentes herramientas de terceros que a continuación agradezco y explico su funcionalidad:

- [**OpenWeatherMap**](https://openweathermap.org/api) La Api del clima, ella nos provee la información del clima en todas las ciudades, ofrece muchos más datos. Para esta app se utilizó Temperatura (temp) - Humedad (humidity) - Sensación térmica (feels_like) - Nombre de la Ciudad (name) además se le cambió el lenguaje a Español.

- [**Weather Icons**](https://erikflowers.github.io/weather-icons/) Los iconos que usa la app han sido tomados del trabajo de Erik Flowers. Un diseño más minimalista y amigable que el proporcionado por la API.

- [**Loading.io**](https://loading.io/css) Nos ha proporcionado la animación de carga al inicio de la app, si se desea modificar podrá encontrar esta animación en  `src/app/styles/animation/loading.css`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
