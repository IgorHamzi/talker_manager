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

const nameValidate = (req, res, next) => { 
  const { name } = req.body;
  const status = 400;

  if (!name) return res.status(status).json({ message: 'O campo "name" é obrigatório' });

  if (name.length < 3) {
    return res.status(status).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const ageValidate = (req, res, next) => {
  const { age } = req.body;
  const status = 400;

  if (!age) return res.status(status).json({ message: 'O campo "age" é obrigatório' });

  if (age < 18) {
    return res.status(status).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

module.exports = {
  emailValidate,
  passwordValidate,
  nameValidate,
  ageValidate,
};
