/* Inversión semanal por canal · Gana Abr–Jul 2026
   Fuentes: Meta Marketing API (act_1078955982538777), TikTok Business API
   (advertiser 7579726724026187783) y "GANA _ Fuente de Data.xlsx". */

const SEMANAS = [
  ['S17', '20–26 abr',    15250465,         0,         0,        0],
  ['S18', '27 abr–3 may',  8743378,         0,   8505288,  6621360],
  ['S19', '4–10 may',      9034248,    286487,   3421050,  7363200],
  ['S20', '11–17 may',    11419692,    617025,   2137379,  5720451],
  ['S21', '18–24 may',     6118063,   2229186,   3836521,  4876876],
  ['S22', '25–31 may',    12832999,   4103204,  17569022,  5459710],
  ['S23', '1–7 jun',             0,   4680945,   2757935,        0],
  ['S24', '8–14 jun',            0,   4561477,   1054517,        0],
  ['S25', '15–21 jun',           0,   5994913,         0,        0],
  ['S26', '22–28 jun',           0,  11574329,         0,        0],
  ['S27', '29 jun–5 jul',        0,  10952434,         0,        0],
  ['S28', '6–12 jul',            0,   4070445,         0,        0],
  ['S29', '13–19 jul',           0,   3790446,         0,        0],
  ['S30', '20–26 jul',           0,   2139109,         0,        0],
  ['S31', '27 jul',              0,         0,         0,        0]
];

const CANALES = [
  { nombre: 'Meta',         clase: 'meta' },
  { nombre: 'TikTok',       clase: 'tiktok' },
  { nombre: 'Programática', clase: 'programatica' },
  { nombre: 'DOOH',         clase: 'dooh' }
];

const cop = n => '$' + n.toLocaleString('es-CO');
const compacto = n => n === 0 ? '—' : '$' + (n / 1e6).toFixed(1).replace('.', ',') + ' M';

function pintarGrafico() {
  const cont = document.getElementById('bar-list');
  const tip = document.getElementById('chart-tip');
  if (!cont) return;

  const maximo = Math.max(...SEMANAS.map(s => s[2] + s[3] + s[4] + s[5]));

  SEMANAS.forEach(s => {
    const total = s[2] + s[3] + s[4] + s[5];

    const fila = document.createElement('div');
    fila.className = 'bar-row' + (total === 0 ? ' vacia' : '');

    const etiqueta = document.createElement('div');
    etiqueta.className = 'bar-label';
    etiqueta.textContent = s[0] + ' · ' + s[1];
    fila.appendChild(etiqueta);

    const caja = document.createElement('div');
    const track = document.createElement('div');
    track.className = 'bar-track';
    track.style.width = total === 0 ? '3px' : (total / maximo * 100) + '%';

    CANALES.forEach((canal, i) => {
      const valor = s[2 + i];
      if (!valor) return;

      const seg = document.createElement('div');
      seg.className = 'bar-seg ' + canal.clase;
      seg.style.flex = valor;
      seg.tabIndex = 0;
      seg.setAttribute('role', 'img');
      seg.setAttribute('aria-label', s[0] + ' ' + canal.nombre + ' ' + cop(valor));

      const mostrar = e => {
        tip.textContent = s[0] + ' · ' + canal.nombre + ' · ' + cop(valor);
        tip.style.opacity = '1';
        const r = seg.getBoundingClientRect();
        const x = e.clientX || (r.left + r.width / 2);
        tip.style.left = Math.min(x + 14, window.innerWidth - tip.offsetWidth - 14) + 'px';
        tip.style.top = (r.top - 36) + 'px';
      };
      const ocultar = () => { tip.style.opacity = '0'; };

      seg.addEventListener('mousemove', mostrar);
      seg.addEventListener('focus', mostrar);
      seg.addEventListener('mouseleave', ocultar);
      seg.addEventListener('blur', ocultar);
      track.appendChild(seg);
    });

    caja.appendChild(track);
    fila.appendChild(caja);

    const tot = document.createElement('div');
    tot.className = 'bar-total';
    tot.textContent = compacto(total);
    fila.appendChild(tot);

    cont.appendChild(fila);
  });
}

function pintarTabla() {
  const tbody = document.querySelector('#tabla-semanal tbody');
  const tfoot = document.querySelector('#tabla-semanal tfoot');
  if (!tbody) return;

  SEMANAS.forEach(s => {
    const total = s[2] + s[3] + s[4] + s[5];
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>' + s[0] + ' · ' + s[1] + '</td>' +
      [s[2], s[3], s[4], s[5], total].map(v => '<td>' + (v ? cop(v) : '—') + '</td>').join('');
    tbody.appendChild(tr);
  });

  const totales = [2, 3, 4, 5].map(i => SEMANAS.reduce((a, s) => a + s[i], 0));
  const tr = document.createElement('tr');
  tr.innerHTML = '<td>Total</td>' +
    totales.concat([totales.reduce((a, b) => a + b, 0)]).map(v => '<td>' + cop(v) + '</td>').join('');
  tfoot.appendChild(tr);
}

pintarGrafico();
pintarTabla();
