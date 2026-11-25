'use strict';
// The exhibition demo keeps all data in this page; no payment or network submission.
const money=n=>'NT$'+n.toLocaleString('en-US');
const query=new URLSearchParams(location.search);
let styleState=null, filter='all', selection={}, cart=[], receipt=null;
const validId=id=>CHARMS.some(c=>c.id===id);
if(COLLECTIONS.some(c=>c.id===query.get('group')&&c.id!=='base'))filter=query.get('group');
try{if(query.has('style')){styleState=JSON.parse(query.get('style'));if(!Array.isArray(styleState.placed))throw Error();for(const [,id] of styleState.placed.slice(0,26))if(validId(id))selection[id]=(selection[id]||0)+1;}}catch(e){styleState=null;selection={};}
const count=()=>Object.values(selection).reduce((a,b)=>a+b,0);
const total=()=>cart.reduce((a,b)=>a+(b.kind==='gift'?2480:680*b.groups)*b.qty,0);
const validSelection=()=>count()>0&&count()%5===0;
const el=id=>document.getElementById(id);
const text=(id,v)=>el(id).textContent=v;
function renderSelection(){
 const n=count(), rem=n%5;
 text('selection-count',`${n} CHARMS / ${Math.floor(n/5)} COMPLETE SETS`);
 text('selection-price',validSelection()?money(n/5*680):`每 5 個 ${money(680)} · ${n===0?'請挑選鞋扣':`還差 ${5-rem} 個`}`);
 text('selection-hint',n===0?'從 17 款中任選，可重複選擇。':rem?`目前選了 ${n} 個。請增減至五的倍數後加入購物車。`: `目前選了 ${n} 個，共 ${n/5} 組，可以加入購物車。`);
 el('selection-add').disabled=!validSelection();
 el('adjust-options').innerHTML=n>0&&rem?`${n>=5?`<button data-adjust="down">PICK ${n-rem} / 移除 ${rem} 個 · ${money((n-rem)/5*680)}</button>`:''}<button data-adjust="up">MAKE IT ${n+5-rem} / 再選 ${5-rem} 個 · ${money((n+5-rem)/5*680)}</button>`:'';
 el('shop-products').innerHTML=CHARMS.filter(c=>filter==='all'||c.group===filter).map(c=>`<article class="shop-product"><img src="${c.image}" alt="${c.name}"><strong>${c.name}</strong><div class="qty"><button data-id="${c.id}" data-step="-1" aria-label="減少 ${c.name}" ${(selection[c.id]||0)===0?'disabled':''}>−</button><span>${selection[c.id]||0}</span><button data-id="${c.id}" data-step="1" aria-label="增加 ${c.name}" ${count()>=100?'disabled':''}>+</button></div></article>`).join('');
 el('shop-filters').innerHTML=[['all','ALL'],...COLLECTIONS.filter(c=>c.id!=='base').map(c=>[c.id,c.title])].map(([id,name])=>`<button class="filter-btn" data-group="${id}" aria-pressed="${filter===id}">${name}</button>`).join('');
}
function cartLabel(item){return item.kind==='gift'?'THE FULL CATCH.':`PICK YOUR FIVE × ${item.groups}`;}
function renderCart(){text('basket-count',cart.reduce((s,c)=>s+c.qty,0));text('basket-total',money(total()));el('checkout-open').disabled=!cart.length;el('basket-content').innerHTML=cart.length?cart.map((item,i)=>`<article class="basket-line"><h3>${cartLabel(item)}</h3>${item.kind==='gift'?'<p>06 CANS / 17 CHARMS + ACCESSORIES</p>':Object.entries(item.items).map(([id,n])=>{const c=CHARMS.find(c=>c.id===id);return `<div class="mini-row"><img src="${c.image}" alt="">${c.name} × ${n}</div>`}).join('')}<div class="qty"><button data-line="${i}" data-change="-1" aria-label="減少組數">−</button><span>${item.qty}</span><button data-line="${i}" data-change="1" aria-label="增加組數">+</button><button data-line="${i}" data-change="0">REMOVE</button></div><p>${money((item.kind==='gift'?2480:680*item.groups)*item.qty)}</p></article>`).join(''):'<p>購物籃目前沒有商品。</p>';}
function openBasket(){renderCart();if(!el('basket').open)el('basket').showModal();}
function orderLines(){return cart.map(item=>`${cartLabel(item)} × ${item.qty}   ${money((item.kind==='gift'?2480:680*item.groups)*item.qty)}`);}
function addGift(){const g=cart.find(i=>i.kind==='gift');if(g)g.qty++;else cart.push({kind:'gift',qty:1});openBasket();}
function addSelection(){if(!validSelection())return;cart.push({kind:'custom',groups:count()/5,items:{...selection},qty:1});selection={};renderSelection();openBasket();}
function receiptPNG(){if(!receipt)return;const canvas=document.createElement('canvas');canvas.width=900;canvas.height=380+receipt.lines.length*44+receipt.details.length*32;const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#1558d6';ctx.fillRect(0,0,900,22);ctx.fillStyle='#111';ctx.font='bold 46px monospace';ctx.fillText('YOUR CATCH IS READY!',45,90);ctx.font='24px monospace';ctx.fillText(receipt.id,45,135);ctx.fillText('ORDER RECEIPT / PREVIEW',45,175);let y=225;ctx.font='22px monospace';for(const line of receipt.lines){ctx.fillText(line,45,y);y+=44;}ctx.font='18px monospace';for(const line of receipt.details){ctx.fillText(line,65,y);y+=32;}ctx.font='bold 32px monospace';ctx.fillText('TOTAL '+money(receipt.total),45,y+35);for(let i=0;i<95;i++){ctx.fillRect(45+i*8,y+60,(i%3)+2,45);}const a=document.createElement('a');a.href=canvas.toDataURL('image/png');a.download='piko-receipt.png';a.click();}
document.addEventListener('DOMContentLoaded',()=>{
 el('gift-art').innerHTML=COLLECTIONS.map(c=>`<img src="${c.image}" alt="${c.title}">`).join('');
 if(styleState){el('shop-back').href='style-lab.html?restore='+encodeURIComponent(JSON.stringify(styleState));text('shop-back','← BACK TO STYLE LAB');}
 el('shop-products').addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(!b)return;const id=b.dataset.id,step=Number(b.dataset.step);if(!validId(id))return;if(step>0&&count()>=100)return;selection[id]=Math.max(0,(selection[id]||0)+step);if(!selection[id])delete selection[id];renderSelection();});
 el('shop-filters').addEventListener('click',e=>{const b=e.target.closest('[data-group]');if(b){filter=b.dataset.group;renderSelection();}});
 el('adjust-options').addEventListener('click',e=>{const b=e.target.closest('[data-adjust]');if(!b)return;filter='all';renderSelection();text('selection-hint',b.dataset.adjust==='down'?`請使用 − 按鈕自行移除 ${count()%5} 個鞋扣。`:`請使用 + 按鈕再加入 ${5-count()%5} 個鞋扣。`);});
 el('gift-add').onclick=addGift;el('selection-add').onclick=addSelection;el('basket-open').onclick=openBasket;el('basket-close').onclick=()=>el('basket').close();
 el('basket-content').addEventListener('click',e=>{const b=e.target.closest('[data-line]');if(!b)return;const i=Number(b.dataset.line),d=Number(b.dataset.change);if(!cart[i])return;if(!d||cart[i].qty+d<=0)cart.splice(i,1);else cart[i].qty+=d;renderCart();});
 el('checkout-open').onclick=()=>{if(!cart.length)return;el('basket').close();el('order-summary').replaceChildren(...orderLines().map(line=>{const p=document.createElement('p');p.textContent=line;return p;}));const t=document.createElement('strong');t.textContent='TOTAL '+money(total());el('order-summary').append(t);el('checkout').showModal();};
 const syncDelivery=()=>{const shipping=el('delivery').value==='宅配';el('address-field').hidden=!shipping;el('payment').replaceChildren(new Option(shipping?'貨到付款':'取貨付款'));};el('delivery').addEventListener('change',syncDelivery);syncDelivery();
 el('checkout-close').onclick=()=>{el('checkout').close();openBasket();};
 el('order-form').onsubmit=e=>{e.preventDefault();if(!cart.length)return;receipt={id:'PIKO-'+Date.now().toString(36).toUpperCase(),lines:orderLines(),details:cart.flatMap(item=>item.kind==='gift'?['06 CANS / 17 CHARMS + ACCESSORIES']:Object.entries(item.items).map(([id,n])=>`${CHARMS.find(c=>c.id===id).name} × ${n*item.qty}`)),total:total()};el('receipt-content').innerHTML='<span class="eyebrow">PIKO / ORDER RECEIPT</span><h2>YOUR CATCH IS READY!</h2><p>訂購流程已完成。</p><div class="receipt-lines"></div><div class="receipt-barcode"></div>';const lines=el('receipt-content').querySelector('.receipt-lines');for(const line of [receipt.id,...receipt.lines,...receipt.details,'TOTAL '+money(receipt.total)]){const p=document.createElement('p');p.textContent=line;lines.append(p);}cart=[];renderCart();el('order-form').reset();syncDelivery();el('checkout').close();el('receipt').showModal();};
 el('receipt-save').onclick=receiptPNG;el('receipt-close').onclick=()=>el('receipt').close();renderSelection();renderCart();if(styleState||filter!=='all')setTimeout(()=>el('pick').scrollIntoView(),100);
});
