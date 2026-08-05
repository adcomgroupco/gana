/* Inversión semanal por canal · Gana Abr–Jul 2026
   Fuentes: Meta Marketing API (act_1078955982538777), TikTok Business API
   (advertiser 7579726724026187783) y "GANA _ Fuente de Data.xlsx". */

const SEMANAS = [
  ['S17', '20–26 abr',      906638,         0,         0,        0],
  ['S18', '27 abr–3 may',   758219,         0,   8505288,  6621360],
  ['S19', '4–10 may',      1529746,    286487,   3421050,  7363200],
  ['S20', '11–17 may',     2458996,    617025,   2137379,  5720451],
  ['S21', '18–24 may',     2121431,   2229186,   3836521,  4876876],
  ['S22', '25–31 may',     3077033,   4103204,  17569022,  5459710],
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

/* Resultados de campañas cuyo nombre contiene "Placa". Los registros de Meta
   usan complete_registration; TikTok usa conversion. Programática y DOOH no
   reportan registros en el archivo fuente. */
const RESULTADOS_SEMANALES = [
  { semana:'S17', meta:{gasto:906638,registros:0},    tiktok:{gasto:0,registros:0} },
  { semana:'S18', meta:{gasto:758219,registros:326},  tiktok:{gasto:0,registros:0} },
  { semana:'S19', meta:{gasto:1529746,registros:758}, tiktok:{gasto:286487,registros:0} },
  { semana:'S20', meta:{gasto:2458996,registros:1066},tiktok:{gasto:617025,registros:351} },
  { semana:'S21', meta:{gasto:2121431,registros:820}, tiktok:{gasto:2229186,registros:1229} },
  { semana:'S22', meta:{gasto:3077033,registros:1089},tiktok:{gasto:4103204,registros:1023} },
  { semana:'S23', meta:{gasto:0,registros:5},         tiktok:{gasto:4680945,registros:777} },
  { semana:'S24', meta:{gasto:0,registros:0},         tiktok:{gasto:4561477,registros:936} },
  { semana:'S25', meta:{gasto:0,registros:0},         tiktok:{gasto:5994913,registros:896} },
  { semana:'S26', meta:{gasto:0,registros:0},         tiktok:{gasto:11574329,registros:1782} },
  { semana:'S27', meta:{gasto:0,registros:0},         tiktok:{gasto:10952434,registros:1232} },
  { semana:'S28', meta:{gasto:0,registros:0},         tiktok:{gasto:4070445,registros:1545} },
  { semana:'S29', meta:{gasto:0,registros:0},         tiktok:{gasto:3790446,registros:1322} },
  { semana:'S30', meta:{gasto:0,registros:0},         tiktok:{gasto:2139109,registros:753} },
  { semana:'S31', meta:{gasto:0,registros:0},         tiktok:{gasto:0,registros:0} }
];

const ALCANCE_SEMANAL = [
  {semana:'S17',programatica:{gasto:0,impresiones:0},dooh:{gasto:0,impresiones:0}},
  {semana:'S18',programatica:{gasto:8505288,impresiones:892062},dooh:{gasto:6621360,impresiones:55178}},
  {semana:'S19',programatica:{gasto:3421050,impresiones:243735},dooh:{gasto:7363200,impresiones:61360}},
  {semana:'S20',programatica:{gasto:2137379,impresiones:3038654},dooh:{gasto:5720451,impresiones:50942}},
  {semana:'S21',programatica:{gasto:3836521,impresiones:7784465},dooh:{gasto:4876876,impresiones:44134}},
  {semana:'S22',programatica:{gasto:17569022,impresiones:9447325},dooh:{gasto:5459710,impresiones:49299}},
  {semana:'S23',programatica:{gasto:2757935,impresiones:3755186},dooh:{gasto:0,impresiones:0}},
  {semana:'S24',programatica:{gasto:1054517,impresiones:1743605},dooh:{gasto:0,impresiones:0}},
  ...['S25','S26','S27','S28','S29','S30','S31'].map(semana=>({semana,programatica:{gasto:0,impresiones:0},dooh:{gasto:0,impresiones:0}}))
];

const FUNNEL_MENSUAL = {
  meta: {
    Abril:{impresiones:1165590,alcance:766131,clics:4131,registros:162},
    Mayo:{impresiones:2684080,alcance:1309520,clics:29666,registros:3897},
    Junio:{impresiones:0,alcance:0,clics:0,registros:5}
  },
  tiktok: {
    Mayo:{impresiones:3544206,alcance:684465,clics:12209,registros:2603},
    Junio:{impresiones:11703450,alcance:1511257,clics:31325,registros:4768},
    Julio:{impresiones:7660620,alcance:1476684,clics:22404,registros:4475}
  },
  programatica: {
    Abril:{impresiones:64077,alcance:50526,clics:149,registros:null},
    Mayo:{impresiones:21342164,alcance:10184343,clics:102219,registros:null},
    Junio:{impresiones:5498791,alcance:3398257,clics:22811,registros:null}
  },
  dooh: {
    Abril:{impresiones:43195,alcance:null,clics:null,registros:null},
    Mayo:{impresiones:217718,alcance:null,clics:null,registros:null}
  }
};

const FILTROS = [
  {id:'todos',nombre:'Todos'}, {id:'meta',nombre:'Meta'}, {id:'tiktok',nombre:'TikTok'},
  {id:'programatica',nombre:'Programática'}, {id:'dooh',nombre:'DOOH'}
];
const MESES_ORDEN = ['Abril','Mayo','Junio','Julio'];
const entero = n => Math.round(n).toLocaleString('es-CO');

function pintarFiltros(contenedor, activo, alCambiar) {
  contenedor.innerHTML = '';
  FILTROS.forEach(f => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'filter-btn' + (f.id === activo ? ' active' : '');
    b.textContent = f.nombre; b.setAttribute('aria-pressed', f.id === activo ? 'true' : 'false');
    b.addEventListener('click', () => alCambiar(f.id)); contenedor.appendChild(b);
  });
}

function serieTendencia(medio) {
  if (medio === 'programatica' || medio === 'dooh') return ALCANCE_SEMANAL.map(f => ({semana:f.semana,...f[medio]}));
  return RESULTADOS_SEMANALES.map(f => {
    if (medio === 'meta' || medio === 'tiktok') return {semana:f.semana,...f[medio]};
    if (medio === 'todos') return {semana:f.semana,gasto:f.meta.gasto+f.tiktok.gasto,registros:f.meta.registros+f.tiktok.registros};
    return {semana:f.semana,gasto:0,registros:0};
  });
}

function svgLinea(el, filas, campo, medio) {
  const valores = filas.map(f => campo === 'registros' ? f.registros : campo === 'impresiones' ? f.impresiones : campo === 'cpm' ? (f.impresiones && f.gasto ? f.gasto/f.impresiones*1000 : null) : (f.registros && f.gasto ? f.gasto/f.registros : null));
  const validos = valores.filter(v => v !== null && v > 0);
  if (!validos.length) { el.innerHTML = '<div class="chart-empty">Este medio no reporta registros; no es posible calcular la tendencia ni el CPA.</div>'; return; }
  const W=700,H=250,L=48,R=14,T=28,B=34,max=Math.max(...validos)*1.12;
  const x=i=>L+i*(W-L-R)/(filas.length-1), y=v=>H-B-(v/max)*(H-T-B);
  const esMoneda=campo==='cpa'||campo==='cpm';
  let grid=''; [0,.25,.5,.75,1].forEach(p=>{const yy=y(max*p);grid+=`<line class="chart-grid" x1="${L}" y1="${yy}" x2="${W-R}" y2="${yy}"/><text class="chart-axis" x="${L-7}" y="${yy+3}" text-anchor="end">${esMoneda?cop(Math.round(max*p)):entero(max*p)}</text>`;});
  let path='',points='',started=false;
  valores.forEach((v,i)=>{if(v===null||v<=0){started=false;return;} path+=(started?' L ':' M ')+x(i)+' '+y(v);started=true;const label=esMoneda?cop(Math.round(v)):entero(v);points+=`<circle class="chart-point ${medio==='tiktok'?'tiktok':''}" cx="${x(i)}" cy="${y(v)}" r="5"><title>${filas[i].semana}: ${label}</title></circle><text class="chart-value" x="${x(i)}" y="${Math.max(12,y(v)-9)}">${label}</text>`;});
  const labels=filas.map((f,i)=>`<text class="chart-axis" x="${x(i)}" y="${H-9}" text-anchor="middle">${f.semana}</text>`).join('');
  el.innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Tendencia semanal de ${campo}">${grid}<path class="chart-line ${medio==='tiktok'?'tiktok':''}" d="${path}"/>${points}${labels}</svg>`;
}

function iniciarTendencias() {
  const filtros=document.getElementById('trend-filters'); if(!filtros) return;
  let activo='todos';
  const render=()=>{
    pintarFiltros(filtros,activo,id=>{activo=id;render();});
    const filas=serieTendencia(activo), gasto=filas.reduce((a,f)=>a+(f.gasto||0),0), awareness=activo==='programatica'||activo==='dooh';
    const regs=filas.reduce((a,f)=>a+(f.registros||0),0), imps=filas.reduce((a,f)=>a+(f.impresiones||0),0);
    document.getElementById('trend-primary-title').textContent=awareness?'Impresiones':'Registros';
    document.getElementById('trend-secondary-title').textContent=awareness?'CPM':'CPA';
    svgLinea(document.getElementById('trend-reg-chart'),filas,awareness?'impresiones':'registros',activo);
    svgLinea(document.getElementById('trend-cpa-chart'),filas,awareness?'cpm':'cpa',activo);
    document.getElementById('trend-reg-total').textContent=awareness?entero(imps)+' impresiones':entero(regs)+' registros';
    document.getElementById('trend-cpa-total').textContent=awareness?(imps?cop(Math.round(gasto/imps*1000))+' CPM promedio':'Sin entrega'):(regs?cop(Math.round(gasto/regs))+' CPA promedio':'Sin registros');
    document.getElementById('trend-note').textContent=awareness?'Programática y DOOH se validan con impresiones y CPM porque sus fuentes no reportan registros.':activo==='todos'?'El total combina solo Meta y TikTok, los medios que reportan registros. La suma semanal de Meta puede variar levemente frente al consolidado mensual por la ventana de atribución.':'Registros y CPA reportados directamente por la API del medio.';
  }; render();
}

function datoMes(medio,mes) {
  if(medio!=='todos') return FUNNEL_MENSUAL[medio][mes] || null;
  const salida={impresiones:0,alcance:0,clics:0,registros:0}, disponibles={impresiones:false,alcance:false,clics:false,registros:false};
  ['meta','tiktok','programatica','dooh'].forEach(c=>{const d=FUNNEL_MENSUAL[c][mes];if(!d)return;Object.keys(salida).forEach(k=>{if(d[k]!==null){salida[k]+=d[k];disponibles[k]=true;}});});
  Object.keys(salida).forEach(k=>{if(!disponibles[k])salida[k]=null;}); return salida;
}

function iniciarFunnel() {
  const filtros=document.getElementById('funnel-filters'),cont=document.getElementById('funnel-months'); if(!filtros||!cont)return;
  let activo='todos';
  const render=()=>{
    pintarFiltros(filtros,activo,id=>{activo=id;render();}); cont.innerHTML='';
    MESES_ORDEN.forEach(mes=>{const d=datoMes(activo,mes),card=document.createElement('article');card.className='funnel-card';card.innerHTML='<h3>'+mes+'</h3>';
      if(!d){card.innerHTML+='<div class="chart-empty">Sin entrega</div>';cont.appendChild(card);return;}
      const disponibles=['impresiones','alcance','clics','registros'].filter(k=>d[k]!==null&&d[k]>0), logs=disponibles.map(k=>Math.log10(d[k]+1)), max=Math.max(...logs,1);
      ['impresiones','alcance','clics','registros'].forEach(k=>{const v=d[k],w=v===null?0:(Math.log10(v+1)/max*100);card.innerHTML+=`<div class="funnel-step"><div class="funnel-label"><span>${k}</span><strong class="${v===null?'funnel-na':''}">${v===null?'No disponible':entero(v)}</strong></div><div class="funnel-track"><div class="funnel-fill" style="width:${w}%"></div></div></div>`;});cont.appendChild(card);
    });
    const notas={todos:'Todos suma las métricas disponibles de cada medio; no implica atribución cruzada. Las barras usan escala logarítmica para que los clics y registros sean visibles.',meta:'Meta reporta alcance único y complete_registration. Los 5 registros de junio son conversiones atribuidas después del cierre, sin nueva inversión ni impresiones.',tiktok:'TikTok reporta reach y conversion desde Business API.',programatica:'El alcance es la suma del alcance diario reportado; no representa personas únicas del mes. La fuente no contiene registros.',dooh:'La fuente DOOH solo contiene impresiones e inversión; alcance, clics y registros no están disponibles.'};
    document.getElementById('funnel-note').textContent=notas[activo];
  }; render();
}

iniciarTendencias();
iniciarFunnel();

const PLAN_HEADERS = ['Medio','Abr S4','May S1','May S2','May S3','May S4','May S5','Jun S1','Jun S2','Jun S3','Jun S4','Jul S1','Jul S2','Jul S3','Jul S4','Total','Meta total','Reserva'];
const PLAN_PRESUPUESTO = [
  ['DOOH',5183400,1437960,7363200,5720451,4876876,5459710,null,null,null,null,null,null,null,null,30041597,30041597,0],
  ['Geofence',null,null,null,60136,47528,10387438,415417,null,null,null,null,null,null,null,10910519,10910519,0],
  ['App',null,6286850,1728004,882085,630267,5010756,null,null,null,null,null,null,null,null,14537962,14537962,0],
  ['Spotify',2163095,55343,1693046,null,null,null,null,null,null,null,null,null,null,null,3911484,3911484,0],
  ['Push',null,null,null,1195158,3158726,2170828,3397035,null,null,null,null,null,null,null,9921747,9921747,0],
  ['Meta',178489,154649,1529746,2458996,2121431,3077033,0,0,279331,0,0,0,0,0,9799675,18538095,8738420],
  ['Display',null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,0],
  ['TikTok',null,null,286487,617025,2229186,4103204,4680944,4561407,5994093,14804934,7721827,4070444,3790446,2139108,54999105,59538596,4539491],
  ['UGC',null,null,null,null,null,null,null,null,1600000,null,null,null,null,null,1600000,1600000,0],
  ['Llamadas IA',null,null,null,null,null,null,null,null,2000000,null,null,null,null,null,2000000,2000000,0],
  ['Total',7524984,7934802,12600483,10933851,13064014,30208969,8493396,4561407,9873424,14804934,7721827,4070444,3790446,2139108,137722089,151000000,13277911]
];
const PLAN_LEADS = [
  ['DOOH',null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],
  ['Geofence',null,null,null,null,null,58,null,null,null,null,null,null,null,null,58],
  ['App',null,null,null,null,4,7,null,null,null,null,null,null,null,null,11],
  ['Spotify',null,null,1,null,null,null,null,null,null,null,null,null,null,null,1],
  ['Push',null,null,null,null,35,37,null,null,null,null,null,null,null,null,72],
  ['Meta',162,164,758,1066,820,1089,0,0,79.808857,0,0,0,0,0,3976.808857],
  ['TikTok',null,null,null,162,1229,1012,1170.236,1140.35175,1498.52325,3701.2335,1930.45675,1762.030475,798.610091,654,14404.441815],
  ['Total',0,164,759,1228,2088,2203,1170.236,1140.35175,1578.332107,3701.2335,1930.45675,1762.030475,798.610091,654,18523.250673]
];

const COMPARA_MEDIOS = [
  {medio:'DOOH',plan:30041597,real:30041597,indicador:'Impresiones',leadsPlan:250000,leadsReal:260913},
  {medio:'App Targeting',plan:14537962,real:14537962,indicador:'Impresiones',leadsPlan:1750000,leadsReal:1913652},
  {medio:'Push',plan:9921747,real:9921747,indicador:'Impresiones',leadsPlan:20000000,leadsReal:21347532},
  {medio:'Spotify',plan:3911484,real:3911484,indicador:'Impresiones',leadsPlan:100000,leadsReal:80787},
  {medio:'Geofence',plan:10910519,real:10910519,indicador:'Impresiones',leadsPlan:3750000,leadsReal:3563061},
  {medio:'Meta',plan:18538095,real:10852063,indicador:'Registros',leadsPlan:4138.809,leadsReal:4064},
  {medio:'TikTok',plan:59538596,real:55000000,indicador:'Registros',leadsPlan:15058.442,leadsReal:11846},
  {medio:'UGC',plan:1600000,real:null,indicador:'Sin fuente',leadsPlan:null,leadsReal:null},
  {medio:'Llamadas IA',plan:2000000,real:null,indicador:'Sin fuente',leadsPlan:null,leadsReal:null},
  {medio:'Total presupuesto',plan:151000000,real:135175372,indicador:'Indicadores no sumables',leadsPlan:null,leadsReal:null}
];
const COMPARA_MESES = [
  {medio:'Abril',plan:7524984,real:8856703,indicador:'Registros Meta + TikTok',leadsPlan:162,leadsReal:162},
  {medio:'Mayo',plan:74742119,real:74742119,indicador:'Registros Meta + TikTok',leadsPlan:6300,leadsReal:6500},
  {medio:'Junio',plan:37733161,real:33854722,indicador:'Registros Meta + TikTok',leadsPlan:7590.153,leadsReal:4773},
  {medio:'Julio',plan:17721825,real:17721828,indicador:'Registros Meta + TikTok',leadsPlan:5145.097,leadsReal:4475},
  {medio:'Reserva sin distribuir',plan:13277911,real:null,indicador:'—',leadsPlan:null,leadsReal:null},
  {medio:'Total',plan:151000000,real:135175372,indicador:'Registros Meta + TikTok',leadsPlan:19197.251,leadsReal:15910}
];

function celdaPlan(v,tipo) {
  if(v===null||v===undefined||v==='') return '—';
  if(tipo==='presupuesto') return cop(Math.round(v));
  return Number(v).toLocaleString('es-CO',{maximumFractionDigits:1});
}
function tablaPlan(tipo) {
  const headers=tipo==='presupuesto'?PLAN_HEADERS:PLAN_HEADERS.slice(0,16);
  const rows=tipo==='presupuesto'?PLAN_PRESUPUESTO:PLAN_LEADS;
  return '<table><thead><tr>'+headers.map(h=>'<th>'+h+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map((v,i)=>'<td>'+(i?celdaPlan(v,tipo):v)+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
}
function cumplimiento(plan,real) { return plan&&real!==null?((real/plan)*100).toLocaleString('es-CO',{maximumFractionDigits:1})+'%':'No validable'; }
function tablaComparacion(rows) {
  const head=['Medio / mes','Presupuesto plan','Inversión real','Cumplimiento','Indicador','Meta de resultados','Resultado real','Cumplimiento'];
  return '<thead><tr>'+head.map(h=>'<th>'+h+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr><td>'+r.medio+'</td><td>'+celdaPlan(r.plan,'presupuesto')+'</td><td>'+celdaPlan(r.real,'presupuesto')+'</td><td>'+cumplimiento(r.plan,r.real)+'</td><td>'+r.indicador+'</td><td>'+celdaPlan(r.leadsPlan,'leads')+'</td><td>'+celdaPlan(r.leadsReal,'leads')+'</td><td>'+cumplimiento(r.leadsPlan,r.leadsReal)+'</td></tr>').join('')+'</tbody>';
}
function iniciarPlan() {
  const cont=document.getElementById('plan-source-table'); if(!cont)return;
  const botones=[...document.querySelectorAll('[data-plan-tab]')];
  const render=tipo=>{cont.innerHTML=tablaPlan(tipo);botones.forEach(b=>{const on=b.dataset.planTab===tipo;b.classList.toggle('active',on);b.setAttribute('aria-pressed',on?'true':'false');});};
  botones.forEach(b=>b.addEventListener('click',()=>render(b.dataset.planTab)));render('presupuesto');
  document.getElementById('compare-media-table').innerHTML=tablaComparacion(COMPARA_MEDIOS);
  document.getElementById('compare-month-table').innerHTML=tablaComparacion(COMPARA_MESES);
}
iniciarPlan();

function iniciarTimelineEjecutiva() {
  document.querySelectorAll('.timeline-item .ev-list').forEach(lista => {
    const items=[...lista.children];
    if(items.length<=2)return;
    const extra=document.createElement('details');extra.className='timeline-more';
    const cantidad=items.length-2;
    const summary=document.createElement('summary');summary.textContent='Ver '+cantidad+(cantidad===1?' cambio adicional':' cambios adicionales');
    const sub=document.createElement('ul');sub.className='ev-list';
    items.slice(2).forEach(item=>sub.appendChild(item));extra.append(summary,sub);lista.after(extra);
  });
}
iniciarTimelineEjecutiva();
