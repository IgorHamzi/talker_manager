const talkValidate = (req, res, next) => {
  const { talk } = req.body;
  const status = 400;

  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(status).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  next();
};

module.exports = talkValidate;