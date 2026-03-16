// Отключаем автовосстановление скролла браузера
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// ============================================
// КОНФИГУРАЦИЯ ГАЛЕРЕЙ
// ============================================
const GALLERIES = [
    { id: 'mini-gallery', path: '/images/mini/mini', count: 124 },
    { id: 'green-birthday-gallery', path: '/images/silver/silver-HB', count: 8 },
    { id: 'green-day-gallery', path: '/images/silver/green-day/green-day', count: 46 },
    { id: 'nezhnost-gallery', path: '/images/nezhnost/nezhnost', count: 17, numbers: [1,3,5,7,9,11,13,15,17] },
    { id: 'edinorog-gallery', path: '/images/edinorog/edinorog', count: 15 },
    { id: 'superheroes-gallery', path: '/images/supergeroi/supergeroi', count: 21 },
    { id: 'korobka-surpris-gallery', path: '/images/korobka-surpris/korobka-surpris-1', count: 17 },
    { id: 'malyshka-gallery', path: '/images/nezhnost/zayka', count: 15 },
    { id: 'malysh-gallery', path: '/images/first/1boy', count: 7 },
    { id: 'kot-dlya-kota-gallery', path: '/images/cat/black kat', count: 10 },
    { id: 'yagodny-miks-gallery', path: '/images/fruckti/arbuz', count: 9 },
    { id: 'muz-instrument-gallery', path: '/images/instrument/instrument', count: 3 },
    { id: 'aist-gallery', path: '/images/aist/aist', count: 10 },
    { id: 'hearts-gallery', path: '/images/heart/heart', count: 23 },
    { id: 'minecraft-gallery', path: '/images/main/main', count: 10 },
    { id: 'pikachu-gallery', path: '/images/pikachu/pikachu', count: 12 },
    { id: 'mimosa-march-gallery', path: '/images/march/March', count: 21 },
    { id: 'vypusk-karas-gallery', path: '/images/karas/karas-vipusk/karas-vipusk', count: 18 },
    { id: 'powder-white-gallery', path: '/images/fazenda/powder and white/powder and white', count: 22 }
];

// ============================================
// ФУНКЦИИ ДЛЯ НАВИГАЦИИ
// ============================================
function showPageFromHash() {
    const hash = window.location.hash.substring(1) || 'about';
    const page = document.getElementById('page-' + hash);
    if (page) {
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });
        page.classList.add('active');
    }
}

// Сохраняем позицию скролла перед уходом
function saveScrollPosition() {
    const currentPage = document.querySelector('.page.active')?.id || 'about';
    sessionStorage.setItem(`${currentPage}_scroll`, window.scrollY);
}

// Восстанавливаем позицию скролла при возврате
function restoreScrollPosition() {
    const currentPage = document.querySelector('.page.active')?.id || 'about';
    const savedPos = sessionStorage.getItem(`${currentPage}_scroll`);
    if (savedPos) {
        setTimeout(() => {
            window.scrollTo(0, parseInt(savedPos));
        }, 50);
    }
}

function showPage(pageId) {
    saveScrollPosition(); // Сохраняем позицию перед уходом

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const page = document.getElementById('page-' + pageId);
    if (page) {
        page.classList.add('active');
        window.location.hash = pageId;
    }
    closeMenu();
    closeAccordion();

    setTimeout(() => {
        restoreScrollPosition(); // Восстанавливаем позицию при возврате
    }, 50);
}

// ============================================
// ФУНКЦИИ ДЛЯ МЕНЮ
// ============================================
function toggleMenu() {
    document.getElementById('sidenav').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('show');
    const menuButton = document.querySelector('.menu-button');
    const isExpanded = document.getElementById('sidenav').classList.contains('open');
    menuButton.setAttribute('aria-expanded', isExpanded);
}

function closeMenu() {
    document.getElementById('sidenav').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
    document.querySelector('.menu-button').setAttribute('aria-expanded', 'false');
}

// ============================================
// ФУНКЦИИ ДЛЯ АККОРДЕОНА
// ============================================
function closeAccordion() {
    const content = document.getElementById('accordionContent');
    const arrow = document.getElementById('accordionArrow');
    const header = document.querySelector('.accordion-header');
    if (content && arrow) {
        content.classList.remove('open');
        arrow.classList.remove('open');
        header.setAttribute('aria-expanded', 'false');
    }
}

function toggleAccordion() {
    const content = document.getElementById('accordionContent');
    const arrow = document.getElementById('accordionArrow');
    const header = document.querySelector('.accordion-header');
    if (content && arrow) {
        const isOpen = content.classList.contains('open');
        content.classList.toggle('open');
        arrow.classList.toggle('open');
        header.setAttribute('aria-expanded', !isOpen);
    }
}

// ============================================
// ФУНКЦИИ ДЛЯ МОДАЛЬНОГО ОКНА
// ============================================
function openModal(src) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    modalImg.src = src;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Для доступности: перемещаем фокус в модальное окно
    setTimeout(() => {
        document.querySelector('.close').focus();
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// ============================================
// ГЕНЕРАЦИЯ ГАЛЕРЕЙ (ОПТИМИЗИРОВАННАЯ)
// ============================================
function generateGalleries() {
    GALLERIES.forEach(gallery => {
        const container = document.getElementById(gallery.id);
        if (!container) return;

        // Очищаем контейнер перед добавлением
        container.innerHTML = '';

        const numbers = gallery.numbers || Array.from({ length: gallery.count }, (_, i) => i + 1);
        
        numbers.forEach(num => {
            const column = document.createElement('div');
            column.className = 'column';
            const img = document.createElement('img');
            img.src = `${gallery.path} (${num}).jpg`;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.fetchpriority = 'low';
            img.alt = `Фото ${num} из галереи`;
            img.draggable = false;
            img.onclick = () => openModal(img.src);
            
            // Заглушка на случай битой ссылки
            img.onerror = function() {
                this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\' viewBox=\'0 0 200 200\'%3E%3Crect width=\'200\' height=\'200\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'50\' y=\'115\' font-family=\'Arial\' font-size=\'14\' fill=\'%23999\'%3EФото не найдено%3C/text%3E%3C/svg%3E';
                this.alt = 'Изображение временно недоступно';
            };
            
            column.appendChild(img);
            container.appendChild(column);
        });
    });
}

// ============================================
// ОБРАБОТЧИКИ СОБЫТИЙ
// ============================================
document.addEventListener('click', function(e) {
    const accordion = document.getElementById('accordion');
    const content = document.getElementById('accordionContent');
    const header = document.querySelector('.accordion-header');
    if (content && content.classList.contains('open') && accordion && !accordion.contains(e.target)) {
        content.classList.remove('open');
        const arrow = document.getElementById('accordionArrow');
        if (arrow) arrow.classList.remove('open');
        header.setAttribute('aria-expanded', 'false');
    }
});

document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
});

window.addEventListener('hashchange', showPageFromHash);

// Обработка клавиш для модального окна
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Если модальное окно открыто, не даем tab уходить на фон
    const modal = document.getElementById('photoModal');
    if (modal.style.display === 'block' && e.key === 'Tab') {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// ============================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// ============================================
window.addEventListener('load', function() {
    showPageFromHash();
    generateGalleries();
    
    // Восстанавливаем позицию после полной загрузки
    setTimeout(() => {
        restoreScrollPosition();
    }, 100);
});
