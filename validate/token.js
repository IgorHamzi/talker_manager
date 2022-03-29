const tokenValidate = (req, res, next) => {
  const { authorization } = req.headers;
  const status = 401;

  if (!authorization) return res.status(status).json({ message: 'Token não encontrado' });

  if (authorization.length < 16) return res.status(status).json({ message: 'Token inválido' });

  next();
};

module.exports = tokenValidate;
