(() => {
  const styles = `
:host { display: block; position: relative; width: 100%; aspect-ratio: 7 / 5; font-family: 'Geist', ui-sans-serif, system-ui, sans-serif; color: #333746; -webkit-font-smoothing: antialiased; }
* { box-sizing: border-box; }
    .graphic-composition {
      position: absolute;
      inset: 0;
      overflow: hidden;
      border-radius: inherit;
      pointer-events: none;
    }

    .principles-scene { container-type: inline-size; }
    .principles-scene::before,
    .principles-scene::after {
      content: '';
      position: absolute;
      pointer-events: none;
    }
    .principles-scene::before {
      inset: 0;
      background-image:
        linear-gradient(rgba(128, 139, 176, .045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(128, 139, 176, .045) 1px, transparent 1px);
      background-size: 36px 36px;
      -webkit-mask-image: radial-gradient(ellipse 65% 65% at 50% 50%, #000, transparent 92%);
      mask-image: radial-gradient(ellipse 65% 65% at 50% 50%, #000, transparent 92%);
    }
    .principles-scene::after {
      inset: 8%;
      background:
        radial-gradient(ellipse at 28% 39%, rgba(191, 212, 255, .3), transparent 54%),
        radial-gradient(ellipse at 74% 24%, rgba(248, 229, 193, .16), transparent 43%),
        radial-gradient(ellipse at 64% 68%, rgba(229, 211, 250, .26), transparent 56%);
      filter: blur(16px);
    }

    .icon-placeholder {
      display: grid;
      place-items: center;
      width: 100%;
      max-width: 96px;
      aspect-ratio: 1;
      border-radius: 20%;
      color: var(--slot-ink);
      background: linear-gradient(145deg, var(--slot-light), var(--slot-shade));
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .85);
    }
    .icon-placeholder svg {
      display: block;
      width: 60%;
      height: 60%;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.05;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .icon-placeholder--lavender { --slot-light: #e8dafd; --slot-shade: #e8dafd; --slot-ink: #8058db; }
    .icon-placeholder--blue { --slot-light: #dfe9fd; --slot-shade: #dfe8fd; --slot-ink: #5e82ec; }
    .icon-placeholder--pink { --slot-light: #fddeed; --slot-shade: #fddeed; --slot-ink: #d54989; }
    .icon-placeholder--yellow { --slot-light: #fef4d8; --slot-shade: #fef3d8; --slot-ink: #df9204; }

    .heading-card {
      display: flex;
      align-items: center;
      gap: 2.56cqi;
      padding: 2.93cqi;
      border: 1px solid #f0f1f6;
      border-radius: 3.67cqi;
      background: #fff;
      box-shadow:
        0 3.3cqi 6.6cqi -2.2cqi rgba(139, 123, 190, .16),
        0 1.1cqi 2.56cqi -.73cqi rgba(134, 130, 165, .08);
    }
    .heading-card .icon-placeholder {
      width: 8.8cqi;
      max-width: none;
      flex: none;
    }
    .heading-card h2 {
      margin: 0;
      min-width: 0;
      color: #333746;
      font: 500 clamp(8px, 2.56cqi, 14px)/1.3 'Geist', ui-sans-serif, system-ui, sans-serif;
      letter-spacing: -.015em;
      white-space: nowrap;
    }

    @keyframes principle-float {
      0%, 100% { transform: translate3d(0, 0, 0); }
      50% { transform: translate3d(0, -.8cqi, 0); }
    }

    .heading-card-layout {
      position: absolute;
      inset: 0;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .heading-card-layout .heading-card {
      position: absolute;
      z-index: 2;
      pointer-events: auto;
      cursor: default;
      translate: 0 0;
      scale: 1;
      gap: var(--card-gap);
      padding: var(--card-padding);
      border-radius: var(--card-radius);
      background: linear-gradient(145deg, rgba(255, 255, 255, .98), rgba(255, 255, 255, .94));
      box-shadow:
        0 2.56cqi 6.22cqi -2.56cqi rgba(125, 120, 191, .13),
        0 .55cqi 1.47cqi -.73cqi rgba(129, 135, 174, .05),
        inset 0 1px 0 #fff;
      animation: principle-float var(--float-time) ease-in-out var(--float-delay) infinite;
      transition:
        translate 380ms cubic-bezier(.2, .7, .2, 1),
        scale 380ms cubic-bezier(.2, .7, .2, 1),
        border-color 380ms ease,
        box-shadow 380ms ease,
        opacity 380ms ease;
    }
    .heading-card-layout .icon-placeholder {
      width: var(--card-icon-size);
      border-radius: 27%;
      transition: scale 380ms ease, filter 380ms ease, box-shadow 380ms ease;
    }
    .heading-card-layout .icon-placeholder svg {
      width: 58%;
      height: 58%;
      stroke-width: 1.9;
    }
    .heading-card-layout h2 {
      font-size: clamp(8px, var(--card-font-size), 19.2px);
      letter-spacing: -.025em;
    }
    .heading-card-layout .icon-placeholder--blue {
      --slot-light: #edf2ff; --slot-shade: #dfe8ff; --slot-ink: #7893df;
    }
    .heading-card-layout .icon-placeholder--yellow {
      --slot-light: #fff9eb; --slot-shade: #fff0d7; --slot-ink: #dba752;
    }
    .heading-card-layout .icon-placeholder--pink {
      --slot-light: #fff0f6; --slot-shade: #ffe0ed; --slot-ink: #de83ab;
    }
    .heading-card-layout .icon-placeholder--lavender {
      --slot-light: #f6f0ff; --slot-shade: #ebe2fb; --slot-ink: #a187d8;
    }
    .heading-card-layout .heading-card:nth-child(1) {
      left: 14.84%; top: 28.98%; width: 39.38%;
      --hover-rgb: 120, 147, 223;
      --connector-color: #b8c8f1; --anchor-color: #94aaeb;
      --card-icon-size: 8.06cqi; --card-padding: 3.3cqi;
      --card-gap: 2.38cqi; --card-radius: 3.3cqi; --card-font-size: 2.2cqi;
      --float-time: 16s; --float-delay: -3s;
    }
    .heading-card-layout .heading-card:nth-child(2) {
      left: 58.24%; top: 15.65%; width: 35.16%;
      --hover-rgb: 219, 167, 82;
      --connector-color: #ead3a8; --anchor-color: #dfb66f;
      --card-icon-size: 6.96cqi; --card-padding: 2.75cqi;
      --card-gap: 2.2cqi; --card-radius: 3.11cqi; --card-font-size: 2.11cqi;
      --float-time: 18s; --float-delay: -8s;
    }
    .heading-card-layout .heading-card:nth-child(3) {
      left: 48.17%; top: 46.4%; width: 42.49%;
      z-index: 3;
      --hover-rgb: 222, 131, 171;
      --connector-color: #eac0d4; --anchor-color: #dfa4c1;
      --card-icon-size: 8.43cqi; --card-padding: 3.66cqi;
      --card-gap: 2.56cqi; --card-radius: 3.48cqi; --card-font-size: 2.29cqi;
      --float-time: 17s; --float-delay: -6s;
    }
    .heading-card-layout .heading-card:nth-child(4) {
      left: 7.69%; top: 72.57%; width: 33.33%;
      --hover-rgb: 161, 135, 216;
      --connector-color: #d4c4ed; --anchor-color: #b39bdc;
      --card-icon-size: 6.23cqi; --card-padding: 2.38cqi;
      --card-gap: 1.83cqi; --card-radius: 2.75cqi; --card-font-size: 2.02cqi;
      --float-time: 19s; --float-delay: -10s;
    }
    .heading-card-layout .heading-card:focus-visible {
      outline: 2px solid rgba(var(--hover-rgb), .6);
      outline-offset: 4px;
    }
    .heading-card-layout .people-primary { --gather-x: 1px; }
    .heading-card-layout .people-secondary { --gather-x: -1px; }
    .heading-card-layout .workflow-node {
      fill: currentColor;
      fill-opacity: 0;
    }
    .heading-card-layout .workflow-node:nth-of-type(2) { --icon-delay: 160ms; }
    .heading-card-layout .workflow-node:nth-of-type(3) { --icon-delay: 320ms; }
    .heading-card-layout .information-line {
      stroke-dasharray: 1;
      stroke-dashoffset: 0;
    }
    .heading-card-layout .information-line:nth-of-type(2) { --icon-delay: 100ms; }
    .heading-card-layout .information-line:nth-of-type(3) { --icon-delay: 200ms; }
    .heading-card-layout .constraints-knob {
      fill: var(--slot-shade);
      --slider-x: -3px;
    }
    .heading-card-layout .constraints-knob:nth-of-type(2) { --slider-x: 3px; }
    .heading-card-layout:has(> .heading-card:focus-visible) > .heading-card:not(:focus-visible) {
      opacity: .1;
    }
    .heading-card-layout > .heading-card:focus-visible {
      --topic-active: 1;
      --topic-visibility: visible;
      z-index: 4;
      animation-play-state: paused;
    }
    .topic-description {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
    .topic-details {
      position: absolute;
      z-index: 1;
      inset: 0;
      pointer-events: none;
      opacity: var(--topic-active, 0);
      visibility: var(--topic-visibility, hidden);
      transition:
        opacity 220ms ease,
        visibility 0s linear calc((1 - var(--topic-active, 0)) * 400ms);
    }
    .topic-connectors {
      position: absolute;
      z-index: 2;
      overflow: visible;
      fill: none;
      stroke: var(--connector-color);
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .topic-link {
      stroke-width: 1.3px;
      vector-effect: non-scaling-stroke;
      stroke-dasharray: 6px 3px;
      stroke-dashoffset: 0;
    }
    .topic-link-reveal {
      fill: none;
      stroke: #fff;
      stroke-width: 1.2;
      stroke-linecap: butt;
      stroke-linejoin: round;
      vector-effect: none;
      stroke-dasharray: 1;
      stroke-dashoffset: calc(1 - var(--topic-active, 0));
      transition-property: stroke-dashoffset;
      transition-duration: calc(240ms + var(--topic-active, 0) * 280ms);
      transition-timing-function: cubic-bezier(.25, .1, .25, 1);
      transition-delay: calc(var(--topic-active, 0) * var(--branch-delay, 0ms));
    }
    .topic-anchor {
      fill: var(--anchor-color);
      stroke: none;
    }
    .topic-anchor--end {
      opacity: var(--topic-active, 0);
      transition: opacity 150ms ease;
      transition-delay: calc(var(--topic-active, 0) * (520ms + var(--branch-delay, 0ms)));
    }
    .topic-detail {
      position: absolute;
      z-index: 1;
      display: grid;
      place-items: center;
      height: 6.4cqi;
      border: 1px solid #edf0f8;
      border-radius: 2.1cqi;
      background: rgba(255, 255, 255, .98);
      box-shadow: 0 1.1cqi 3.3cqi -.9cqi rgba(127, 144, 195, .1);
      color: #596274;
      font: 400 clamp(9px, 1.85cqi, 15.5px)/1.2 'Geist', ui-sans-serif, system-ui, sans-serif;
      letter-spacing: -.015em;
      white-space: nowrap;
      opacity: var(--topic-active, 0);
      translate: 0 calc((1 - var(--topic-active, 0)) * .65cqi);
      transition: opacity 200ms ease, translate 260ms cubic-bezier(.2, .7, .2, 1);
      transition-delay: calc(var(--topic-active, 0) * var(--word-delay));
    }
    @media (hover: hover) and (pointer: fine) {
      .heading-card-layout:has(> .heading-card:hover) > .heading-card {
        --topic-active: 0;
        --topic-visibility: hidden;
        opacity: .1;
      }
      .heading-card-layout:has(> .heading-card:hover) > .heading-card:hover {
        --topic-active: 1;
        --topic-visibility: visible;
        opacity: 1;
      }
      .heading-card-layout .heading-card:is(:hover, :focus-visible) {
        z-index: 4;
        translate: 0 -.73cqi;
        scale: 1.012;
        animation-play-state: paused;
        border-color: rgba(var(--hover-rgb), .24);
        box-shadow:
          0 3.3cqi 7cqi -2.56cqi rgba(var(--hover-rgb), .23),
          0 .73cqi 1.83cqi -.73cqi rgba(var(--hover-rgb), .09),
          inset 0 1px 0 #fff;
      }
      .heading-card-layout .heading-card:is(:hover, :focus-visible)::after {
        content: '';
        position: absolute;
        inset: 0 0 -1.2cqi;
        border-radius: inherit;
      }
      .heading-card-layout > .heading-card:hover { z-index: 5; }
      .heading-card-layout .heading-card:is(:hover, :focus-visible) .icon-placeholder {
        scale: 1.05;
        filter: saturate(1.1);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, .85), 0 .73cqi 2.2cqi rgba(var(--hover-rgb), .14);
      }
      .heading-card-layout .heading-card:is(:hover, :focus-visible) :is(.people-primary, .people-secondary) {
        animation: people-gather 1.5s ease-in-out both;
      }
      .heading-card-layout .heading-card:is(:hover, :focus-visible) .workflow-node {
        animation: workflow-pulse 1.2s ease-in-out var(--icon-delay, 0ms) both;
      }
      .heading-card-layout .heading-card:is(:hover, :focus-visible) .information-line {
        animation: information-reveal 900ms cubic-bezier(.2, .7, .2, 1) var(--icon-delay, 0ms) both;
      }
      .heading-card-layout .heading-card:is(:hover, :focus-visible) .constraints-knob {
        animation: constraints-slide 1.6s cubic-bezier(.4, 0, .2, 1) both;
      }
    }
    @keyframes people-gather {
      0%, 100% { transform: translate(0, 0); }
      45%, 65% { transform: translate(var(--gather-x), -.75px); }
    }
    @keyframes workflow-pulse {
      0%, 100% { fill-opacity: 0; }
      40%, 60% { fill-opacity: .22; }
    }
    @keyframes information-reveal {
      from { stroke-dashoffset: 1; opacity: .3; }
      to { stroke-dashoffset: 0; opacity: 1; }
    }
    @keyframes constraints-slide {
      0%, 100% { transform: translateX(0); }
      45%, 65% { transform: translateX(var(--slider-x)); }
    }
    @media (prefers-reduced-motion: reduce) {
      .heading-card-layout .heading-card,
      .heading-card-layout .heading-card:is(:hover, :focus-visible),
      .heading-card-layout .heading-card .icon-placeholder,
      .heading-card-layout .heading-card:is(:hover, :focus-visible) .icon-placeholder {
        animation: none;
        transition: none;
        translate: none;
        scale: none;
      }
      .heading-card-layout .heading-card:is(:hover, :focus-visible) svg * { animation: none; }
      .topic-details,
      .topic-detail,
      .topic-link,
      .topic-link-reveal,
      .topic-anchor--end {
        transition: none;
        translate: none;
      }
    }
`;
  // All cards share the same connector, label, and animation markup.
  // Coordinates are relative to each card, in hundredths of the canvas width.
  const topicLayouts = {
    people: {
      bounds: [-12, -15, 83, 54],
      topics: [
        { label: 'Needs', box: [-9.5, -12, 17], start: [12, 0], end: [7.5, -8.8],
          path: 'M12 0V-5.8Q12-8.8 9-8.8H7.5' },
        { label: 'Behavior', box: [52, .8, 18], start: [39.38, 7.45], end: [52, 4],
          path: 'M39.38 7.45H44.5Q46 7.45 46 5.95V5.5Q46 4 47.5 4H52' },
        { label: 'Friction', box: [13.4, 27.5, 16], start: [11, 14.9], end: [21.4, 27.5],
          path: 'M11 14.9V21.1Q11 23.1 13 23.1H19.4Q21.4 23.1 21.4 25.1V27.5' }
      ]
    },
    workflow: {
      bounds: [-42, -9, 82, 52],
      topics: [
        { label: 'Sequence', box: [-37, -5, 18], start: [0, 4.8], end: [-19, -1.8],
          path: 'M0 4.8H-9Q-11 4.8-11 2.8V.2Q-11-1.8-13-1.8H-19' },
        { label: 'Dependencies', box: [-31, 23, 24], start: [7.5, 12.7], end: [-7, 26.2],
          path: 'M7.5 12.7V23.2Q7.5 26.2 4.5 26.2H-7' },
        { label: 'Edge cases', box: [12, 32, 20], start: [26, 12.7], end: [22, 32],
          path: 'M26 12.7V22Q26 24 24 24Q22 24 22 26V32' }
      ]
    },
    information: {
      bounds: [-43, -23, 90, 62],
      topics: [
        { label: 'Hierarchy', box: [-4, -19, 19], start: [13, 0], end: [5.5, -12.6],
          path: 'M13 0V-5Q13-7.5 10.5-7.5H8Q5.5-7.5 5.5-10V-12.6' },
        { label: 'State', box: [-39, 8, 16], start: [0, 7.9], end: [-23, 11.2],
          path: 'M0 7.9H-9Q-11 7.9-11 9.55Q-11 11.2-13 11.2H-23' },
        { label: 'Context', box: [22, 29, 18], start: [27, 16], end: [31, 29],
          path: 'M27 16V21Q27 23 29 23Q31 23 31 25V29' }
      ]
    },
    constraints: {
      bounds: [-5, -36, 86, 51],
      topics: [
        { label: 'Business', box: [-1, -24, 18], start: [18, 0], end: [8, -17.6],
          path: 'M18 0V-7Q18-9.5 15.5-9.5H10.5Q8-9.5 8-12V-17.6' },
        { label: 'Technical', box: [35, -32, 20], start: [27, 0], end: [45, -25.6],
          path: 'M27 0V-15Q27-17.5 29.5-17.5H42.5Q45-17.5 45-20V-25.6' },
        { label: 'Legacy', box: [60, -3, 17], start: [33.33, 5.6], end: [60, .2],
          path: 'M33.33 5.6H43Q46 5.6 46 2.9Q46 .2 49 .2H60' }
      ]
    }
  };
  const topicDetails = (key) => {
    const { bounds: [x, y, width, height], topics } = topicLayouts[key];
    const maskId = index => `${key}-topic-${index}-reveal`;
    return `
      <p class="topic-description" id="${key}-detail-description">${topics.map(topic => topic.label).join(', ')}.</p>
      <div class="topic-details" aria-hidden="true">
        <svg class="topic-connectors" viewBox="${x} ${y} ${width} ${height}"
          style="left:${x}cqi;top:${y}cqi;width:${width}cqi;height:${height}cqi" aria-hidden="true">
          <defs>${topics.map((topic, index) => `
            <mask id="${maskId(index)}" style="--branch-delay:${index * 65}ms"
              maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="${x}" y="${y}" width="${width}" height="${height}">
              <path class="topic-link-reveal" d="${topic.path}" pathLength="1"/>
            </mask>`).join('')}
          </defs>
          ${topics.map((topic, index) => `
            <g style="--branch-delay:${index * 65}ms">
              <path class="topic-link" d="${topic.path}" mask="url(#${maskId(index)})"/>
              <circle class="topic-anchor" cx="${topic.start[0]}" cy="${topic.start[1]}" r=".34"/>
              <circle class="topic-anchor topic-anchor--end" cx="${topic.end[0]}" cy="${topic.end[1]}" r=".34"/>
            </g>`).join('')}
        </svg>
        ${topics.map((topic, index) => `
          <span class="topic-detail" style="left:${topic.box[0]}cqi;top:${topic.box[1]}cqi;width:${topic.box[2]}cqi;--word-delay:${350 + index * 65}ms">${topic.label}</span>`).join('')}
      </div>`;
  };
  const markup = `
<div class="graphic-composition principles-scene" role="group" aria-label="People, Workflow, Information, and Constraints">
            <ul class="heading-card-layout">
              <li class="heading-card heading-card--people" tabindex="0" aria-describedby="people-detail-description">
                <div class="icon-placeholder icon-placeholder--blue" aria-hidden="true">
                  <svg viewBox="0 0 32 32">
                    <g class="people-primary">
                      <circle cx="11.5" cy="9" r="4.5"/>
                      <path d="M1.5 28.5v-1.8a10 10 0 0 1 20 0v1.8Z"/>
                    </g>
                    <g class="people-secondary">
                      <circle cx="23.5" cy="10" r="3.7"/>
                      <path d="M22.5 18.5h1a7 7 0 0 1 7 7V27h-6.5"/>
                    </g>
                  </svg>
                </div>
                <h2>People</h2>
                ${topicDetails('people')}
              </li>
              <li class="heading-card heading-card--workflow" tabindex="0" aria-describedby="workflow-detail-description">
                <div class="icon-placeholder icon-placeholder--yellow" aria-hidden="true">
                  <svg viewBox="0 0 32 32">
                    <rect class="workflow-node" x="2" y="12" width="8" height="8" rx="1.8"/>
                    <rect class="workflow-node" x="22" y="2" width="8" height="8" rx="1.8"/>
                    <rect class="workflow-node" x="22" y="22" width="8" height="8" rx="1.8"/>
                    <path d="M10 16h5a2 2 0 0 0 2-2V8a2 2 0 0 1 2-2h3M17 14v10a2 2 0 0 0 2 2h3"/>
                  </svg>
                </div>
                <h2>Workflow</h2>
                ${topicDetails('workflow')}
              </li>
              <li class="heading-card heading-card--information" tabindex="0" aria-describedby="information-detail-description">
                <div class="icon-placeholder icon-placeholder--pink" aria-hidden="true">
                  <svg viewBox="0 0 32 32">
                    <rect x="4" y="2" width="24" height="28" rx="2.6"/>
                    <path class="information-line" d="M9.5 10h13" pathLength="1"/>
                    <path class="information-line" d="M9.5 16h10.5" pathLength="1"/>
                    <path class="information-line" d="M9.5 22h6.5" pathLength="1"/>
                  </svg>
                </div>
                <h2>Information</h2>
                ${topicDetails('information')}
              </li>
              <li class="heading-card heading-card--constraints" tabindex="0" aria-describedby="constraints-detail-description">
                <div class="icon-placeholder icon-placeholder--lavender" aria-hidden="true">
                  <svg viewBox="0 0 32 32">
                    <path d="M2 6H30M2 16H30M2 26H30"/>
                    <circle class="constraints-knob" cx="22.5" cy="6" r="3"/>
                    <circle class="constraints-knob" cx="10.5" cy="16" r="3"/>
                    <circle class="constraints-knob" cx="22.5" cy="26" r="3"/>
                  </svg>
                </div>
                <h2>Constraints</h2>
                ${topicDetails('constraints')}
              </li>
            </ul>
          </div>`;

  const tag = 'portfolio-hero-canvas';
  const script = document.currentScript;
  const state = window.__portfolioCanvas05 ||= {
    instances: new Set(),
    template: document.createElement('template'),
    content: null,
    watching: false,
    pending: false
  };
  const content = '<style>' + styles + '</style>' + markup;
  const changed = state.content !== content;
  if (changed) {
    state.content = content;
    state.template.innerHTML = content;
  }
  if (!customElements.get(tag)) {
    customElements.define(tag, class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      }
      connectedCallback() {
        state.instances.add(this);
        this.render();
      }
      disconnectedCallback() {
        state.instances.delete(this);
      }
      render() {
        if (this.renderedContent === state.content) return;
        const previousCards = Array.from(this.shadowRoot.querySelectorAll('.heading-card'));
        const focusedIndex = previousCards.indexOf(this.shadowRoot.activeElement);
        this.shadowRoot.replaceChildren(state.template.content.cloneNode(true));
        this.renderedContent = state.content;
        if (focusedIndex >= 0) {
          this.shadowRoot.querySelectorAll('.heading-card')[focusedIndex]?.focus({ preventScroll: true });
        }
      }
    });
  }
  if (changed) state.instances.forEach(instance => instance.render());

  const local = location.protocol === 'file:' || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  if (script?.hasAttribute('data-live') && local && !state.watching) {
    state.watching = true;
    const sourceURL = new URL(script.src);
    sourceURL.search = '';
    const refresh = () => {
      if (document.visibilityState === 'hidden' || state.pending || state.instances.size === 0) return;
      state.pending = true;
      const update = document.createElement('script');
      const url = new URL(sourceURL);
      url.searchParams.set('canvas05-update', Date.now());
      update.src = url.href;
      update.onload = update.onerror = () => {
        state.pending = false;
        update.remove();
      };
      document.head.append(update);
    };
    state.timer = window.setInterval(refresh, 2000);
    document.addEventListener('visibilitychange', refresh);
    window.addEventListener('focus', refresh);
  }
})();
