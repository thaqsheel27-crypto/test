
// Mobile 100vh fix
function setVh(){
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVh(); window.addEventListener('resize', setVh);

// Header: toggle .scrolled + keep text black on glass
const header = document.querySelector('.site-header');
function onScroll(){
  const y = window.scrollY || window.pageYOffset;
  if(y > 6){ header?.classList.add('scrolled'); } else { header?.classList.remove('scrolled'); }
}
onScroll(); window.addEventListener('scroll', onScroll);

// Mobile nav
document.querySelectorAll('.menu-toggle').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const nav = btn.parentElement?.querySelector('.nav-links');
    nav?.classList.toggle('open');
  });
});

// Video helpers for landing pages: contain on small screens to avoid zoom/crop
function fitLandingVideo(video){
  if(!video) return;
  const mq = window.matchMedia('(max-width: 640px)');
  const apply = () => {
    if(mq.matches){
      video.style.objectFit = 'contain';
      video.style.backgroundColor = '#000'; // letterbox instead of white edge
    }else{
      video.style.objectFit = 'cover';
      video.style.backgroundColor = 'transparent';
    }
  };
  apply();
  mq.addEventListener('change', apply);
}

// Light lazy play when visible
function autoPlayWhenVisible(video){
  if(!video) return;
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ video.play().catch(()=>{}); }
      else { video.pause(); }
    });
  },{threshold:0.25});
  io.observe(video);
}

// Export small helpers
window.SiteHelpers = { fitLandingVideo, autoPlayWhenVisible };
