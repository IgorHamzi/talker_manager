const emailValidate = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailTest = regex.test(email);
  const status = 400;

  if (!email) return res.status(status).json({ message: 'O campo "email" é obrigatório' });

  if (!emailTest) {
    return res.status(status).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const passwordValidate = (req, res, next) => {
  const { password } = req.body;
  const status = 400;

  if (!password) return res.status(status).json({ message: 'O campo "password" é obrigatório' });

  if (password.length < 6) {
    return res.status(status).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = {
  emailValidate,
  passwordValidate,
};
