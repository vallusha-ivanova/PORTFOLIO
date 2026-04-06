// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    // Открытие/закрытие меню
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Закрытие меню при клике на ссылку
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Плавное появление шапки при скролле
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });

    // Анимация появления секций при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Применяем анимацию к секциям
    document.querySelectorAll('.about-content, .about-visual, .project-card, .contacts-content, .project-substrate, .project-texture-bg, .project-detail-title, .project-gallery-scroll, .project-navigation').forEach(el => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        }
    });

    // Hero-секция видна сразу
    const projectHero = document.querySelector('.project-hero');
    if (projectHero) {
        projectHero.style.opacity = '1';
        projectHero.style.transform = 'none';
    }

    // Кнопка "Наверх"
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Навигация между проектами
    const prevProjectBtn = document.getElementById('prevProject');
    const nextProjectBtn = document.getElementById('nextProject');

    if (prevProjectBtn && nextProjectBtn) {
        // Список страниц проектов
        const projectPages = [
            'project-page.html',
            'project-page-2.html',
            'project-page-3.html',
            'project-page-4.html',
            'project-page-5.html'
        ];

        // Определяем текущий проект
        const currentPage = window.location.pathname.split('/').pop() || 'project-page.html';
        const currentIndex = projectPages.indexOf(currentPage);

        // Зацикленная навигация
        const prevIndex = (currentIndex - 1 + projectPages.length) % projectPages.length;
        const nextIndex = (currentIndex + 1) % projectPages.length;

        prevProjectBtn.href = projectPages[prevIndex];
        nextProjectBtn.href = projectPages[nextIndex];

        // Управление с клавиатуры
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                window.location.href = projectPages[prevIndex];
            } else if (e.key === 'ArrowRight') {
                window.location.href = projectPages[nextIndex];
            }
        });
    }

    // Lightbox для галереи
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const galleryImages = document.querySelectorAll('.gallery-scroll-track .gallery-item img');

    if (lightbox && lightboxImg && galleryImages.length > 0) {
        let currentImageIndex = 0;

        // Открытие lightbox при клике на изображение
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', function() {
                currentImageIndex = index;
                lightboxImg.src = this.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Переключение изображений
        function showImage(index) {
            if (index < 0) index = galleryImages.length - 1;
            if (index >= galleryImages.length) index = 0;
            currentImageIndex = index;
            lightboxImg.src = galleryImages[currentImageIndex].src;
        }

        function nextImage() {
            showImage(currentImageIndex + 1);
        }

        function prevImage() {
            showImage(currentImageIndex - 1);
        }

        // Закрытие lightbox
        const closeLightbox = function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxPrev.addEventListener('click', prevImage);
        lightboxNext.addEventListener('click', nextImage);

        // Закрытие по клику вне изображения
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Управление с клавиатуры
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        });
    }
});
