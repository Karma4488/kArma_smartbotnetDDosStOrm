<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Offline DDoS Visualizer (safe)</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 18px; }
    .row { display:flex; gap:12px; align-items:center; margin-bottom:10px; }
    #chart { width:100%; height:420px; }
    textarea { width:100%; height:120px; }
  </style>
  <!-- Chart.js from CDN for plotting (works offline if you host it locally) -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h2>Offline DDoS Visualizer — safe (no network attacks)</h2>
  <p>Upload a timeseries CSV exported by the offline simulator (per-second rows with a column for <code>time</code>, <code>inbound_rps</code>, <code>processed_rps</code>, and optionally per-IP columns).</p>

  <div class="row">
    <input type="file" id="csvFile" accept=".csv" />
    <button id="loadBtn">Load CSV</button>
    <label><input type="checkbox" id="hasIpColumns"> CSV contains per-IP columns</label>
  </div>

  <div id="ipControls" style="display:none;">
    <div class="row">
      <label for="ipSelect">Pick IP (from CSV columns):</label>
      <select id="ipSelect"></select>
      <label for="manualIp">or enter IP:</label>
      <input id="manualIp" placeholder="203.0.113.5" />
    </div>

    <div class="row">
      <label for="extraRps">Simulate extra attacker RPS to selected IP:</label>
      <input id="extraRps" type="number" value="1000" min="0" step="10" />
      <button id="simulateBtn">Simulate</button>
    </div>
  </div>

  <canvas id="chart"></canvas>

  <h3>CSV Preview</h3>
  <textarea id="csvPreview" readonly></textarea>

<script>
let rawRows = [];
let headers = [];
let timeSeries = []; // objects per row
let chart = null;
document.getElementById('loadBtn').onclick = () => {
  const f = document.getElementById('csvFile').files[0];
  if (!f) return alert('Choose a CSV file first.');
  const reader = new FileReader();
  reader.onload = function(e) {
    const txt = e.target.result;
    document.getElementById('csvPreview').value = txt.slice(0, 4000);
    parseCSV(txt);
    populateIPControls();
    plotBase();
    document.getElementById('ipControls').style.display = 'block';
  };
  reader.readAsText(f);
};

function parseCSV(txt) {
  const lines = txt.split(/\r?\n/).filter(Boolean);
  headers = lines[0].split(',').map(h => h.trim());
  rawRows = lines.slice(1).map(line => line.split(','));
  timeSeries = rawRows.map(cols => {
    const obj = {};
    headers.forEach((h,i) => {
      const v = cols[i] === undefined ? '' : cols[i].trim();
      obj[h] = isFinite(v) && v !== '' ? Number(v) : v;
    });
    return obj;
  });
}

function populateIPControls() {
  const ipSelect = document.getElementById('ipSelect');
  ipSelect.innerHTML = '';
  // find any header that looks like an IP column (simple heuristic)
  const ipLike = headers.filter(h => /\d+\.\d+\.\d+\.\d+/.test(h));
  ipLike.forEach(h => {
    const opt = document.createElement('option');
    opt.value = h;
    opt.text = h;
    ipSelect.appendChild(opt);
  });
  if (ipLike.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.text = '(no per-IP columns found)';
    ipSelect.appendChild(opt);
  }
}

function plotBase() {
  const times = timeSeries.map(r => r.time ?? r.t ?? r.timestamp ?? 0);
  const inbound = timeSeries.map(r => r.inbound_rps ?? r.inbound ?? r['inbound_rps']);
  const processed = timeSeries.map(r => r.processed_rps ?? r.processed ?? r['processed_rps']);
  const ctx = document.getElementById('chart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: times,
      datasets: [
        { label: 'Inbound', data: inbound, borderColor: 'rgb(255,165,0)', tension:0.2, pointRadius:0 },
        { label: 'Processed', data: processed, borderColor: 'rgb(54,162,235)', tension:0.2, pointRadius:0 }
      ]
    },
    options: {
      plugins: { legend:{ position:'top' } },
      scales: { x: { title: { display:true, text:'time' } }, y: { title: { display:true, text:'RPS' } } }
    }
  });
}

document.getElementById('simulateBtn').onclick = () => {
  const extra = Number(document.getElementById('extraRps').value) || 0;
  const ipName = document.getElementById('manualIp').value || document.getElementById('ipSelect').value;
  if (!ipName) return alert('Choose or enter an IP identifier to simulate.');
  // If per-IP column exists in CSV, add extra to that series; otherwise add synthetic extra to inbound
  const ipColumnExists = headers.includes(ipName);
  // build new series arrays
  const times = timeSeries.map(r => r.time ?? r.t ?? r.timestamp ?? 0);
  const inbound = [];
  const processed = [];
  for (let i=0;i<timeSeries.length;i++){
    const row = Object.assign({}, timeSeries[i]);
    let baseInbound = (row.inbound_rps ?? row.inbound ?? row['inbound_rps']) || 0;
    let baseProcessed = (row.processed_rps ?? row.processed ?? row['processed_rps']) || 0;
    if (ipColumnExists) {
      // add extra to the chosen per-ip column and to inbound; assume server processed scales linearly (simple model)
      const ipVal = Number(row[ipName] || 0);
      const newIp = ipVal + extra;
      const newInbound = baseInbound + extra;
      // naive model: processed increases by min(capacity, processed + portion) -> we don't have capacity here,
      // so we estimate processed as baseProcessed + extra*0.3 (assume 30% of extra gets processed)
      const newProcessed = baseProcessed + extra * 0.3;
      inbound.push(newInbound);
      processed.push(newProcessed);
    } else {
      // per-ip column not present: just add to inbound and estimate processed
      const newInbound = baseInbound + extra;
      const newProcessed = baseProcessed + extra * 0.3;
      inbound.push(newInbound);
      processed.push(newProcessed);
    }
  }
  // update chart
  if (chart) {
    chart.data.datasets[0].data = inbound;
    chart.data.datasets[1].data = processed;
    chart.update();
  }
  alert('Simulation applied locally in this browser only — no network activity performed.');
};
</script>
</body>
</html>
