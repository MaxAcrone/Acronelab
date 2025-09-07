// Общие анимации для повторного использования

// Анимация появления снизу вверх
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Анимация появления слева
export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

// Анимация появления справа
export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

// Анимация появления с масштабированием
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Контейнер с отложенным появлением дочерних элементов
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Анимация прозрачности
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

// Анимация для кнопок
export const buttonAnimation = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 15 }
};

// Анимация для карточек
export const cardAnimation = {
  whileHover: { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" },
  transition: { duration: 0.2 }
};
