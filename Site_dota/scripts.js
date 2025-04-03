document.addEventListener("DOMContentLoaded", function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const menu = document.querySelector(".menu");
    
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener("click", function() {
        menu.classList.toggle("active");
      });
    }
    
    // Dropdown Menu for Mobile
    const dropdownLinks = document.querySelectorAll(".has-dropdown > a");
    
    dropdownLinks.forEach(link => {
      link.addEventListener("click", function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const dropdown = this.nextElementSibling;
          dropdown.classList.toggle("active");
          
          // Toggle the chevron icon
          const icon = this.querySelector("i");
          if (icon.classList.contains("fa-chevron-down")) {
            icon.classList.remove("fa-chevron-down");
            icon.classList.add("fa-chevron-up");
          } else if (icon.classList.contains("fa-chevron-up")) {
            icon.classList.remove("fa-chevron-up");
            icon.classList.add("fa-chevron-down");
          } else if (icon.classList.contains("fa-chevron-right")) {
            icon.classList.remove("fa-chevron-right");
            icon.classList.add("fa-chevron-down");
          } else {
            icon.classList.remove("fa-chevron-down");
            icon.classList.add("fa-chevron-right");
          }
        }
      });
    });
    
    // Slider Functionality
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    
    if (slider && slides.length > 0) {
      let currentSlide = 0;
      const slideCount = slides.length;
      
      // Set initial position
      slider.style.transform = `translateX(0)`;
      
      // Update dots
      function updateDots() {
        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === currentSlide);
        });
      }
      
      // Go to slide
      function goToSlide(index) {
        currentSlide = (index + slideCount) % slideCount;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
      }
      
      // Next slide
      function nextSlide() {
        goToSlide(currentSlide + 1);
      }
      
      // Previous slide
      function prevSlide() {
        goToSlide(currentSlide - 1);
      }
      
      // Event listeners
      if (prevBtn) prevBtn.addEventListener("click", prevSlide);
      if (nextBtn) nextBtn.addEventListener("click", nextSlide);
      
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => goToSlide(index));
      });
      
      // Auto slide
      let slideInterval = setInterval(nextSlide, 5000);
      
      // Pause on hover
      slider.addEventListener("mouseenter", () => {
        clearInterval(slideInterval);
      });
      
      slider.addEventListener("mouseleave", () => {
        slideInterval = setInterval(nextSlide, 5000);
      });
    }
    
    // Tooltip Blocks
    const tooltipHeaders = document.querySelectorAll(".tooltip-header");
    
    tooltipHeaders.forEach(header => {
      header.addEventListener("click", function() {
        const tooltipBlock = this.parentElement;
        tooltipBlock.classList.toggle("active");
        
        // Toggle the chevron icon
        const icon = this.querySelector("i");
        if (icon) {
          icon.style.transition = "transform 0.3s ease";
          if (tooltipBlock.classList.contains("active")) {
            icon.style.transform = "rotate(180deg)";
          } else {
            icon.style.transform = "rotate(0)";
          }
        }
      });
    });
    
    // Hero Modal Functionality
    const modal = document.getElementById("heroModal");
    const closeModal = document.querySelector("#heroModal .close-modal");
    const flipCards = document.querySelectorAll(".flip-card");
    
    // Hero data for the modal
    const heroData = {
      "Джаггернаут": {
        name: "Джаггернаут",
        type: "Ловкость",
        image: "images/juggernaut.jpg",
        description: "Юрнеро, Джаггернаут — это герой ближнего боя на основе ловкости, чьи способности позволяют ему врываться в бой и безрассудно опустошать врагов в непроницаемом вихре клинков.",
        strength: 70,
        agility: 90,
        intelligence: 40,
        abilities: [
          { name: "Клинковый Вихрь", icon: "images/abilities/blade-fury.jpg" },
          { name: "Целебный Тотем", icon: "images/abilities/healing-ward.jpg" },
          { name: "Клинковый Танец", icon: "images/abilities/blade-dance.jpg" },
          { name: "Всеразрез", icon: "images/abilities/omnislash.jpg" }
        ]
      },
      "Кристал Мейден": {
        name: "Кристал Мейден",
        type: "Интеллект",
        image: "images/crystal-maiden.jpg",
        description: "Райлай, Кристал Мейден — это герой дальнего боя на основе интеллекта, который использует свои мощные способности на основе льда, чтобы замедлять и замораживать врагов на месте.",
        strength: 40,
        agility: 35,
        intelligence: 85,
        abilities: [
          { name: "Кристаллический Нова", icon: "images/abilities/crystal-nova.jpg" },
          { name: "Обморожение", icon: "images/abilities/frostbite.jpg" },
          { name: "Тайная Аура", icon: "images/abilities/arcane-aura.jpg" },
          { name: "Ледяное Поле", icon: "images/abilities/freezing-field.jpg" }
        ]
      },
      "Акс": {
        name: "Акс",
        type: "Сила",
        image: "images/axe.jpg",
        description: "Могул Хан, Акс — это герой ближнего боя на основе силы, который преуспевает в том, чтобы заставлять врагов атаковать его и контратаковать в ответ.",
        strength: 90,
        agility: 30,
        intelligence: 35,
        abilities: [
          { name: "Клич Берсерка", icon: "images/abilities/berserkers-call.jpg" },
          { name: "Боевой Голод", icon: "images/abilities/battle-hunger.jpg" },
          { name: "Контр Спираль", icon: "images/abilities/counter-helix.jpg" },
          { name: "Карающий Клинок", icon: "images/abilities/culling-blade.jpg" }
        ]
      },
      "Инвокер": {
        name: "Инвокер",
        type: "Интеллект",
        image: "images/invoker.jpg",
        description: "Каэль, Инвокер — это герой дальнего боя на основе интеллекта, который может призывать арсенал заклинаний благодаря своей уникальной способности комбинировать магические элементы.",
        strength: 35,
        agility: 40,
        intelligence: 95,
        abilities: [
          { name: "Квас", icon: "images/abilities/quas.jpg" },
          { name: "Векс", icon: "images/abilities/wex.jpg" },
          { name: "Экзорт", icon: "images/abilities/exort.jpg" },
          { name: "Инвок", icon: "images/abilities/invoke.jpg" }
        ]
      },
      "Фантом Ассасин": {
        name: "Фантом Ассасин",
        type: "Ловкость",
        image: "images/phantom-assassin.jpg",
        description: "Мортред, Фантом Ассасин — это герой ближнего боя на основе ловкости, который специализируется на нанесении огромного критического урона и быстром перемещении по полю боя.",
        strength: 50,
        agility: 95,
        intelligence: 30,
        abilities: [
          { name: "Кинжал", icon: "images/abilities/stifling-dagger.jpg" },
          { name: "Размытие", icon: "images/abilities/blur.jpg" },
          { name: "Смертельный Удар", icon: "images/abilities/coup-de-grace.jpg" },
          { name: "Переворот", icon: "images/abilities/phantom-strike.jpg" }
        ]
      },
      "Пудж": {
        name: "Пудж",
        type: "Сила",
        image: "images/pudge.jpg",
        description: "Пудж, Мясник — это герой ближнего боя на основе силы, известный своим крюком, который может захватывать врагов издалека и подтягивать их к себе для расчленения.",
        strength: 95,
        agility: 25,
        intelligence: 30,
        abilities: [
          { name: "Мясницкий Крюк", icon: "images/abilities/meat-hook.jpg" },
          { name: "Гниение", icon: "images/abilities/rot.jpg" },
          { name: "Груда Плоти", icon: "images/abilities/flesh-heap.jpg" },
          { name: "Расчленение", icon: "images/abilities/dismember.jpg" }
        ]
      }
    };
    
    // Функция для открытия модального окна героя
    function openHeroModal(heroName) {
      const hero = heroData[heroName];
      
      if (hero) {
        // Заполняем модальное окно данными героя
        document.getElementById("modalHeroName").textContent = hero.name;
        document.getElementById("modalHeroType").textContent = hero.type;
        document.getElementById("modalHeroImage").src = hero.image;
        document.getElementById("modalHeroDescription").textContent = hero.description;
        
        // Добавляем значения к меткам статистики
        const strengthLabel = document.querySelector('.stat:nth-child(1) .stat-label');
        const agilityLabel = document.querySelector('.stat:nth-child(2) .stat-label');
        const intelligenceLabel = document.querySelector('.stat:nth-child(3) .stat-label');
        
        if (strengthLabel) strengthLabel.setAttribute('data-value', hero.strength + '%');
        if (agilityLabel) agilityLabel.setAttribute('data-value', hero.agility + '%');
        if (intelligenceLabel) intelligenceLabel.setAttribute('data-value', hero.intelligence + '%');
        
        // Сначала сбрасываем ширину полос статистики
        document.getElementById("strengthBar").style.width = "0";
        document.getElementById("agilityBar").style.width = "0";
        document.getElementById("intelligenceBar").style.width = "0";
        
        // Устанавливаем ширину полос статистики с небольшой задержкой для анимации
        setTimeout(() => {
          document.getElementById("strengthBar").style.width = `${hero.strength}%`;
          document.getElementById("agilityBar").style.width = `${hero.agility}%`;
          document.getElementById("intelligenceBar").style.width = `${hero.intelligence}%`;
        }, 100);
        
        // Очищаем и заполняем способности
        const abilitiesContainer = document.getElementById("modalHeroAbilities");
        abilitiesContainer.innerHTML = "";
        
        hero.abilities.forEach((ability) => {
          const abilityElement = document.createElement("div");
          abilityElement.className = "ability";
          
          // Используем заглушку, если изображение отсутствует
          const imgSrc = ability.icon || "images/placeholder-ability.jpg";
          
          abilityElement.innerHTML = `
            <img src="${imgSrc}" alt="${ability.name}">
            <span>${ability.name}</span>
          `;
          
          abilitiesContainer.appendChild(abilityElement);
        });
        
        // Показываем модальное окно
        modal.style.display = "block";
        
        // Предотвращаем прокрутку на body
        document.body.style.overflow = "hidden";
      }
    }
    
    // Обработчики событий для карточек героев
    flipCards.forEach(card => {
      // Обработчик для клика на всю карточку
      card.addEventListener("click", function(e) {
        // Получаем имя героя из заголовка карточки
        const heroName = this.querySelector("h3").textContent;
        openHeroModal(heroName);
        e.stopPropagation(); // Предотвращаем всплытие события
      });
    });
    
    // Закрытие модального окна героя
    if (closeModal) {
      closeModal.addEventListener("click", function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }
    
    // Закрытие модального окна героя при клике вне его
    window.addEventListener("click", function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
    
    // Registration Modal
    const registerModal = document.getElementById("registerModal");
    const openRegisterBtn = document.getElementById("openRegisterModal");
    const closeRegisterModal = registerModal ? registerModal.querySelector(".close-modal") : null;
    const registerForm = document.getElementById("registerForm");
    
    // Open registration modal
    if (openRegisterBtn) {
      openRegisterBtn.addEventListener("click", function() {
        registerModal.style.display = "block";
        document.body.style.overflow = "hidden";
      });
    }
    
    // Close registration modal
    if (closeRegisterModal) {
      closeRegisterModal.addEventListener("click", function() {
        registerModal.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }
    
    // Close registration modal when clicking outside
    window.addEventListener("click", function(event) {
      if (event.target === registerModal) {
        registerModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
    
    // Handle registration form submission
    if (registerForm) {
      registerForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        
        // Simple validation
        if (password !== confirmPassword) {
          alert("Пароли не совпадают!");
          return;
        }
        
        // Here you would typically send the data to a server
        // For demo purposes, we'll just show a success message
        alert(`Регистрация успешна! Добро пожаловать, ${username}!`);
        registerModal.style.display = "none";
        document.body.style.overflow = "auto";
        registerForm.reset();
      });
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
      const elements = document.querySelectorAll(".info-card, .community-card, .floating-block, .flip-card, .tooltip-block");
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }
      });
    };
    
    // Set initial styles for animation
    const elementsToAnimate = document.querySelectorAll(".info-card, .community-card, .floating-block, .flip-card, .tooltip-block");
    elementsToAnimate.forEach(element => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
    
    // Run animation on scroll
    window.addEventListener("scroll", animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
  });