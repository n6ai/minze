import './style.css'

const app = document.querySelector<HTMLDivElement>('#app') ?? null

if (app) {
  app.innerHTML = `
    <h1 style="text-align: center;">Hello Minze!</h1>
  `
}
