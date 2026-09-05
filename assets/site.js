(function(){
  var header = document.querySelector('[data-header]');
  if (header){
    var onScroll = function(){
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks){
    navToggle.addEventListener('click', function(){
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  var waitlistForm = document.getElementById('waitlistForm');
  var waitlistSuccess = document.getElementById('waitlistSuccess');
  if (waitlistForm){
    waitlistForm.addEventListener('submit', function(e){
      e.preventDefault();
      waitlistForm.hidden = true;
      waitlistSuccess.hidden = false;
    });
  }

  document.querySelectorAll('.faq-item').forEach(function(item){
    var row = item.querySelector('.faq-q-row');
    if (!row) return;
    row.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      row.setAttribute('aria-expanded', String(!isOpen));
    });
  });
})();
