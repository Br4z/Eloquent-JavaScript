import { State, simple_level } from './01-reading_a_level.js';

function elt(name, attrs, ...children) {
  const dom = document.createElement(name);

  for (let attr of Object.keys(attrs)) dom.setAttribute(attr, attrs[attr]);

  for (let child of children) dom.appendChild(child);

  return dom;
}

/* -------------------------------------------------------------------------- */

class DOMDisplay {
  constructor(parent, level) {
    this.dom = elt('div', { class: 'game' }, draw_grid(level));
    this.actor_layer = null;
    parent.appendChild(this.dom);
  }

  clear() {
    this.dom.remove();
  }
}

/* -------------------------------------------------------------------------- */

const scale = 20;

function draw_grid(level) {
  return elt(
    'table',
    {
      class: 'background',
      style: `width: ${level.width * scale}px`,
    },
    ...level.rows.map((row) =>
      elt('tr', { style: `height: ${scale}px` }, ...row.map((type) => elt('td', { class: type }))),
    ),
  );
}

/* -------------------------------------------------------------------------- */

function draw_actors(actors) {
  return elt(
    'div',
    {},
    ...actors.map((actor) => {
      let rect = elt('div', { class: `actor ${actor.type}` });
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.pos.x * scale}px`;
      rect.style.top = `${actor.pos.y * scale}px`;
      return rect;
    }),
  );
}

/* -------------------------------------------------------------------------- */

DOMDisplay.prototype.sync_state = function (state) {
  if (this.actor_layer) this.actor_layer.remove();
  this.actor_layer = draw_actors(state.actors);
  this.dom.appendChild(this.actor_layer);
  this.dom.className = `game ${state.status}`;
  this.scroll_player_into_view(state);
};

/* -------------------------------------------------------------------------- */

DOMDisplay.prototype.scroll_player_into_view = function (state) {
  let width = this.dom.clientWidth;
  let height = this.dom.clientHeight;
  let margin = width / 3;

  // The viewport
  let left = this.dom.scrollLeft,
    right = left + width;
  let top = this.dom.scrollTop,
    bottom = top + height;

  let player = state.player;
  let center = player.pos.plus(player.size.times(0.5)).times(scale);

  if (center.x < left + margin) this.dom.scrollLeft = center.x - margin;
  else if (center.x > right - margin) this.dom.scrollLeft = center.x + margin - width;

  if (center.y < top + margin) this.dom.scrollTop = center.y - margin;
  else if (center.y > bottom - margin) this.dom.scrollTop = center.y + margin - height;
};

/* -------------------------------------------------------------------------- */

const display = new DOMDisplay(document.body, simple_level);
display.sync_state(State.start(simple_level));
