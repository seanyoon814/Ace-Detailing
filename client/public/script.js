setTimeout(() =>{
    const hidden = document.getElementById('hidden');
    const targetElement = document.getElementById('main-navbar');
    const hiddenElement = document.getElementById('header-sidebar-toggle');
    const logo = document.getElementById('logo');
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            hiddenElement.style.opacity = 0;
            logo.style.opacity = 0;
            logo.style.display ='none';
            targetElement.style.position = 'fixed';
            hiddenElement.style.display = 'none';
          }
          else
          {
            targetElement.style.position = 'absolute';
            hiddenElement.style.display = 'block';
            logo.style.display = 'block';
            setTimeout(() => {
                hiddenElement.style.opacity = 1;
                logo.style.opacity = 1;
            }, 50);
          }
        });
      }

    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(hidden);
}, 1000)

$('.carousel').carousel()
