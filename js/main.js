/* Main JavaScript for Boss A Creations */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // GSAP Registration
    gsap.registerPlugin(ScrollTrigger);

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass', 'py-4', 'shadow-2xl');
            navbar.classList.remove('py-6');
        } else {
            navbar.classList.remove('glass', 'py-4', 'shadow-2xl');
            navbar.classList.add('py-6');
        }
    });

    // Video Carousel Logic
    const videos = [
        'assets/videos/video4.mp4',
        'assets/videos/video2.mp4',
        'assets/videos/video3.mp4'
    ];
    let currentVideoIndex = 0;
    const videoElements = [
        document.getElementById('hero-video-1'),
        document.getElementById('hero-video-2')
    ];
    let activeVideoBuffer = 0;

    const switchVideo = () => {
        const nextIndex = (currentVideoIndex + 1) % videos.length;
        const nextBuffer = (activeVideoBuffer + 1) % 2;

        const currentVideo = videoElements[activeVideoBuffer];
        const nextVideo = videoElements[nextBuffer];

        // Prepare next video
        nextVideo.src = videos[nextIndex];
        nextVideo.load();
        nextVideo.playbackRate = 0.3; // Even slower motion

        nextVideo.oncanplaythrough = () => {
            nextVideo.playbackRate = 0.3; // Re-verify on play
            nextVideo.play();
            gsap.to(nextVideo, { opacity: 1, duration: 2.0, ease: "power2.inOut" });
            gsap.to(currentVideo, {
                opacity: 0, duration: 2.0, ease: "power2.inOut", onComplete: () => {
                    currentVideo.pause();
                    currentVideo.src = ""; // Clear buffer
                }
            });

            activeVideoBuffer = nextBuffer;
            currentVideoIndex = nextIndex;
        };
    };

    // Initialize first video
    const initVideo = () => {
        const firstVideo = videoElements[0];
        firstVideo.src = videos[0];
        firstVideo.load();
        firstVideo.playbackRate = 0.3;
        firstVideo.oncanplaythrough = () => {
            firstVideo.playbackRate = 0.3;
            firstVideo.play();
            gsap.to(firstVideo, { opacity: 1, duration: 2.0 });
            // Start rotation every 7 seconds
            setInterval(switchVideo, 7000);
        };
    };

    initVideo();

    // Hero Animations
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });

    tl.to("#hero-title", { opacity: 1, y: 0, delay: 0.5 })
        .to("#hero-subtitle", { opacity: 1, y: 0 }, "-=1")
        .to("#hero-btns", { opacity: 1, y: 0 }, "-=1");

    // Scroll Animations for Menu Items
    gsap.utils.toArray('.menu-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            delay: i * 0.1,
            ease: "power3.out"
        });
    });

    // About Section Image Parallax
    gsap.to("#about img", {
        scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        y: -50,
        ease: "none"
    });

    // About Section Text Reveal
    gsap.from("#about h2, #about p", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 70%",
        },
        opacity: 0,
        x: 50,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Mobile Menu Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileMenu) {
        const toggleMenu = (open) => {
            if (open) {
                gsap.to(mobileMenu, { x: '0%', duration: 0.8, ease: "expo.out" });
                // Stagger reveal links
                gsap.fromTo('.mobile-link',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.4 }
                );
            } else {
                gsap.to(mobileMenu, { x: '100%', duration: 0.6, ease: "expo.in" });
            }
        };

        menuToggle.addEventListener('click', () => toggleMenu(true));
        menuClose.addEventListener('click', () => toggleMenu(false));

        // Auto-close on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
