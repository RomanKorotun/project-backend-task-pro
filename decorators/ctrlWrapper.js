const ctrlWrapper = (ctrl) => {
  // Створюємо функцію обгортку
  const fun = async (req, res, next) => {
    
    try {
      // Передаємо аргументи далі для функції в controllers
      await ctrl(req, res, next);
    } catch (error) {
      // Шукати далі  Middleware обробник помилок
      next(error);
    }
  };
  return fun;
};

export default ctrlWrapper;
