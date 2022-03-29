const rateValidate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const status = 400;

  if (rate > 5 || rate < 1) {
    return res.status(status).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = rateValidate;
