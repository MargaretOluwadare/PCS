const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  const re = /^\+?1?\d{9,15}$/;
  return re.test(phone);
};

const validateDate = (date) => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d) && d > new Date();
};

const validateTime = (time) => {
  const re = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return re.test(time);
};

const validatePassword = (password) => {
  return password && password.length >= 8;
};

const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return input.trim().replace(/[<>]/g, '');
  }
  return input;
};

module.exports = {
  validateEmail,
  validatePhone,
  validateDate,
  validateTime,
  validatePassword,
  sanitizeInput,
};