/* Photo-based peel animation. Coordinates use the original 1536 x 1024 photograph. */
window.createCanMotion=function(canvas){
 const ctx=canvas.getContext('2d'), W=1536,H=1024; canvas.width=W;canvas.height=H;
 const imgs=['closed','lid','ring'].map(n=>{const i=new Image();i.src='assets/loader-'+n+'.webp';return i});
 const fish=new Image();fish.src="assets/fish-whole.png";
 const ready=Promise.all([...imgs,fish].map(i=>i.decode()));
 const outline=new Path2D('M 150 438 Q 180 370 280 339 L 945 164 Q 1080 130 1178 190 Q 1240 225 1360 405 Q 1410 480 1334 535 Q 1280 574 1160 606 L 490 755 Q 310 793 238 709 L 150 548 Q 119 486 150 438 Z');
 const clamp=x=>Math.max(0,Math.min(1,x));const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
 // Local longitudinal axis follows the photographed can, from pull end to far end.
 const ox=230,oy=590,ux=.962,uy=-.273,vx=.273,vy=.962,L=1120;
 function local(x,y){return [(x-ox)*ux+(y-oy)*uy,(x-ox)*vx+(y-oy)*vy]}
 function world(u,v,z=0){return [ox+u*ux+v*vx,oy+u*uy+v*vy-z]}
 function triangle(img,s,t){const [a,b,c]=s,[d,e,f]=t;const x=b[0]-a[0],y=b[1]-a[1],z=c[0]-a[0],w=c[1]-a[1],det=x*w-y*z;if(!det)return;const A=((e[0]-d[0])*w-(f[0]-d[0])*y)/det,B=((e[1]-d[1])*w-(f[1]-d[1])*y)/det,C=((f[0]-d[0])*x-(e[0]-d[0])*z)/det,D=((f[1]-d[1])*x-(e[1]-d[1])*z)/det;ctx.save();ctx.beginPath();ctx.moveTo(...d);ctx.lineTo(...e);ctx.lineTo(...f);ctx.closePath();ctx.clip();ctx.transform(A,B,C,D,d[0]-A*a[0]-C*a[1],d[1]-B*a[0]-D*a[1]);ctx.drawImage(img,0,0);ctx.restore()}
 const texture=document.createElement('canvas');texture.width=W;texture.height=H;const tc=texture.getContext('2d');
 function draw(p){if(imgs.some(i=>!i.complete||!i.naturalWidth))return;ctx.clearRect(0,0,W,H);ctx.drawImage(imgs[0],0,0);if(p<=.15)return;
 const lift=smooth((p-.15)/.15), peel=smooth((p-.30)/.60), front=-180+peel*1280;
 // The opening is inside the existing rolled rim; the photographed side wall stays fixed.
 ctx.save();ctx.clip(outline);const g=ctx.createLinearGradient(180,350,550,850);g.addColorStop(0,'#383b40');g.addColorStop(.3,'#777b80');g.addColorStop(.65,'#b8b9ba');g.addColorStop(1,'#55585d');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.lineWidth=35;ctx.strokeStyle='#30333888';ctx.stroke(outline);
 // Fish sits inside the rim, underneath the peeling metal.
 if(fish.naturalWidth){ctx.save();ctx.translate(765,455);ctx.rotate(-.277);ctx.scale(1,.72);ctx.drawImage(fish,-480,-174,960,348);ctx.restore();}
 ctx.restore();
 tc.clearRect(0,0,W,H);tc.save();tc.clip(outline);tc.drawImage(imgs[1],0,0);tc.restore();
 // Progressive curl: the unpeeled portion stays flat, the released metal bends upward.
 function bend(u,v){let q=Math.max(0,front-u),r=235;let theta=Math.min(q/r,2.75);let extra=Math.max(0,q-r*2.75);return world(front-r*Math.sin(theta)-extra*Math.cos(theta),v,r*(1-Math.cos(theta))+extra*Math.sin(theta))}
 function map(u,v){return u>=front?world(u,v):bend(u,v)}
 const lo=-250,hi=1300,vs=-440,ve=440;for(let u=hi;u>lo;u-=18){let u0=Math.max(lo,u-18);let s=[world(u0,vs),world(u,vs),world(u,ve),world(u0,ve)],t=[map(u0,vs),map(u,vs),map(u,ve),map(u0,ve)];triangle(texture,[s[0],s[1],s[2]],[t[0],t[1],t[2]]);triangle(texture,[s[0],s[2],s[3]],[t[0],t[2],t[3]])}
 const [ru,rv]=local(383,567);const pivot=map(ru,rv);const angle=Math.min(Math.max(0,front-ru)/235,2.75);ctx.save();ctx.translate(...pivot);ctx.rotate(-angle*.65);ctx.transform(1,0,-.12*lift,1-.55*lift,0,0);ctx.translate(-383,-567);ctx.drawImage(imgs[2],0,0);ctx.restore();
 }
 return {ready,draw};
};
