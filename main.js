
function initPreloader(){
 const loader=document.querySelector('#preloader');if(!loader)return;
 const bar=loader.querySelector('.loader-progress-track'),fill=loader.querySelector('#loader-progress-fill'),label=loader.querySelector('#loader-percent'),skip=loader.querySelector('#loader-skip');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let completed=false,closing=false,done=0;
 // Only the essential above-the-fold images are tracked. Remaining images are lazy-loaded.
 const essential=['assets/loading-can.webp','assets/fish-whole.png','assets/fish-cut.png'];
 const total=essential.length;
 const update=()=>{const n=Math.round(done/total*100);fill.style.width=n+'%';label.textContent=String(n).padStart(2,'0')+'%';bar.setAttribute('aria-valuenow',String(n))};
 const finish=()=>{if(closing)return;closing=true;loader.classList.add('is-opening');const delay=reduced?0:950;window.setTimeout(()=>{loader.classList.add('is-hidden');window.setTimeout(()=>loader.remove(),reduced?30:550)},delay)};
 const mark=()=>{done++;update();if(done===total){completed=true;window.setTimeout(finish,reduced?0:240)}};
 essential.forEach(src=>{const image=new Image();image.onload=mark;image.onerror=mark;image.src=src;if(image.complete){/* onload still fires for cached resources in modern browsers */}});
 // A slow connection never traps the visitor. Skip is available after a short wait.
 window.setTimeout(()=>{if(!completed)skip.hidden=false},2400);
 skip.addEventListener('click',finish);
 window.setTimeout(()=>{if(!closing){skip.hidden=false;finish()}},12000);
 update();
}
"use strict";
/* Editable demo content. Replace filenames, product copy, and charm placeholders here. */
const COLLECTIONS=[
 {id:'plastic',title:'PLASTIC',zh:'塑膠系列',image:'assets/can-01.webp',description:'塑膠系列造型展示。待補上實際材質、商品照片與產品故事。',items:['商品造型 A（待補）','商品造型 B（待補）','商品造型 C（待補）']},
 {id:'glass',title:'GLASS',zh:'玻璃系列',image:'assets/can-02.webp',description:'玻璃系列造型展示。待補上實際使用材料與安全處理資訊。',items:['商品造型 A（待補）','商品造型 B（待補）']},
 {id:'marine',title:'MARINE LIFE',zh:'海洋生物系列',image:'assets/can-03.webp',description:'海洋生物主題造型展示；造型主題不等同實際材料來源。',items:['商品造型 A（待補）','商品造型 B（待補）']},
 {id:'net',title:'FISHING NET',zh:'漁網系列',image:'assets/can-04.webp',description:'漁網系列造型展示。待補上實際回收與製作資訊。',items:['商品造型 A（待補）','商品造型 B（待補）']},
 {id:'button',title:'BUTTON PARTS',zh:'鈕扣配件',image:'assets/can-05.webp',description:'供實體 DIY 組裝使用的鈕扣配件。',items:['鈕扣組裝零件（待補）']},
 {id:'shoe',title:'SHOE PARTS',zh:'鞋扣配件',image:'assets/can-06.webp',description:'供實體 DIY 組裝使用的鞋扣底座。',items:['鞋扣底座（待補）']}
];
const SHOE_COLORS=[['奶油白','#f1ede2','assets/shoes-pair.png'],['經典黑','#292929','assets/shoes-black.png'],['奶茶棕','#b99b7b','assets/shoes-brown.png'],['粉霧紅','#f3b8c5','assets/shoes-pink.png'],['天空藍','#a6d7f2','assets/shoes-blue.png'],['薄荷綠','#a7d8c3','assets/shoes-mint.png'],['奶油黃','#f5db82','assets/shoes-yellow.png']];
const CHARMS=[{id:'p1',group:'plastic',name:'塑膠 01',symbol:'✦',color:'#1558d6'},{id:'p2',group:'plastic',name:'塑膠 02',symbol:'◆',color:'#ff8b36'},{id:'g1',group:'glass',name:'玻璃 01',symbol:'◇',color:'#3daab2'},{id:'g2',group:'glass',name:'玻璃 02',symbol:'✧',color:'#79c9a6'},{id:'m1',group:'marine',name:'海洋 01',symbol:'★',color:'#f4772d'},{id:'m2',group:'marine',name:'海洋 02',symbol:'✿',color:'#f69bc2'},{id:'n1',group:'net',name:'漁網 01',symbol:'✳',color:'#35866f'},{id:'n2',group:'net',name:'漁網 02',symbol:'✣',color:'#7552b8'}];
const $=(s,root=document)=>root.querySelector(s);const $$=(s,root=document)=>[...root.querySelectorAll(s)];
function initBase(){const header=$('#header');if(header){const sync=()=>header.classList.toggle('is-scrolled',window.scrollY>30);window.addEventListener('scroll',sync,{passive:true});sync()}const toggle=$('#menu-toggle'),mobile=$('#mobile-nav');if(toggle&&mobile){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));mobile.hidden=!open});$$('a',mobile).forEach(a=>a.addEventListener('click',()=>{mobile.hidden=true;toggle.setAttribute('aria-expanded','false')}))}initPreloader();const reveals=$$('.reveal');if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});reveals.forEach(el=>io.observe(el))}else reveals.forEach(el=>el.classList.add('is-visible'))}
function initCollection(){const grid=$('#can-grid'),modal=$('#can-modal');if(!grid||!modal)return;grid.innerHTML=COLLECTIONS.map((c,i)=>`<button class="shelf-can" type="button" data-can="${i}" aria-label="查看${c.zh}" title="${c.zh}"><img src="${c.image}" alt="PIKO ${c.zh}罐頭包裝" loading="lazy"><span class="visually-hidden">${c.title} — ${c.zh}</span></button>`).join('');let index=0;const render=()=>{const c=COLLECTIONS[index];$('#modal-img').src=c.image;$('#modal-img').alt=`PIKO ${c.zh}罐頭包裝提案`;$('#modal-counter').textContent=`0${index+1} / 06`;$('#modal-title').textContent=c.title;$('#modal-desc').textContent=c.description;const tryOn=$('#modal-try-on');if(tryOn){const match=CHARMS.find(ch=>ch.group===c.id);tryOn.href='style-lab.html'+(match?'?charm='+encodeURIComponent(match.id):'');tryOn.textContent=match?'TRY IT ON ↗':'EXPLORE STYLE LAB ↗';}$('#modal-items').innerHTML=c.items.map(t=>`<span class="product-chip">${t}</span>`).join('')};const open=i=>{index=i;render();modal.showModal()};$$('[data-can]',grid).forEach(btn=>btn.addEventListener('click',()=>open(Number(btn.dataset.can))));$('#modal-close').addEventListener('click',()=>modal.close());$('#modal-prev').addEventListener('click',()=>{index=(index+5)%6;render()});$('#modal-next').addEventListener('click',()=>{index=(index+1)%6;render()});modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});modal.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){index=(index+1)%6;render()}if(e.key==='ArrowLeft'){index=(index+5)%6;render()}});let x=null;modal.addEventListener('touchstart',e=>{x=e.touches[0].clientX},{passive:true});modal.addEventListener('touchend',e=>{if(x===null)return;const d=e.changedTouches[0].clientX-x;if(Math.abs(d)>65){index=(index+(d<0?1:5))%6;render()}x=null},{passive:true})}
function initCompare(){
 if(!document.querySelector('#compare') || !document.querySelector('#material-description')) return;
 const materialData={plastic:{before:'PLASTIC WASTE',after:'PLASTIC CHARMS',description:'塑膠廢棄物 → 待補上再製成品',image:'assets/before-plastic.png'},glass:{before:'DISCARDED GLASS',after:'GLASS ACCESSORIES',description:'廢棄玻璃 → 待補上再製成品',image:'assets/before-glass.png'},net:{before:'ABANDONED NETS',after:'NET CHARMS',description:'廢棄漁網 → 待補上再製成品',image:'assets/before-net.png'}};
 const switches=$$('[data-material]');const updateMaterial=(key)=>{const data=materialData[key];switches.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.material===key)));$('#material-description').textContent=data.description;$('.compare-before>span').textContent='BEFORE / '+data.before;$('.compare-after>span').textContent='AFTER / '+data.after;$('.compare-before .material-art').innerHTML=`<img src="${data.image}" alt="${data.before} 實物照片">`;$('.compare-after .material-art').replaceChildren();$('#compare').dataset.material=key;};switches.forEach(button=>button.addEventListener('click',()=>updateMaterial(button.dataset.material)));updateMaterial('plastic');
 const range=$('#compare-range');if(!range)return;const update=()=>{$('#compare-after').style.clipPath=`inset(0 0 0 ${range.value}%)`;$('#compare-divider').style.left=range.value+'%'};range.addEventListener('input',update);update()}
function initLab(){
 const stage=$('#shoe-stage');if(!stage)return;
 const swatches=$('#color-swatches'),palette=$('#charm-palette'),filters=$('#charm-filters'),holes=$('#shoe-holes'),status=$('#lab-status');
 const requestedCharm=new URLSearchParams(window.location.search).get('charm');const initialCharm=CHARMS.find(c=>c.id===requestedCharm);let selected=initialCharm?initialCharm.id:'p1',filter=initialCharm?initialCharm.group:'all',shoeColor=SHOE_COLORS[0][1],shoeImage=SHOE_COLORS[0][2];
 // Photo pixel coordinates / 1334 × 1179, measured from the actual shoe image.
 // These are the visible 13 holes per shoe, not guessed SVG geometry.
 const left=[[246,704],[375,725],[522,722],[317,785],[447,783],[243,808],[533,819],[373,860],[293,901],[456,895],[536,926],[370,967],[460,998]];
 const right=[[791,722],[938,726],[1066,706],[866,784],[997,786],[780,814],[1071,814],[940,861],[774,922],[856,895],[1022,904],[849,998],[940,967]];
 const positions=[...left,...right].map(([x,y])=>[x/1334*100,y/1179*100]);
 const placed=new Map();const say=t=>status.textContent=t;
 const renderHoles=()=>{holes.innerHTML='';positions.forEach(([x,y],i)=>{
  const b=document.createElement('button');b.type='button';b.className='shoe-hole';b.style.left=x+'%';b.style.top=y+'%';b.setAttribute('aria-label',`${i<left.length?'左':'右'}鞋孔位 ${i+1}${placed.has(i)?'，已有鞋扣':''}`);
  const charm=CHARMS.find(c=>c.id===placed.get(i));if(charm){const s=document.createElement('span');s.className='placed-charm';s.textContent=charm.symbol;s.style.color=charm.color;b.append(s)}
  b.addEventListener('click',()=>{if(placed.get(i)===selected){placed.delete(i);say('已移除鞋扣')}else{placed.set(i,selected);say(`已放置 ${CHARMS.find(c=>c.id===selected).name}`)}renderHoles()});
  b.addEventListener('dragover',e=>{e.preventDefault();b.classList.add('drop-target')});b.addEventListener('dragleave',()=>b.classList.remove('drop-target'));
  b.addEventListener('drop',e=>{e.preventDefault();const id=e.dataTransfer.getData('text/plain');if(CHARMS.some(c=>c.id===id)){placed.set(i,id);selected=id;renderHoles();renderPalette();say('鞋扣已放置')}});
  holes.append(b)
 })};
 // Dragging onto a hole's small visual target is difficult. Snap to the closest hole if within 4% of photo width.
 stage.addEventListener('dragover',e=>e.preventDefault());stage.addEventListener('drop',e=>{if(e.target.closest('.shoe-hole'))return;e.preventDefault();const id=e.dataTransfer.getData('text/plain');if(!CHARMS.some(c=>c.id===id))return;const r=stage.getBoundingClientRect();const x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;let best=-1,dist=Infinity;positions.forEach(([px,py],i)=>{const d=Math.hypot(px-x,py-y);if(d<dist){dist=d;best=i}});if(dist<5&&best>=0){placed.set(best,id);selected=id;renderHoles();renderPalette();say('已吸附到最近鞋孔')}else say('請拖曳到鞋面孔位')});
 const renderPalette=()=>{palette.innerHTML='';CHARMS.filter(c=>filter==='all'||c.group===filter).forEach(c=>{const b=document.createElement('button');b.type='button';b.className='charm-item';b.draggable=true;b.setAttribute('aria-pressed',String(selected===c.id));b.innerHTML=`<span class="charm-emoji" style="color:${c.color}">${c.symbol}</span><small>${c.name}</small>`;b.addEventListener('click',()=>{selected=c.id;renderPalette();say(`已選擇 ${c.name}，請點選鞋孔`)});b.addEventListener('dragstart',e=>e.dataTransfer.setData('text/plain',c.id));palette.append(b)})};
 swatches.innerHTML=SHOE_COLORS.map(([name,color,image],i)=>`<button class="swatch" type="button" title="${name}" aria-label="${name}" aria-pressed="${i===0}" style="background:${color}" data-image="${image}" data-color="${color}"></button>`).join('');
 $$('.swatch',swatches).forEach(b=>b.addEventListener('click',()=>{shoeColor=b.dataset.color;shoeImage=b.dataset.image;$('.shoe-photo',stage).src=shoeImage;$$('.swatch',swatches).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));say(`鞋色已切換為 ${b.getAttribute('aria-label')}`)}));
 const groupNames=[['all','全部'],['plastic','塑膠'],['glass','玻璃'],['marine','海洋生物'],['net','漁網']];filters.innerHTML=groupNames.map(([id,n])=>`<button type="button" class="filter-btn" data-filter="${id}" aria-pressed="${id==='all'}">${n}</button>`).join('');
 $$('.filter-btn',filters).forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;$$('.filter-btn',filters).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderPalette()}));
 const clear=()=>{placed.clear();renderHoles();say('已清除全部鞋扣')};$('#clear-style').addEventListener('click',clear);$('#reset-lab').addEventListener('click',clear);
 const saveButton=$('#download-style');
 saveButton.addEventListener('click',async()=>{
  if(saveButton.disabled)return;
  saveButton.disabled=true;
  const originalLabel=saveButton.textContent;
  saveButton.textContent='SAVING…';
  try{
   // Use the actual selected shoe photograph, preserving all material details.
   // A file:// image taints Canvas in Chromium, even when it lives beside this HTML.
   // Use bundled data URLs for export so the canvas stays origin-clean offline.
   const exportSrc=window.PIKO_EXPORT_SHOES && window.PIKO_EXPORT_SHOES[shoeImage];
   if(!exportSrc)throw new Error('找不到鞋款匯出素材，請確認 shoe-export-assets.js 已載入');
   const img=new Image();
   img.src=exportSrc;
   if(!img.complete||!img.naturalWidth){await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=()=>reject(new Error('鞋款圖片載入失敗'))})}
   if(!img.naturalWidth)throw new Error('鞋款圖片無法讀取');
   const canvas=document.createElement('canvas');
   canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;
   const ctx=canvas.getContext('2d');
   if(!ctx)throw new Error('瀏覽器無法建立圖片畫布');
   ctx.fillStyle='#f4772d';ctx.fillRect(0,0,canvas.width,canvas.height);
   ctx.drawImage(img,0,0,canvas.width,canvas.height);
   ctx.font=`bold ${Math.round(canvas.width*48/1334)}px Arial, sans-serif`;
   ctx.textAlign='center';ctx.textBaseline='middle';
   positions.forEach(([x,y],i)=>{
    const c=CHARMS.find(v=>v.id===placed.get(i));
    if(c){ctx.fillStyle=c.color;ctx.fillText(c.symbol,x/100*canvas.width,y/100*canvas.height)}
   });
   const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('PNG 圖片產生失敗')),'image/png'));
   const url=URL.createObjectURL(blob);
   const link=document.createElement('a');
   link.href=url;link.download='piko-my-style.png';
   document.body.appendChild(link);link.click();link.remove();
   // Delay revocation so the browser has time to start the download.
   window.setTimeout(()=>URL.revokeObjectURL(url),60000);
   say('已產生 PNG，請查看瀏覽器下載項目。');
  }catch(err){console.error('SAVE MY STYLE failed:',err);say('儲存失敗：'+(err.message||'請稍後再試'))}
  finally{saveButton.disabled=false;saveButton.textContent=originalLabel}
 });
 renderHoles();renderPalette();if(initialCharm){const active=$(`[data-filter="${filter}"]`,filters);if(active){$$('.filter-btn',filters).forEach(b=>b.setAttribute('aria-pressed',String(b===active)))}say(`已從商品介紹帶入 ${initialCharm.name}，請點選鞋孔放置。`)}
}

function initFish(){
 const root=$('#fish-interaction'),scene=$('#fish-scene'),again=$('#fish-again');if(!root||!scene)return;
 let start=null,done=false;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const cut=()=>{if(done)return;done=true;root.classList.add('is-cut');root.classList.remove('is-dragging');$('#fish-hint').textContent='THE OCEAN IS INSIDE.';window.setTimeout(()=>{again.hidden=false},reduced?0:950)};
 scene.addEventListener('pointerdown',e=>{if(done)return;start={x:e.clientX,y:e.clientY};scene.setPointerCapture(e.pointerId);root.classList.add('is-dragging')});
 scene.addEventListener('pointermove',e=>{if(!start||done)return;const rect=scene.getBoundingClientRect();const delta=e.clientY-start.y;const dx=e.clientX-start.x;scene.style.setProperty('--cut-progress',Math.min(1,Math.max(0,delta/Math.max(50,rect.height*.4))));if(delta>rect.height*.22&&Math.abs(dx)<rect.width*.75)cut()});
 scene.addEventListener('pointerup',e=>{if(!start||done)return;const rect=scene.getBoundingClientRect();if(e.clientY-start.y>rect.height*.15)cut();else{root.classList.remove('is-dragging');scene.style.setProperty('--cut-progress',0)}start=null});
 scene.addEventListener('pointercancel',()=>{start=null;root.classList.remove('is-dragging')});
 again.addEventListener('click',()=>{done=false;start=null;root.classList.remove('is-cut','is-dragging');again.hidden=true;scene.style.setProperty('--cut-progress',0);$('#fish-hint').innerHTML='DRAG TO CUT ↘<small>按住滑鼠沿斜線劃過魚身 / 手指滑動</small>'});
}
function initExtras(){
 const grid=$('#extras-grid'),modal=$('#extras-modal');if(!grid||!modal)return;
 const works=[
 {en:'SEAFOOD SPECIAL',zh:'橘色明信片',type:'POSTCARDS / 01',image:'assets/postcard-orange.png',detail:'以海鮮料理與塑膠廢棄物的拼貼，借用菜單語言反諷海洋污染。',spec:'直式明信片／尺寸與紙材待補'},
 {en:'FRESHLY CAUGHT',zh:'藍色明信片',type:'POSTCARDS / 02',image:'assets/postcard-blue.png',detail:'以魚鉤、魚與裝滿廢棄物的塑膠袋呈現海洋生物面臨的污染威脅。',spec:'直式明信片／尺寸與紙材待補'},
 {en:'BUSINESS CARD',zh:'名片',type:'BRAND IDENTITY',detail:'品牌名片正反面與視覺識別延伸。',spec:'正式作品與規格待補'},
 {en:'INSTRUCTION GUIDE',zh:'說明書',type:'USER GUIDE',detail:'鞋扣及鈕扣配件的使用方式與品牌資訊。',spec:'正式作品與規格待補'},
 {en:'STICKERS',zh:'貼紙',type:'GRAPHIC EXTRAS',detail:'品牌視覺延伸貼紙。',spec:'正式作品與規格待補'}
 ];
 const visual=w=>w.image?`<img class="extra-print" src="${w.image}" alt="${w.zh} — ${w.en}">`:`<div class="extra-pending"><span>${w.type}</span><strong>${w.en}</strong><small>作品待補 / COMING SOON</small></div>`;
 grid.classList.add('extras-editorial');
 grid.innerHTML=works.map((w,i)=>`<button class="extra-object extra-object--${i}" type="button" data-extra="${i}" aria-label="查看${w.zh}介紹">${visual(w)}<span class="extra-label">0${i+1} / ${w.zh} <span>↗</span></span></button>`).join('');
 let current=0;const render=()=>{const w=works[current];$('#extras-modal-art').innerHTML=visual(w);$('#extras-modal-count').textContent=`0${current+1} / 0${works.length}`;$('#extras-modal-title').textContent=w.en;$('#extras-modal-zh').textContent=w.zh;$('#extras-modal-desc').textContent=w.detail;$('#extras-modal-spec').textContent=w.spec;};
 const step=d=>{current=(current+d+works.length)%works.length;render()};
 const open=i=>{current=i;render();modal.showModal()};$$('[data-extra]',grid).forEach(b=>b.addEventListener('click',()=>open(Number(b.dataset.extra))));
 $('#extras-close').addEventListener('click',()=>modal.close());$('#extras-prev').addEventListener('click',()=>step(-1));$('#extras-next').addEventListener('click',()=>step(1));modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});modal.addEventListener('keydown',e=>{if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1)});
 let touchX=null;modal.addEventListener('touchstart',e=>{touchX=e.touches[0].clientX},{passive:true});modal.addEventListener('touchend',e=>{if(touchX===null)return;const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>65)step(dx<0?1:-1);touchX=null},{passive:true});
}
document.addEventListener('DOMContentLoaded',()=>{initBase();initCollection();initCompare();initFish();initLab();initExtras()});