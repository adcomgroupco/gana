# GANA — Documentos de pauta 2026

Mini-landing con los documentos web de medios pagos de Gana. Alineado con el sistema de diseño de [Cesde](https://github.com/DanielAdcom98/Cesde): Poppins, amarillo `#FFC000` sobre negro `#111`, tarjetas grises con borde de acento y los mismos componentes de timeline y tabla.

## URLs (GitHub Pages)
- **Inicio:** `/index.html`
- **Resumen ejecutivo:** `/resumen.html`
- **Línea de tiempo de pauta:** `/linea-de-tiempo.html`

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
resumen.html
linea-de-tiempo.html
```

## Los dos documentos

Mismos datos, dos niveles de lectura. Ambos enlazan al otro desde la portada.

| | `resumen.html` | `linea-de-tiempo.html` |
|---|---|---|
| **Para quién** | Cliente, dirección, cualquiera fuera del equipo de pauta | Equipo de medios |
| **Grano** | 4 meses, 5 momentos clave | 15 semanas, acción por acción con fecha |
| **Lenguaje** | Sin tecnicismos, con glosario al final | Nomenclatura real de campañas y conjuntos |
| **Cifras** | Inversión por canal y costo por registro por mes | Cada cambio de presupuesto con valor anterior y nuevo |

La línea de tiempo incluye filtros por medio para validar la tendencia semanal de registros y CPA, un funnel mensual de impresiones, alcance, clics y registros, y aprendizajes separados por canal. Las etapas que una fuente no reporta se muestran como «No disponible», no como cero.

## Línea de tiempo de pauta (abr–jul 2026)

Reconstrucción semana a semana (S17 a S31) de las acciones de pauta de Placa Millonaria, filtrada exclusivamente por campañas cuyo nombre contiene «Placa».

| Canal | Cuenta | Ventana | Inversión |
|---|---|---|---|
| Meta | CP_GANA (`act_1078955982538777`) | 20 abr — 29 may | $10.852.063 |
| TikTok | Adcom - Gana (`7579726724026187783`) | 7 may — 26 jul | $55.000.000 |
| Programática | — | 29 abr — 10 jun | $39.281.712 |
| DOOH Medellín | — | 28 abr — 31 may | $30.041.597 |

### Fuentes
- **Meta:** registro de actividad de la cuenta (2.374 eventos, 15 abr — 27 jul) e insights diarios a nivel de campaña y anuncio, vía Marketing API.
- **TikTok:** Business API — campañas, conjuntos, anuncios y reportes diarios.
- **Programática y DOOH:** `GANA _ Fuente de Data.xlsx`, hojas `Entrega` y `DOOH`.

### Convención de marcas
- **Punto lleno:** acción verificada en el registro de la plataforma, con fecha.
- **Punto hueco y texto en cursiva gris:** semana sin registro específico de cambios. Se describe la gestión estándar que corresponde al momento del plan, no un hecho documentado.

### Alcance de las cifras de Meta
Los $10,9 M de Meta corresponden solo a campañas cuyo nombre contiene «Placa». El mismo criterio se aplica a TikTok, Programática y DOOH; se excluyen las demás líneas de la cuenta CP_GANA.

## Cliente
**Gana** · Grupo Réditos Digital · esteban@adcom.group
