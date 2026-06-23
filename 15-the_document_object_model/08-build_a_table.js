import { JSDOM } from 'jsdom';

const HTML = `
<h1>Mountains</h1>

<div id="mountains"></div>
`;
const dom = new JSDOM(HTML);
const document = dom.window.document;

const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
];

const div = document.getElementById('mountains');
const table = document.createElement('table');
div.appendChild(table);

function build_row(mountain, is_header = false) {
  const row = document.createElement('tr');
  const cell_type = is_header ? 'th' : 'td';

  for (let key of Object.keys(mountain)) {
    const cell = document.createElement(cell_type);
    cell.textContent = mountain[key];
    row.append(cell);
  }

  return row;
}

/* --------------------------------- HEADER --------------------------------- */

const header_data = { name: 'name', height: 'height', place: 'place' };
table.appendChild(build_row(header_data, true));

/* --------------------------------- CONTENT -------------------------------- */

for (let mountain of MOUNTAINS) {
  table.appendChild(build_row(mountain, false));
}

console.log(div.innerHTML);
