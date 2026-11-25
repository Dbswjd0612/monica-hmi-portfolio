(() => {
const C=window.SCENA_CONTENT, root=document.getElementById('scena-root');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const map=(a,fn)=>a.map(fn).join('');
const p=a=>map(a,x=>`<p>${esc(x)}</p>`);
const list=a=>`<ul>${map(a,x=>`<li>${esc(x)}</li>`)}</ul>`;
const label=(n,t)=>`<div class="eyebrow"><span>${n}</span>${esc(t)}</div>`;
const img=(i,cls='')=>i.src?`<img class="${cls}" src="${i.src}" width="${i.w}" height="${i.h}" alt="${esc(i.alt)}" loading="lazy">`:`<div class="missing"><span>Evidence to add</span>${esc(i.label)}</div>`;
const figure=(x,cls='')=>`<figure class="${cls}">${img(x.image)}<figcaption>${esc(x.caption||'')}${x.captionNote?`<br>${esc(x.captionNote)}`:''}</figcaption></figure>`;
const notes=a=>`<ol class="notes">${map(a,x=>`<li><span class="note-no">${x.n}</span><div><h4>${esc(x.t)}</h4><p>${esc(x.d)}</p></div></li>`)}</ol>`;
const o=C.overview,pr=C.problem,f=C.flow,d=C.decisions,k=C.constraints,v=C.validation;
root.innerHTML=`
<header class="hero wrap" id="overview">
 ${label('CASE STUDY / 2026','Product design · Hardware × software')}
 <div class="hero-title"><h1>${o.title}<span class="blue">.</span></h1><p>See what changed.<br><em>Decide what matters.</em></p></div>
 <div class="hero-deck">
  <p>${esc(o.description.join(' '))}</p>
  <div class="links">
   <a href="${esc(C.links.design)}" target="_blank" rel="noopener noreferrer">${esc(o.designLabel)} <span class="cta-arrow" aria-hidden="true">↗</span></a>
   <a href="${C.links.video}" target="_blank" rel="noopener">Watch video <span class="cta-arrow" aria-hidden="true">↗</span></a>
  </div>
 </div>
 <div class="hero-stage" tabindex="0" role="region" aria-label="Scena product screens; scroll horizontally on mobile">${map(o.screens,(s,i)=>`<figure class="hero-phone phone-${i}"><div class="screen-label"><span>0${i+1}</span>${s.label}</div>${img(s)} </figure>`)}</div>
 <div class="stage-caption"><span>${esc(o.caption)}</span></div>
 <div class="metadata">${map(o.meta,m=>`<div><span>${m.label}</span><p>${m.value}</p></div>`)}</div>
</header>
<section class="wrap chapter" id="problem">
 ${label('01','Problem & pivot')}
 <div class="split story-intro"><h2 class="chapter-title">Activity is a moment. <span class="muted">A space has a state.</span></h2><div class="prose">${p(pr.body)}</div></div>
 <p class="context-line">${esc(pr.lead)}<strong>“${esc(pr.question)}”</strong></p>
 <figure class="comparison">
  <div class="compare-view">
   <img src="${pr.pair[0].image.src}" alt="${esc(pr.pair[0].image.alt)}">
   <div class="after-layer">${img(pr.pair[1].image)}</div>
   <span class="photo-tag before-tag">Before</span>
   <span class="photo-tag after-tag">After</span>
   <div class="compare-drag-area">
    <input id="photo-range" class="compare-range" type="range" min="0" max="100" value="50"
     aria-label="Compare the condition of the rear exit" aria-describedby="photo-compare-hint"
     aria-valuetext="50% before, 50% after">
   </div>
   <div class="slider-line" aria-hidden="true"><span class="compare-handle"><svg width="22" height="18" viewBox="0 0 22 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 5 2 9l4 4"/><path d="M16 5l4 4-4 4"/></svg></span></div>
  </div>
  <figcaption class="compare-caption">
   <span>Before / After · Existing project imagery</span>
   <span id="photo-compare-hint">Drag to compare</span>
  </figcaption>
 </figure>
 <div class="pivot">
  <div class="pivot-title">
   <span>Our shift in focus</span>
   <h3>Event <span class="pivot-arrow" role="img" aria-label="to"><svg viewBox="0 0 86 60" fill="none" stroke="currentColor" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 30h77.4"/><path d="M57.4 6l24 24-24 24"/></svg></span> State</h3>
   <p class="pivot-lead">${esc(pr.pivotLead)}</p>
  </div>
  <div class="prose"><p>${esc(pr.pivotBody)}</p></div>
  <div class="pivot-path">
   ${map(pr.compare,item=>`<div>
    <span class="small">${esc(item.note)}</span>
    <h4>${esc(item.title)}</h4>
    ${list(item.items)}
   </div>`)}
  </div>
 </div>
</section>
<section class="approach dark" id="approach"><div class="wrap chapter">
 ${label('02','Product approach')}
 <h2 class="chapter-title">What the owner does.<br><span class="dim">What Scena handles.</span></h2>
 <div class="flow-track"><div class="track-key"><span>OWNER / INTENT</span><span>SCENA / RESPONSE</span></div>${map(f.steps,(s,i)=>`<article class="flow-step"><div class="flow-index">0${i+1}</div><div class="human"><h3>${s.title}</h3><p>${esc(s.owner)}</p></div><div class="handoff" aria-hidden="true">↓</div><div class="system"><p>${esc(s.system)}</p></div></article>`)}</div>${f.optional?`<aside class="flow-optional"><span class="flow-optional-label">${esc(f.optional.label)}</span><p>${esc(f.optional.text)}</p></aside>`:''}
</div></section>
<section class="wrap chapter" id="decisions">
 ${label('03','Key design decisions')}
 <div class="split decisions-intro"><h2 class="chapter-title">The owner stays<br><span class="blue">in charge.</span></h2><div class="prose">${p([d.intro])}</div></div>
 <article class="decision-one decision rail-step rail-first" id="decision-a"><span class="rail-no" aria-hidden="true">01</span><div class="decision-heading"><div><span class="small">SET THE REFERENCE</span><h3>${d.a.heading}</h3>${p(d.a.body)}</div></div>
 <div class="setup-composition setup-diagonal">
  <figure class="device sd-ref">${img(d.a.evidence.reference.image)}</figure>
  <div class="sd-note sd-note-ref">
   <span class="sd-step">STEP 01</span>
   <h4>${esc(d.a.evidence.reference.t)}</h4>
   <p>${esc(d.a.evidence.reference.d).replace('. Its ','.<br class="sd-br"> Its ')}</p>
  </div>
  <figure class="device sd-edit">${img(d.a.evidence.spots.image)}</figure>
  <div class="sd-note sd-note-spots">
   <span class="sd-step">STEP 02</span>
   <h4>${esc(d.a.evidence.spots.t)}</h4>
   <p>${d.a.evidence.spots.d.split(/(?<=resizes) |(?<=doesn't) /).map(esc).join('<br class="sd-br"> ')}</p>
  </div>
 </div>
 </article>
</section>
<section class="decision-two dark" id="decision-b"><div class="wrap chapter"><div class="rail-step rail-middle"><span class="rail-no" aria-hidden="true">02</span>
 <div class="decision-heading"><div><span class="small">OBSERVE VS. DECIDE</span><h2>${d.b.heading}</h2><p>${d.b.body[0].split(/(?<=attention\.) |(?<=photos and) /).map(esc).join('<br class="desk-br"> ')}</p></div></div>
 <div class="reasoning"><div class="reasoning-screen"><figure class="device">${img(d.b.main.image)}</figure></div><div class="reasoning-narrative"><div class="reasoning-path">${map(d.b.hierarchy,(x,i)=>`<div class="reason-step"><span>0${i+1}</span><div><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p></div></div>`)}</div></div></div>
 <div class="decision-details"><div><figure><div class="ui-panel ui-panel-decision">${img(d.b.supportA.image)}</div><figcaption>${esc(d.b.supportA.caption)}</figcaption></figure><p>${esc(d.b.supportText)}</p></div><div class="history-panel"><figure><figcaption>${esc(d.b.supportB.caption)}</figcaption><p>${esc(d.b.historyText)}</p><div class="ui-panel ui-panel-history">${img(d.b.supportB.image)}</div></figure></div></div>
</div></div></section>
<section class="wrap chapter decision-three" id="decision-c"><div class="rail-step rail-last"><span class="rail-no" aria-hidden="true">03</span>
 <div class="decision-heading"><div><span class="small">HANDLE UNCERTAINTY</span><h2>Couldn’t compare<br><span class="muted">≠ No change.</span></h2><p>${esc(d.c.lead)}</p></div></div>
 <div class="uncertainty"><div class="result-demo"><div class="segmented" role="group" aria-label="Comparison states" data-active="right"><button data-result="left" aria-pressed="false">Comparable</button><button class="selected" data-result="right" aria-pressed="true">Couldn’t compare</button></div><div id="result-image">${figure(d.c.right,'device')}</div></div><div class="rules"><span class="small blue">WHEN COMPARISON IS UNAVAILABLE</span>${notes(d.c.changes)}<div class="limits" role="group" aria-label="Unavailable reasons"><span class="small limits-eyebrow">UNAVAILABLE REASONS</span><ul class="limit-badges"><li class="limit-badge lb-dark"><img src="/public/images/scena/badges/moon.svg" width="16" height="16" alt="">Too dark</li><li class="limit-badge lb-blurry"><img src="/public/images/scena/badges/blur.svg" width="16" height="16" alt="">Too blurry</li><li class="limit-badge lb-moved"><img src="/public/images/scena/badges/camera-moved.svg" width="16" height="16" alt="">Camera moved</li><li class="limit-badge lb-blocked"><img src="/public/images/scena/badges/eye-off.svg" width="16" height="16" alt="">View blocked</li><li class="limit-badge lb-unavailable"><img src="/public/images/scena/badges/image-off.svg" width="16" height="16" alt="">Image unavailable</li><li class="limit-badge lb-noref"><img src="/public/images/scena/badges/reference.svg" width="16" height="16" alt="">No reference</li></ul></div><div class="availability"><span class="small availability-eyebrow" id="availability-label">DECISION AVAILABILITY</span><table class="availability-table" aria-labelledby="availability-label"><thead><tr><th scope="col">Decision</th><th scope="col">Status</th></tr></thead><tbody>${map(d.c.rules,r=>`<tr class="${r.on?'is-available':'is-blocked'}"><th scope="row">${esc(r.name)}</th><td>${esc(r.state)}</td></tr>`)}</tbody></table></div></div></div>
 <div class="failure-pair"><div class="failure-intro"><h3>${d.c.distinctHeading}</h3><p>${esc(d.c.distinctLead)}</p></div>${map(d.c.distinct,(x,i)=>`<div><span class="small">0${i+1}</span><h4>${x.t}</h4><p>${x.d}</p></div>`)}</div>
</div></section>
<section class="constraints" id="constraints"><div class="wrap chapter">
 ${label('04','Working with real constraints')}
 <div class="split">
  <h2 class="chapter-title">Designing for<br><span class="muted">the real world.</span></h2>
  <div class="prose">${p([k.heading])}</div>
 </div>
 <div class="time-check" role="group" aria-labelledby="time-check-title">
  <h3 id="time-check-title" class="time-check-title">When was the photo taken?</h3>
  <div class="time-check-steps">
   <div class="time-check-step">
    <span class="time-check-label">01 / CAPTURE</span>
    <p class="time-check-time">10:00 PM</p>
    <p class="time-check-text">Ring takes the photo.</p>
   </div>
   <span class="time-check-arrow" role="img" aria-label="then"><svg viewBox="0 0 86 60" fill="none" stroke="currentColor" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 30h77.4"/><path d="M57.4 6l24 24-24 24"/></svg></span>
   <div class="time-check-step">
    <span class="time-check-label">02 / RETRIEVAL</span>
    <p class="time-check-time">10:05 PM</p>
    <p class="time-check-text">Scena receives the same photo.</p>
   </div>
  </div>
  <p class="time-check-caption">In this example, the photo shows the space at 10:00 PM.</p>
 </div>
 ${map(k.cases,(x,i)=>`<article class="constraint-row"><span class="big-no">0${i+1}</span><div><h3>${x.title}</h3><p>${esc(x.constraint)}</p><div class="ux-response"><h4>UX response</h4><p>${esc(x.response)}</p></div></div><div>${figure(x.evidence)}${x.extra?figure(x.extra):''}</div></article>`)}
 <div class="collaboration"><div><span class="small blue">DESIGN × ENGINEERING</span><h3>Working from<br>the same prototype.</h3><div class="collab-chain"><span>Prototype (designer)</span><b class="chain-arrow" role="img" aria-label="to"><svg viewBox="0 0 86 60" fill="none" stroke="currentColor" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 30h77.4"/><path d="M57.4 6l24 24-24 24"/></svg></b><span>Build (engineer)</span><b class="chain-arrow" role="img" aria-label="to"><svg viewBox="0 0 86 60" fill="none" stroke="currentColor" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 30h77.4"/><path d="M57.4 6l24 24-24 24"/></svg></b><span>QA (designer)</span><b class="chain-arrow" role="img" aria-label="to"><svg viewBox="0 0 86 60" fill="none" stroke="currentColor" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 30h77.4"/><path d="M57.4 6l24 24-24 24"/></svg></b><span>On-site test (both)</span></div></div><div class="prose">${[].concat(k.collaboration).map(t=>`<p>${esc(t)}</p>`).join('')}</div></div>
</div></section>
<section class="wrap chapter validation" id="validation">
 ${label('05','Validation & next steps')}<h2 class="chapter-title">Built and tested.<br><span class="muted">Still learning.</span></h2><p class="validation-intro">${esc(v.heading)}</p>
 <div class="validation-ledger tested">${map(v.blocks,x=>`<article><h3>${(()=>{const t=x.title.split(' · ');return t.length>1?`<span class="no">${esc(t[0])}</span><span class="dot"> · </span>${esc(t.slice(1).join(' · '))}`:esc(x.title)})()}</h3><p>${esc(x.text)}</p></article>`)}</div>
</section>`;
root.querySelectorAll('.hero-deck > .links > a').forEach(link => {
  link.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' && event.isPrimary) {
      link.classList.add('is-pressed');
    }
  }, {passive: true});
  const clearPress = () => link.classList.remove('is-pressed');
  link.addEventListener('pointerup', clearPress);
  link.addEventListener('pointercancel', clearPress);
  link.addEventListener('lostpointercapture', clearPress);
});

const comparison = root.querySelector('#problem .comparison');
const photoRange = comparison.querySelector('#photo-range');
function updateComparison() {
  const before = photoRange.valueAsNumber;
  comparison.style.setProperty('--reveal', before + '%');
  photoRange.setAttribute('aria-valuetext', before + '% before, ' + (100 - before) + '% after');
}
photoRange.addEventListener('input', updateComparison);
updateComparison();
/* Decision 03 toggle: the dark pill slides (CSS) and the new screen is stacked on the old one and they cross-fade (no blank frame). */
{const seg=root.querySelector('.segmented'),ri=document.getElementById('result-image'),calm=matchMedia('(prefers-reduced-motion:reduce)').matches;let swapT;[d.c.left,d.c.right].forEach(x=>{const i=new Image();i.src=x.image.src});
root.querySelectorAll('[data-result]').forEach(b=>b.addEventListener('click',()=>{if(b.classList.contains('selected'))return;root.querySelectorAll('[data-result]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',x===b)});seg.dataset.active=b.dataset.result;const t=document.createElement('div');t.innerHTML=figure(d.c[b.dataset.result],'device');const nf=t.firstElementChild,im=nf.querySelector('img');im.loading='eager';nf.classList.add('is-entering');ri.appendChild(nf);(im.decode?im.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(nf!==ri.lastElementChild)return;void nf.offsetWidth;nf.classList.remove('is-entering');[...ri.children].forEach(c=>{if(c!==nf)c.classList.add('is-leaving')});clearTimeout(swapT);swapT=setTimeout(()=>{[...ri.children].forEach(c=>{if(c!==ri.lastElementChild)c.remove()})},calm?0:560);});}));}
// Step rail: the Decision whose top has passed a line 40% down the viewport is active (its number turns blue).
// One threshold, so nothing flickers at boundaries. Nothing is active before Decision 1 reaches the line;
// Decision 3 stays active until the bottom of its section passes the line (leaving Section 03).
(()=>{
 const steps=[...root.querySelectorAll('.rail-step')];
 const end=root.querySelector('#decision-c');
 if(!steps.length||!end) return;
 let current=-1, queued=false;
 const update=()=>{
  queued=false;
  const line=innerHeight*0.4;
  // Going back up needs a further 24px, so small scroll wobbles at a boundary don't toggle the state.
  const pad=24;
  let next=-1;
  steps.forEach((s,i)=>{if(s.getBoundingClientRect().top<=line+(i<=current?pad:0)) next=i});
  if(end.getBoundingClientRect().bottom<=line-(current===-1?0:pad)) next=-1;
  if(next===current) return;
  current=next;
  steps.forEach((s,i)=>s.classList.toggle('is-active',i===next));
 };
 const queue=()=>{if(!queued){queued=true;requestAnimationFrame(update)}};
 // Listen to scroll only while Section 03 is near the viewport.
 const region=[root.querySelector('#decisions'),root.querySelector('#decision-b'),end];
 const near=new Set();
 const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{e.isIntersecting?near.add(e.target):near.delete(e.target)});
  if(near.size){addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue)}
  else{removeEventListener('scroll',queue);removeEventListener('resize',queue)}
  queue();
 },{rootMargin:'100px 0px'});
 region.forEach(el=>el&&io.observe(el));
 update();
})();
root.addEventListener('error',e=>{if(e.target.tagName==='IMG'){const i=e.target;const fallback=document.createElement('div');fallback.className='missing';fallback.textContent='Image unavailable: '+i.alt;i.replaceWith(fallback)}},true);
})();
