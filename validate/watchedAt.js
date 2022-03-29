const watchedAtValidate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  const date = regex.test(watchedAt);

  if (!date) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = watchedAtValidate;