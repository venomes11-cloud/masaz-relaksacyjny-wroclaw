
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
/* okno usług: karuzela wachlarzowa, filtry, rezerwacja e-mailem */
(function(){
  var dlg=document.getElementById('uslugi');if(!dlg)return;
  var D=JSON.parse(document.getElementById('us-data').textContent),cards=[].slice.call(dlg.querySelectorAll('.fan-card')),vis=cards.slice(),act=0,kat=dlg.dataset.start||'Wszystkie';
  var still=matchMedia('(prefers-reduced-motion: reduce)').matches,$=function(s){return dlg.querySelector(s);};
  function lay(){var mob=innerWidth<700,step=mob?44:62,rot=mob?8:7;
    cards.forEach(function(c){c.style.display='none';c.classList.remove('act');});
    vis.forEach(function(c,k){var d=k-act,a=Math.abs(d);c.style.display='';
      c.style.transform='translateX('+(d*step)+'%) translateY('+(a*a*2.2)+'%) rotate('+(d*rot)+'deg) scale('+Math.max(.7,1-a*.07)+')';
      c.style.zIndex=100-a;c.style.opacity=a>3?0:1;c.style.pointerEvents=a>3?'none':'';if(!d)c.classList.add('act');});
    var u=D[+vis[act].dataset.i];$('.us-kat').textContent=u.kat;$('.us-nazwa').textContent=u.nazwa;$('.us-czas').textContent='Czas: '+u.czas;
    $('.us-opis').textContent=u.opis;$('.us-dla').textContent=u.dla||'';
    $('.us-zaw').innerHTML=(u.zawiera||[]).map(function(x){return '<li>W cenie: '+x.replace(/[<>&]/g,'')+'</li>';}).join('');
    $('.fan-n').textContent=(act+1)+' / '+vis.length;}
  function go(n){act=(n+vis.length)%vis.length;lay();}
  function filtr(k){kat=k;vis=cards.filter(function(c){return k==='Wszystkie'||c.dataset.kat===k;});act=Math.min(act,vis.length-1);if(act<0)act=0;
    dlg.querySelectorAll('.us-chip').forEach(function(b){b.classList.toggle('on',b.dataset.kat===k);});go(Math.floor((vis.length-1)/2));}
  function open(id){$('.us-form').hidden=true;id=id||dlg.dataset.focus;
    if(id){filtr(kat);if(!vis.some(function(c){return D[+c.dataset.i].id===id;}))filtr('Wszystkie');var k=vis.findIndex(function(c){return D[+c.dataset.i].id===id;});if(k>=0)act=k;lay();}else filtr(kat);
    if(!dlg.open)dlg.showModal();document.documentElement.style.overflow='hidden';}
  dlg.addEventListener('close',function(){document.documentElement.style.overflow='';});
  document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-uslugi]');if(!b)return;e.preventDefault();e.stopPropagation();
    var m=document.getElementById('menu');if(m)m.classList.remove('open');open(b.getAttribute('data-uslugi'));},true);
  $('.us-x').addEventListener('click',function(){dlg.close();});
  dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close();});
  $('.fan-p').addEventListener('click',function(){go(act-1);});$('.fan-nx').addEventListener('click',function(){go(act+1);});
  dlg.querySelectorAll('.us-chip').forEach(function(b){b.addEventListener('click',function(){filtr(b.dataset.kat);});});
  var sx=null,moved=false;
  $('.fan').addEventListener('pointerdown',function(e){sx=e.clientX;moved=false;});
  $('.fan').addEventListener('pointerup',function(e){if(sx===null)return;var dx=e.clientX-sx;sx=null;if(Math.abs(dx)>40){moved=true;go(act+(dx<0?1:-1));}});
  cards.forEach(function(c){c.addEventListener('click',function(){if(moved){moved=false;return;}var k=vis.indexOf(c);if(k===act){$('.us-rez').click();}else go(k);});});
  dlg.addEventListener('keydown',function(e){if(e.target.closest&&e.target.closest('input,select'))return;if(e.key==='ArrowLeft')go(act-1);if(e.key==='ArrowRight')go(act+1);});
  var wh=null;$('.fan').addEventListener('wheel',function(e){if(Math.abs(e.deltaX)<Math.abs(e.deltaY)||wh)return;e.preventDefault();go(act+(e.deltaX>0?1:-1));wh=setTimeout(function(){wh=null;},450);},{passive:false});
  addEventListener('resize',function(){if(dlg.open)lay();});
  $('.us-rez').addEventListener('click',function(){var f=$('.us-form');f.hidden=false;var u=D[+vis[act].dataset.i];
    f.querySelector('[name=o]').value=/dwojga/i.test(u.nazwa)?'2':'1';f.scrollIntoView({behavior:still?'auto':'smooth',block:'center'});f.querySelector('input').focus({preventScroll:true});});
  function pl(s){var p=(s||'').split('-');return p.length===3?p[2]+'.'+p[1]+'.'+p[0]:s;}
  $('.us-form').addEventListener('submit',function(e){e.preventDefault();var f=e.target,u=D[+vis[act].dataset.i];
    var body='Dzień dobry,\n\nproszę o rezerwację: '+u.nazwa+' ('+u.czas+').\nDzień: '+pl(f.d.value)+'\nPora: '+f.p.value+'\nLiczba osób: '+f.o.value+'\nTelefon: \n\nPozdrawiam';
    location.href='mailto:'+dlg.dataset.mail+'?subject='+encodeURIComponent('Rezerwacja: '+u.nazwa+' '+pl(f.d.value))+'&body='+encodeURIComponent(body);});
})();
