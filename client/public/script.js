setTimeout(() =>{
    const hidden = document.getElementById('hidden');
    const targetElement = document.getElementById('main-navbar');
    const hiddenElement = document.getElementById('header-sidebar-toggle');
    const logo = document.getElementById('logo');

    // error was being thrown at `observerReveal.observe(hidden)`
    if (!hiddenElement) {
        return;
    }

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

    const observerReveal = new IntersectionObserver(handleIntersection);
    observerReveal.observe(hidden);

    function animateWhenVisible(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-text');
            observer.unobserve(entry.target);
        }
    });
    }
    const observerBlock = new IntersectionObserver(animateWhenVisible, { threshold: 0.5 });
    
    // Observe each element
    document.querySelectorAll('.quote').forEach(el => {
    observerBlock.observe(el);
    });
    function animateLeftFadeWhenVisible(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-left');
            observer.unobserve(entry.target);
        }
    });
    }
    function animateRightFadeWhenVisible(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-right');
            observer.unobserve(entry.target);
        }
    });
    }
    const observerLeftFade = new IntersectionObserver(animateLeftFadeWhenVisible, { threshold: 0.5 });
    const observerRightFade = new IntersectionObserver(animateRightFadeWhenVisible, { threshold: 0.5 });
    document.querySelectorAll('.fade-left').forEach(el => {
    observerLeftFade.observe(el);
    });
    document.querySelectorAll('.fade-right').forEach(el => {
    observerRightFade.observe(el);
    });


}, 500);

// $('.carousel').carousel();
