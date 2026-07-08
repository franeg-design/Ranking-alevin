# Ranking Alevín Femenino — guía rápida

Una web que funciona como app. Las familias abren un enlace, le dan a
"Añadir a pantalla de inicio" y les queda un icono en el móvil.

## Qué hay en la carpeta
- `index.html` — la app (no se toca).
- `data.csv` — **el único archivo que actualizas tú** tras cada competición.
- `manifest.json`, `sw.js`, `icons/` — para que se comporte como app (no se tocan).

---

## 1) Publicarla la primera vez (una sola vez)

### Opción A — Netlify Drop (la más fácil)
1. Entra en https://app.netlify.com/drop
2. Arrastra **la carpeta entera** a la ventana.
3. Te da una dirección `https://algo.netlify.app`. Ese es el enlace que repartes.
   (Puedes crear cuenta gratis para renombrarlo, p. ej. `ranking-alevin-alava.netlify.app`.)

### Opción B — GitHub Pages
1. Crea un repositorio y sube todos los archivos.
2. Settings → Pages → Deploy from branch → `main` / `root`.
3. Te da un enlace `https://usuario.github.io/repo`.

En ambos casos el enlace es **https**, que es lo que necesitan los móviles para
instalarla en la pantalla de inicio.

---

## 2) Que las familias la "instalen"
- **iPhone (Safari):** abrir el enlace → botón Compartir → "Añadir a pantalla de inicio".
- **Android (Chrome):** abrir el enlace → menú ⋮ → "Añadir a pantalla de inicio" / "Instalar app".

---

## 3) Actualizar tras cada competición
Solo cambias **`data.csv`**:
- **Netlify Drop:** vuelve a https://app.netlify.com/drop y arrastra la carpeta otra vez
  (o, con cuenta, arrastra solo el `data.csv` nuevo). En segundos está actualizado para todos.
- **GitHub Pages:** entra en el repo → `data.csv` → editar/subir el nuevo → *Commit*.

No hace falta reinstalar nada en los móviles: la app coge los datos nuevos sola.

---

## Formato de `data.csv`
Columnas exactas (una fila por marca):

```
Prueba,Nadadora,Año,Club,Tiempo,Fecha,Competicion,PuntosFINA
50 Libre,"ARAICO QUINTANA, Sara",2013,CN Judizmendi,31.54,2026-06-14,Cto Álava Verano,
100 Libre,"EGUIDON VARGAS, Maren",2013,CN Menditxo,1:08.97,2026-06-14,Cto Álava Verano,
```

- **Año:** año de nacimiento (2013 o 2014). **Es necesario** para calcular la diferencia con la mínima (cambia según el año).
- **Nadadora:** si el nombre lleva coma (`APELLIDOS, Nombre`), va entre comillas.
- **Tiempo:** `31.54` (pruebas de 50) o `1:08.97` (con minutos).
- **Fecha:** `AAAA-MM-DD` (ordena bien y permite calcular la mejora).
- **PuntosFINA:** opcional (puedes dejarlo en blanco).

### Mínimas (columna de diferencia)
La app trae las mínimas de **Campeonato de España Alevín (Tabla "B", P25)** y de
**Euskal Herria (P25)**, por prueba y año. Con el selector de arriba eliges cuál ver.
Junto a cada marca aparece: **−X.XX ✓** si ya tiene la mínima (y por cuánto), o
**+X.XX** lo que le falta por bajar. Van dentro de `index.html`; si cambian las
mínimas de una temporada, se actualizan ahí (o me lo pides y lo hago yo).

### Importante para la "mejora" ▼
La app calcula sola la **mejor marca personal (MMP)** y **cuánto ha bajado**.
Para ello necesita el histórico: **añade las filas nuevas, no borres las viejas.**
Si en la última competición una nadadora baja su marca, su fila muestra en verde
la mejora (p. ej. `▼ 0.48 s`).

> ¿No quieres editar el CSV a mano? Pásame los resultados (o el PDF de la
> competición) y te devuelvo el `data.csv` actualizado y listo para reemplazar.

---

## Categorías (pestañas)
Arriba hay tres pestañas: **Alevín** (todas juntas), **2013** y **2014**. Al elegir
un año, el ranking se recalcula solo con esas nadadoras y las posiciones se renumeran.
(En la temporada 2025/26, 2013 = 13 años y 2014 = 12 años.)

## Analítica de tráfico (opcional, sin cookies)
La app ya trae preparado **Cloudflare Web Analytics** (gratis y sin cookies, así evitas
el banner de consentimiento). Para activarlo:
1. Entra en https://dash.cloudflare.com → **Web Analytics** → *Add a site*.
2. Pon la URL donde publiques (p. ej. `tu-sitio.netlify.app`). Te dará un **token**.
3. En `index.html`, busca `TU_TOKEN_CLOUDFLARE` y pégalo ahí. Vuelve a subir el archivo.

Sin token no pasa nada (no recoge datos). Si no lo quieres, puedes borrar esas líneas.
Alternativas similares: Umami o Plausible. Evita Google Analytics si no quieres lidiar
con cookies y RGPD.

## Nota
Los iconos son un diseño provisional; se pueden cambiar por el escudo del club o
lo que quieras (mismos nombres de archivo en `icons/`).
