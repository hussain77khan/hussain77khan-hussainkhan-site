(function(){
  const depth=Number(document.body.dataset.depth||'0');
  const base=depth===0?'':'../'.repeat(depth);
  const currentLang=()=>document.documentElement.lang||localStorage.getItem('hk-lang')||'ar';
  const pick=(v)=> typeof v==='object' && v!==null && !Array.isArray(v) ? (v[currentLang()] ?? v.en ?? v.ar ?? '') : (v ?? '');
  const esc=(s)=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const img=(path)=> path && !/^https?:\/\//i.test(path) ? base+path : path;
  async function load(){
    try{
      const r=await fetch(base+'data/content.json?ts='+Date.now(),{cache:'no-store'});
      if(!r.ok) throw new Error('content '+r.status);
      window.HK_CONTENT=await r.json();
      apply();
      document.dispatchEvent(new CustomEvent('hk-content-loaded',{detail:window.HK_CONTENT}));
    }catch(e){console.warn('HK content load failed',e)}
  }
  function apply(){
    const c=window.HK_CONTENT||{};
    document.querySelectorAll('[data-content]').forEach(el=>{
      const path=el.dataset.content.split('.'); let v=c; for(const k of path) v=v?.[k]; if(v!==undefined) el.textContent=pick(v);
    });
    if(c.site?.heroImage){const h=document.querySelector('.hero-bg');if(h)h.style.backgroundImage=`linear-gradient(90deg,rgba(7,7,8,.96),rgba(7,7,8,.70),rgba(7,7,8,.24)),url('${img(c.site.heroImage)}')`}
    const roles=document.querySelector('[data-content-roles]'); if(roles&&Array.isArray(c.home?.roles)) roles.innerHTML=c.home.roles.map(x=>`<span>${esc(x)}</span>`).join('');
    renderFilms(c.films||[]); renderPlugins(c.plugins||[]); renderDctl(c.dctl||[]); renderDownloads(c); renderProduct(c);
    const key=c.contact?.web3formsAccessKey; const keyInput=document.querySelector('input[name="access_key"]'); if(keyInput&&key) keyInput.value=key;
  }
  function renderFilms(items){const root=document.querySelector('[data-films-list]');if(!root)return;root.innerHTML=items.map(f=>`<article class="card"><img class="card-media" src="${esc(img(f.image||'assets/img/film-card.jpg'))}" alt="${esc(pick(f.title))}"><div class="card-body"><span class="tag">${esc(f.type||'FILM')}</span><h3>${esc(pick(f.title))}</h3><p>${esc(pick(f.description))}</p>${f.url?`<a class="card-link" href="${esc(f.url)}">↗</a>`:''}</div></article>`).join('')||'<div class="notice">No films yet.</div>'}
  function renderPlugins(items){const root=document.querySelector('[data-plugins-list]');if(!root)return;root.innerHTML=items.map(p=>`<article class="card"><img class="card-media" src="${esc(img(p.image||'assets/img/plugin-card.jpg'))}" alt="${esc(p.name)}"><div class="card-body"><span class="tag">${esc(p.type||'PLUGIN')}</span><h3>${esc(p.name)}</h3><p>${esc(pick(p.description))}</p>${p.page?`<a class="card-link" href="${esc(base+p.page)}">${currentLang()==='ar'?'التفاصيل':'Details'}</a>`:''}</div></article>`).join('')||'<div class="notice">No plugins yet.</div>'}
  function renderDctl(items){const root=document.querySelector('[data-dctl-list]');if(!root)return;root.innerHTML=items.map(p=>`<article class="card"><img class="card-media" src="${esc(img(p.image||'assets/img/dctl-card.jpg'))}" alt="${esc(p.name)}"><div class="card-body"><span class="tag">${esc(p.type||'DCTL')}</span><h3>${esc(p.name)}</h3><p>${esc(pick(p.description))}</p>${p.download?`<a class="card-link" href="${esc(p.download)}">${currentLang()==='ar'?'تنزيل':'Download'}</a>`:''}</div></article>`).join('')||'<div class="notice">No DCTL products yet.</div>'}
  function renderDownloads(c){const root=document.querySelector('[data-downloads-list]');if(!root)return;const rows=[];(c.plugins||[]).forEach(p=>{if(p.downloadMac)rows.push([p.name+' — macOS',p.downloadMac]);if(p.downloadWindows)rows.push([p.name+' — Windows',p.downloadWindows]);if(p.manual)rows.push([p.name+' — Manual',p.manual])});(c.dctl||[]).forEach(p=>{if(p.download)rows.push([p.name,p.download])});(c.downloads||[]).forEach(d=>rows.push([pick(d.title)||d.name,d.url]));root.innerHTML=rows.length?rows.map(r=>`<a class="download-item" href="${esc(r[1])}" target="_blank" rel="noopener"><span>${esc(r[0])}</span><span class="gold">↓</span></a>`).join(''):'<div class="notice">Download links will appear here after you add them from Admin.</div>'}
  function renderProduct(c){if(document.body.dataset.product!=='hk-cinematic-suite')return;const p=(c.plugins||[]).find(x=>x.id==='hk-cinematic-suite');if(!p)return;document.querySelectorAll('[data-product-name]').forEach(x=>x.textContent=p.name);document.querySelectorAll('[data-product-description]').forEach(x=>x.textContent=pick(p.description));document.querySelectorAll('[data-product-version]').forEach(x=>x.textContent=p.version||'');document.querySelectorAll('[data-product-platform]').forEach(x=>x.textContent=p.platform||'');document.querySelectorAll('[data-product-host]').forEach(x=>x.textContent=p.host||'');const root=document.querySelector('[data-product-downloads]');if(root){const arr=[];if(p.downloadMac)arr.push(['macOS',p.downloadMac]);if(p.downloadWindows)arr.push(['Windows',p.downloadWindows]);if(p.manual)arr.push(['Manual',p.manual]);root.innerHTML=arr.length?arr.map(([n,u])=>`<a class="download-item" href="${esc(u)}" target="_blank" rel="noopener"><strong>${esc(p.name)} — ${esc(n)}</strong><span class="gold">↓</span></a>`).join(''):'<div class="notice">Add installer and manual links from Admin.</div>'}}
  document.addEventListener('hk-language-changed',apply);
  document.addEventListener('DOMContentLoaded',load);
})();
