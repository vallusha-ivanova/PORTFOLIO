// Переключение темы
const btn = document.getElementById('themeBtn');
btn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  // Сохраняем тему в localStorage
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Загружаем сохраненную тему при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }
});

// ===== МОДАЛЬНОЕ ОКНО ДЛЯ ИЗОБРАЖЕНИЙ =====

const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const imageTitle = document.getElementById('imageTitle');
const closeBtn = document.querySelector('.modal-close');
const galleryImages = document.querySelectorAll('.gallery-scroll img');

// Открытие модального окна при клике на изображение
galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    imageTitle.textContent = img.alt;
    
    // Блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
  });
});

// Закрытие модального окна при клике на крестик
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Закрытие модального окна при клике вне изображения
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Закрытие модального окна при нажатии клавиши ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});