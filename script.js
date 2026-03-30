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
    document.querySelectorAll('.about-content, .about-visual, .project-card, .contacts-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

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
            'project-page-3.html'
        ];

        // Определяем текущий проект
        const currentPage = window.location.pathname.split('/').pop() || 'project-page.html';
        const currentIndex = projectPages.indexOf(currentPage);

        // Обновляем ссылки
        if (currentIndex > 0) {
            prevProjectBtn.href = projectPages[currentIndex - 1];
        } else {
            prevProjectBtn.style.opacity = '0.5';
            prevProjectBtn.style.pointerEvents = 'none';
        }

        if (currentIndex < projectPages.length - 1) {
            nextProjectBtn.href = projectPages[currentIndex + 1];
        } else {
            nextProjectBtn.style.opacity = '0.5';
            nextProjectBtn.style.pointerEvents = 'none';
        }

        // Обработка кликов
        prevProjectBtn.addEventListener('click', function(e) {
            if (this.style.pointerEvents === 'none') {
                e.preventDefault();
            }
        });

        nextProjectBtn.addEventListener('click', function(e) {
            if (this.style.pointerEvents === 'none') {
                e.preventDefault();
            }
        });

        // Управление с клавиатуры
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && prevProjectBtn.style.pointerEvents !== 'none') {
                window.location.href = prevProjectBtn.href;
            } else if (e.key === 'ArrowRight' && nextProjectBtn.style.pointerEvents !== 'none') {
                window.location.href = nextProjectBtn.href;
            }
        });
    }
});
