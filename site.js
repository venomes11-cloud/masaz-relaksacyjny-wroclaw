
/* Menu, slajdy hero, pasek mobilny, galeria, formularz: rezerwacja online albo zapytanie e-mail. */
(function(){
  var m=document.getElementById('menu');
  document.querySelectorAll('[data-menu-open]').forEach(function(b){b.addEventListener('click',function(){m.classList.add('open');});});
  document.querySelectorAll('[data-menu-close], #menu a').forEach(function(b){b.addEventListener('click',function(){m.classList.remove('open');});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')m.classList.remove('open');});
  var still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var imgs=[].slice.call(document.querySelectorAll('.slides img')),dots=document.querySelector('.hero .dots'),i=0;
  if(dots&&imgs.length>1){imgs.forEach(function(_,k){var s=document.createElement('span');if(!k)s.className='on';dots.appendChild(s);});}
  function show(n){i=n;imgs.forEach(function(x,k){x.classList.toggle('on',k===i);if(k===i)x.loading='eager';});if(dots)[].forEach.call(dots.children,function(d,k){d.classList.toggle('on',k===i);});}
  if(imgs.length>1&&!still)setInterval(function(){show((i+1)%imgs.length);},6000);
  var bar=document.querySelector('.stickybar'),hero=document.querySelector('.hero');
  if(bar&&hero){new IntersectionObserver(function(es){bar.classList.toggle('is-visible',!es[0].isIntersecting);}).observe(hero);}
  var tw=document.querySelector('.tower-bg');
  if(tw&&!still){var busy=false;addEventListener('scroll',function(){if(busy)return;busy=true;requestAnimationFrame(function(){busy=false;var r=tw.parentNode.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;tw.style.transform='translate3d(0,'+(-(r.top/innerHeight)*8-10).toFixed(2)+'%,0)';});},{passive:true});}
  function pl(s){var p=(s||'').split('-');return p.length===3?p[2]+'.'+p[1]+'.'+p[0]:s;}
  var f=document.getElementById('datebar');
  if(f)f.addEventListener('submit',function(e){e.preventDefault();var a=document.getElementById('dbFrom').value;
    if(f.dataset.rez){var b=document.getElementById('dbTo').value;location.href='/rezerwacja/?arrival='+encodeURIComponent(a)+'&departure='+encodeURIComponent(b);return;}
    var n=document.getElementById('dbN'),os=n?n.value:'';
    var body='Dzień dobry,\n\n'+f.dataset.tresc+'\nTermin: '+pl(a)+'\nLiczba osób: '+os+'\nTelefon: \n\nPozdrawiam';
    location.href='mailto:'+f.dataset.mail+'?subject='+encodeURIComponent(f.dataset.temat+' '+pl(a))+'&body='+encodeURIComponent(body);});
  function go(id){var t=document.getElementById(id);if(!t)return false;var y=t.getBoundingClientRect().top+scrollY-70;window.scrollTo({top:y,behavior:still?'auto':'smooth'});return true;}
  var home=location.pathname==='/'||location.pathname==='/index.html';
  document.querySelectorAll('a[data-to]').forEach(function(l){l.addEventListener('click',function(e){
    if(home){e.preventDefault();m.classList.remove('open');go(l.dataset.to);}else{try{sessionStorage.setItem('sc-to',l.dataset.to);}catch(x){}}});});
  if(home){var want=null;try{want=sessionStorage.getItem('sc-to');sessionStorage.removeItem('sc-to');}catch(x){}
    if(location.hash){want=location.hash.slice(1);history.replaceState(null,'',location.pathname+location.search);}
    if(want)setTimeout(function(){go(want);},150);}
  if('IntersectionObserver' in window&&!still){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.atut,.ap,.g-item,.plan,.faq-t .row,.seo-txt h3').forEach(function(el){if(el.getBoundingClientRect().top>innerHeight){el.classList.add('rv');io.observe(el);}});}
  var lb=document.getElementById('lb');
  if(lb){var li=lb.querySelector('img'),items=[].slice.call(document.querySelectorAll('.g-item')),cur=0;
    function op(k){cur=(k+items.length)%items.length;li.src=items[cur].getAttribute('href');li.alt=items[cur].dataset.alt;lb.querySelector('.lb-cap').textContent=items[cur].dataset.alt;if(!lb.open)lb.showModal();}
    items.forEach(function(a,k){a.addEventListener('click',function(e){e.preventDefault();op(k);});});
    lb.querySelector('.lb-x').addEventListener('click',function(){lb.close();});
    lb.querySelector('.lb-p').addEventListener('click',function(){op(cur-1);});
    lb.querySelector('.lb-n').addEventListener('click',function(){op(cur+1);});
    lb.addEventListener('click',function(e){if(e.target===lb)lb.close();});
    lb.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')op(cur-1);if(e.key==='ArrowRight')op(cur+1);});}
})();
/* karuzela wachlarzowa sterowana przewijaniem */
(function(){
  var sec=document.getElementById('zabiegi');if(!sec)return;
  var M=JSON.parse(document.getElementById('fc-data').textContent),N=M.length,start=+sec.dataset.start||0;
  var cards=[].slice.call(sec.querySelectorAll('.fc-card')),still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var P={0:[0,0,40,0,0,1,0],1:[222,18,-70,5,14,.84,.1],2:[378,60,-170,10.5,24,.7,.24],3:[500,110,-280,15,30,.58,.34]};
  var cur=-1,prevD=cards.map(function(){return null;}),k=1;
  sec.style.setProperty('--fc-n',N);
  function scale(){var w=sec.clientWidth,hk=(innerHeight-sec.querySelector('.fc-head').offsetHeight-300)/414;k=Math.min(1,hk,Math.max(.5,(w<700?w*.58:w*.3)/300));k=Math.max(.45,k);sec.style.setProperty('--fc-k',k.toFixed(3));}
  function off(i,a){var d=((i-a)%N+N)%N;if(d>N/2)d-=N;return d;}
  function tf(d){var a=Math.min(Math.abs(d),3),s=d<0?-1:1,p=P[a];
    return 'translate3d('+(s*p[0]*k).toFixed(1)+'px,'+(p[1]*k).toFixed(1)+'px,'+(p[2]*k).toFixed(1)+'px) rotateZ('+(s*p[3])+'deg) rotateY('+(s*p[4])+'deg) scale('+p[5]+')';}
  function cap(a){var t=sec.querySelector('.fc-txt');t.querySelector('.fc-t').textContent=M[a].t;t.querySelector('.fc-d').textContent=M[a].d;t.querySelector('.fc-m').textContent=M[a].m;
    sec.querySelector('.fc-rez').setAttribute('data-uslugi',M[a].kod);
    if(!still&&t.animate)t.animate([{opacity:0,filter:'blur(5px)',transform:'translateY(10px)'},{opacity:1,filter:'blur(0px)',transform:'translateY(0)'}],{duration:600,easing:'cubic-bezier(.16,1,.3,1)'});}
  function show(a,force){if(a===cur&&!force)return;cur=a;
    cards.forEach(function(c,i){var d=off(i,a),ad=Math.abs(d),pd=prevD[i];
      var jump=pd!==null&&Math.abs(d-pd)>3;if(jump){c.classList.add('no-t');}
      c.style.transform=tf(d);c.style.opacity=ad>2?0:1;c.style.zIndex=10-Math.min(ad,4);c.style.pointerEvents=ad>2?'none':'';
      c.querySelector('.fc-dim').style.opacity=P[Math.min(ad,3)][6];c.setAttribute('aria-hidden',ad>2);
      if(jump){void c.offsetWidth;c.classList.remove('no-t');}prevD[i]=d;});
    cap(a);}
  function idx(){var r=sec.getBoundingClientRect(),run=sec.offsetHeight-innerHeight;var p=run>0?Math.min(1,Math.max(0,-r.top/run)):0;
    sec.querySelector('.fc-prog span').style.width=(p*100).toFixed(1)+'%';return (start+Math.min(N-1,Math.floor(p*N)))%N;}
  function goTo(a){var steps=((a-start)%N+N)%N,run=sec.offsetHeight-innerHeight,y=sec.getBoundingClientRect().top+scrollY+(steps+.5)/N*run;
    window.scrollTo({top:y,behavior:still?'auto':'smooth'});}
  var busy=false;addEventListener('scroll',function(){if(busy)return;busy=true;requestAnimationFrame(function(){busy=false;show(idx());});},{passive:true});
  addEventListener('resize',function(){scale();show(cur<0?start:cur,true);});
  sec.querySelector('.fc-prev').addEventListener('click',function(){goTo((cur-1+N)%N);});
  sec.querySelector('.fc-next').addEventListener('click',function(){goTo((cur+1)%N);});
  cards.forEach(function(c,i){c.addEventListener('click',function(){if(i===cur){sec.querySelector('.fc-rez').click();}else goTo(i);});});
  var sx=null;sec.querySelector('.fc-stage').addEventListener('pointerdown',function(e){sx=e.clientX;});
  sec.querySelector('.fc-stage').addEventListener('pointerup',function(e){if(sx===null)return;var dx=e.clientX-sx;sx=null;if(Math.abs(dx)>40)goTo((cur+(dx<0?1:-1)+N)%N);});
  sec.addEventListener('keydown',function(e){if(e.key==='ArrowRight')goTo((cur+1)%N);if(e.key==='ArrowLeft')goTo((cur-1+N)%N);});
  if('IntersectionObserver' in window)new IntersectionObserver(function(es){document.body.classList.toggle('fc-on',es[0].isIntersecting);},{threshold:.15}).observe(sec);
  scale();show(idx(),true);
})();
/* okno usług i panel szczegółów (jak ponti.spa/zabiegi) */
(function(){
  var dlg=document.getElementById('uslugi');if(!dlg)return;
  var Dd=JSON.parse(document.getElementById('zk-data').textContent),C=Dd.cfg,K={};Dd.karty.forEach(function(c){K[c.kod]=c;});
  var zp=dlg.querySelector('.zp'),zin=zp.querySelector('.zp-in');
  function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function zl(v){return String(v).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' zł';}
  function link(id){return C.baza+'/personal/select-time?o=s'+id+'&'+C.utm;}
  function linkStrefa(){return C.baza+'/activity/select?o=act'+new Date().toISOString().slice(0,10)+'&'+C.utm;}
  function szczegoly(c,st){st=st||{w:0,o:0};var w=c.warianty[st.w]||c.warianty[0];
    var h='<p class="zp-krok">'+esc(c.katNazwa)+'</p><h3>'+esc(c.nazwa)+'</h3><div class="zp-gal"><div class="zp-tor">';
    c.galeria.forEach(function(g,i){h+='<figure><img src="'+g.src+'" alt="'+esc(g.alt||c.nazwa)+'"'+(i?' loading="lazy"':'')+'/>'+(g.podpis?'<figcaption>'+esc(g.podpis)+'</figcaption>':'')+'</figure>';});
    h+='</div>'+(c.galeria.length>1?'<button type="button" class="zp-strz zp-wstecz" aria-label="Poprzednie zdjęcie">‹</button><button type="button" class="zp-strz zp-dalej" aria-label="Następne zdjęcie">›</button><span class="zp-licz">1 / '+c.galeria.length+'</span>':'')+'</div>';
    h+='<p class="zp-opis">'+esc(c.opis)+'</p>'+(c.opisPo?'<p class="zp-opis">'+esc(c.opisPo)+'</p>':'');
    h+='<span class="zp-et">'+esc(c.przebiegTytul)+'</span><ul class="zp-lista">'+c.przebieg.map(function(p){return '<li>'+esc(p)+'</li>';}).join('')+'</ul>';
    h+='<span class="zp-et">Dla kogo</span><p class="zp-dla">'+esc(c.dlaKogo)+'</p>';
    var cena=zl(w.cena),czas=w.czas+' min';
    if(c.kod==='strefa-wylacznosc'){var o=C.wyl[st.o]||C.wyl[0];h+='<span class="zp-et">Liczba osób</span><div class="zetony">'+C.wyl.map(function(x,i){return '<button type="button" class="zeton'+(i===st.o?' wybrany':'')+'" data-o="'+i+'">'+esc(x.osoby)+' <small>'+esc(x.cena)+'</small></button>';}).join('')+'</div>';cena=o.cena;czas=(o.od<3?'2':'3')+' godz.';}
    else if(c.warianty.length>1){h+='<span class="zp-et">Długość</span><div class="zetony">'+c.warianty.map(function(x,i){return '<button type="button" class="zeton'+(i===st.w?' wybrany':'')+'" data-w="'+i+'">'+x.czas+' min <small>'+zl(x.cena)+'</small></button>';}).join('')+'</div>';}
    h+='<div class="zp-podsum"><div><b>'+esc(c.nazwa)+'</b><small>'+czas+(c.cenaDopisek?' · '+esc(c.cenaDopisek):'')+'</small></div><span class="zp-cena">'+cena+'</span></div>';
    h+='<button type="button" class="btn btn-gold zp-rez">Zarezerwuj</button>';
    zin.innerHTML=h;zin.scrollTop=0;
    var tor=zin.querySelector('.zp-tor'),lc=zin.querySelector('.zp-licz');
    if(lc){tor.addEventListener('scroll',function(){lc.textContent=(Math.round(tor.scrollLeft/tor.clientWidth)+1)+' / '+c.galeria.length;},{passive:true});
      zin.querySelector('.zp-wstecz').onclick=function(){tor.scrollBy({left:-tor.clientWidth,behavior:'smooth'});};
      zin.querySelector('.zp-dalej').onclick=function(){tor.scrollBy({left:tor.clientWidth,behavior:'smooth'});};}
    [].forEach.call(zin.querySelectorAll('[data-w]'),function(b){b.onclick=function(){szczegoly(c,{w:+b.dataset.w,o:0});};});
    [].forEach.call(zin.querySelectorAll('[data-o]'),function(b){b.onclick=function(){szczegoly(c,{w:0,o:+b.dataset.o});};});
    zin.querySelector('.zp-rez').onclick=function(){
      var url=null;if(c.kod==='strefa-dzielona')url=linkStrefa();else if(c.kod==='strefa-wylacznosc')url=link((C.wyl[st.o]||C.wyl[0]).usluga);else if(w.altegio)url=link(w.altegio);
      if(url){window.open(url,'_blank','noopener');return;}
      zin.innerHTML='<button type="button" class="zp-wroc">‹ Opis zabiegu</button><p class="zp-krok">Rezerwacja</p><h3>'+esc(c.nazwa)+'</h3><div class="zp-info"><b>Ten zabieg rezerwujemy telefonicznie</b><br/>Zadzwoń: '+esc(C.tel)+'. Dobierzemy dogodny termin.</div><div class="zp-akcje"><a class="btn btn-gold" href="tel:'+C.telH+'">Zadzwoń</a><button type="button" class="btn btn-line zp-inne">Inne zabiegi online →</button></div>';
      zin.querySelector('.zp-wroc').onclick=function(){szczegoly(c,st);};zin.querySelector('.zp-inne').onclick=zamknijPanel;};
    zp.hidden=false;requestAnimationFrame(function(){zp.classList.add('on');});}
  function zamknijPanel(){zp.classList.remove('on');}
  function open(kod){if(!dlg.open)dlg.showModal();document.documentElement.style.overflow='hidden';dlg.querySelector('.zk-in').scrollTop=0;
    if(kod&&K[kod])szczegoly(K[kod]);else zamknijPanel();}
  dlg.addEventListener('close',function(){document.documentElement.style.overflow='';zp.classList.remove('on');});
  document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-uslugi]');if(!b)return;e.preventDefault();e.stopPropagation();
    var m=document.getElementById('menu');if(m)m.classList.remove('open');open(b.getAttribute('data-uslugi'));},true);
  dlg.querySelector('.zk-x').onclick=function(){dlg.close();};zp.querySelector('.zp-x').onclick=zamknijPanel;
  dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close();});
  dlg.addEventListener('cancel',function(e){if(zp.classList.contains('on')){e.preventDefault();zamknijPanel();}});
  [].forEach.call(dlg.querySelectorAll('.zk-kafel'),function(el){el.addEventListener('click',function(){szczegoly(K[el.dataset.kod]);});el.addEventListener('keydown',function(e){if(e.key==='Enter')szczegoly(K[el.dataset.kod]);});});
})();
