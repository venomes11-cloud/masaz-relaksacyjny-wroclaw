
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
