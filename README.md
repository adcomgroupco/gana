# GANA — Documentos de pauta 2026

Mini-landing con los documentos web de medios pagos de Gana. Alineado con el sistema de diseño de [Cesde](https://github.com/DanielAdcom98/cesde): Poppins, amarillo `#FFC000` sobre negro `#111`, tarjetas grises con borde de acento y los mismos componentes de timeline y tabla.

## URLs (GitHub Pages)
- **Inicio:** `/index.html`
- **Resumen ejecutivo:** `/campanas/placa-millonaria-resumen.html`
- **Línea de tiempo de pauta:** `/campanas/placa-millonaria.html`
- **Capítulo de gestión ATL:** `/campanas/placa-millonaria-atl.html`
- **Informe Final Gana-Oriente:** `/campanas/oriente.html`

## Estructura
```
assets/
  css/
    index.css              ← estilos landing principal
    resumen.css            ← estilos resumen ejecutivo
    linea-de-tiempo.css    ← estilos documento de línea de tiempo
  js/
    resumen.js             ← inversión por mes, barras apiladas verticales
    linea-de-tiempo.js     ← datos semanales, barras apiladas y tabla
index.html
campanas/placa-millonaria-resumen.html
campanas/placa-millonaria.html
campanas/placa-millonaria-atl.html
```

## Los dos documentos

Mismos datos, dos niveles de lectura. Ambos enlazan al otro desde la portada.

| | `campanas/placa-millonaria-resumen.html` | `campanas/placa-millonaria.html` |
|---|---|---|
| **Para quién** | Cliente, dirección, cualquiera fuera del equipo de pauta | Equipo de medios |
| **Grano** | 4 meses, 5 momentos clave | 15 semanas, acción por acción con fecha |
| **Lenguaje** | Sin tecnicismos, con glosario al final | Nomenclatura real de campañas y conjuntos |
| **Cifras** | Inversión por canal y costo por registro por mes | Cada cambio de presupuesto con valor anterior y nuevo |

La línea de tiempo incluye filtros por medio para validar la tendencia semanal de registros y CPA, un funnel mensual de impresiones, alcance, clics y registros, y aprendizajes separados por canal. Las etapas que una fuente no reporta se muestran como «No disponible», no como cero.

## Línea de tiempo de pauta (abr–jul 2026)

Reconstrucción semana a semana (S17 a S31) de las acciones de pauta de Placa Millonaria. La inversión se toma del flow y los resultados/acciones, de las fuentes de plataforma.

| Canal | Cuenta | Ventana | Inversión |
|---|---|---|---|
| Meta | CP_GANA (`act_1078955982538777`) | Abr S4 — Jun S3 | $9.799.675 |
| TikTok | Adcom - Gana (`7579726724026187783`) | May S2 — Jul S4 | $54.999.105 |
| Programática | — | 29 abr — 10 jun | $39.281.712 |
| DOOH Medellín | — | 28 abr — 31 may | $30.041.597 |
| UGC + Llamadas IA | — | Jun S3 | $3.600.000 |
| **Total invertido** | | | **$137.722.089** |

### Fuentes
- **Inversión:** `V13 Master Flow Placa Millonaria`, hoja `151M Full Performance`.
- **Meta:** registro de actividad de la cuenta (2.374 eventos, 15 abr — 27 jul) e insights diarios a nivel de campaña y anuncio, vía Marketing API.
- **TikTok:** Business API — campañas, conjuntos, anuncios y reportes diarios.
- **Programática y DOOH:** `GANA _ Fuente de Data.xlsx`, hojas `Entrega` y `DOOH`.

### Convención de marcas
- **Punto lleno:** acción verificada en el registro de la plataforma, con fecha.
- **Punto hueco y texto en cursiva gris:** semana sin registro específico de cambios. Se describe la gestión estándar que corresponde al momento del plan, no un hecho documentado.

### Alcance de las cifras de inversión
La fuente única de inversión es `V13 Master Flow Placa Millonaria`, hoja `151M Full Performance`: $137.722.089 distribuidos y $13.277.911 de reserva sobre el plan de $151.000.000. Las APIs y archivos de entrega se conservan como fuente de resultados y actividad operativa.

## Cliente
**Gana** · Grupo Réditos Digital · esteban@adcom.group


## Organización de documentos

La portada es [index.html](index.html). Cada carpeta agrupa un tema. Los nombres
usan minúsculas, guiones y fechas `AAAA-MM` o `AAAA-MM-DD` cuando distinguen cortes.
El nombre del cliente vive en el repositorio y no se repite en cada URL.
Los títulos de la portada y de cada documento usan el mismo nombre.

Los HTML en las rutas anteriores solo redirigen para conservar enlaces compartidos,
incluidos sus parámetros y secciones. Los documentos nuevos se guardan en las
carpetas temáticas y se enlazan desde la portada.

| Documento | Ruta |
|---|---|
| [Avance de pauta](informes/avance.html) | `informes/avance.html` |
| [Resultados acumulados](informes/acumulado.html) | `informes/acumulado.html` |
| [Objetivos por campaña](informes/objetivos.html) | `informes/objetivos.html` |
| [Resultados de pauta · Octubre 2026](informes/2026-10.html) | `informes/2026-10.html` |
| [Resultados de pauta · Septiembre 2026](informes/2026-09.html) | `informes/2026-09.html` |
| [Resultados de Gana Ara](campanas/ara.html) | `campanas/ara.html` |
| [Resultados de Gana Oriente](campanas/oriente.html) | `campanas/oriente.html` |
| [Resultados de Gana Keno · Octubre 2026](campanas/keno-2026-10.html) | `campanas/keno-2026-10.html` |
| [Placa Millonaria · Resumen](campanas/placa-millonaria-resumen.html) | `campanas/placa-millonaria-resumen.html` |
| [Placa Millonaria · Historial](campanas/placa-millonaria.html) | `campanas/placa-millonaria.html` |
| [Placa Millonaria · Versión para imprimir](campanas/placa-millonaria-imprimir.html) | `campanas/placa-millonaria-imprimir.html` |
| [Placa Millonaria · Televisión y radio](campanas/placa-millonaria-atl.html) | `campanas/placa-millonaria-atl.html` |
| [Plan de medios · 2026](planes/medios-2026.html) | `planes/medios-2026.html` |
| [Presupuesto · Septiembre y octubre 2026](planes/presupuesto-2026-09-a-10.html) | `planes/presupuesto-2026-09-a-10.html` |
| [Avance de pauta · 1 septiembre 2026](historico/avance-2026-09-01.html) | `historico/avance-2026-09-01.html` |
| [Resultados acumulados · 14 septiembre 2026](historico/acumulado-2026-09-14.html) | `historico/acumulado-2026-09-14.html` |
| [Resultados de septiembre 2026 · Borrador](historico/mensual/borrador-2026-09.html) | `historico/mensual/borrador-2026-09.html` |
| [Resultados de septiembre 2026 · Gana y Loti](historico/mensual/resultados-2026-09.html) | `historico/mensual/resultados-2026-09.html` |
| [Seguimiento semanal de Gana](reporte-semanal-meta/index.html) | `reporte-semanal-meta/index.html` |
| [Seguimiento semanal de Loti](reporte-semanal-loti/index.html) | `reporte-semanal-loti/index.html` |
