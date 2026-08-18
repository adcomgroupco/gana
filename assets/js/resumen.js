/* Inversión por mes y canal · Gana Abr–Jul 2026
   Fuente: V13 Master Flow Placa Millonaria, hoja "151M Full Performance". */

const MESES = [
  { nombre: 'Abril',  nota: 'Abr S4',        meta: 178489,  tiktok: 0,        programatica: 2163095,  dooh: 5183400,  otros: 0       },
  { nombre: 'Mayo',   nota: 'May S1–S5',     meta: 9341855, tiktok: 7235902,  programatica: 33306165, dooh: 24858197, otros: 0       },
  { nombre: 'Junio',  nota: 'Jun S1–S4',     meta: 279331,  tiktok: 30041378, programatica: 3812452,  dooh: 0,        otros: 3600000 },
  { nombre: 'Julio',  nota: 'Jul S1–S4',     meta: 0,       tiktok: 17721825, programatica: 0,        dooh: 0,        otros: 0       }
];

const SERIES = ['meta', 'tiktok', 'programatica', 'dooh', 'otros'];
const ALTO = 180; // px, igual que .stack en resumen.css

const compacto = n => '$' + (n / 1e6).toFixed(1).replace('.', ',') + ' M';

function pintarMeses() {
  const cont = document.getElementById('meses');
  if (!cont) return;

  const totales = MESES.map(m => SERIES.reduce((a, s) => a + m[s], 0));
  const maximo = Math.max(...totales);

  MESES.forEach((mes, i) => {
    const card = document.createElement('article');
    card.className = 'mes-card';

    const titulo = document.createElement('h4');
    titulo.textContent = mes.nombre;
    card.appendChild(titulo);

    const total = document.createElement('div');
    total.className = 'mes-total';
    total.textContent = compacto(totales[i]);
    card.appendChild(total);

    const stack = document.createElement('div');
    stack.className = 'stack';
    stack.setAttribute('role', 'img');
    stack.setAttribute('aria-label',
      mes.nombre + ': ' + SERIES.filter(s => mes[s])
        .map(s => s + ' ' + compacto(mes[s])).join(', '));

    // Descuenta los separadores de 2px para que el mes más alto no se salga del alto fijo.
    const activas = SERIES.filter(s => mes[s]);
    const disponible = ALTO - Math.max(0, activas.length - 1) * 2;

    // De arriba hacia abajo para que el orden de la leyenda se mantenga.
    activas.forEach(serie => {
      const seg = document.createElement('span');
      seg.className = serie;
      seg.style.height = (mes[serie] / maximo * disponible) + 'px';
      seg.title = mes.nombre + ' · ' + serie + ' · ' + compacto(mes[serie]);
      stack.appendChild(seg);
    });

    card.appendChild(stack);

    const nota = document.createElement('p');
    nota.className = 'mes-nota';
    nota.textContent = mes.nota;
    card.appendChild(nota);

    cont.appendChild(card);
  });
}

pintarMeses();
