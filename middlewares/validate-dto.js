function validateDto(ajvValidate) {
  return (req, res, next) => {
    const valid = ajvValidate(req.body);
    if (!valid) {
      const { errors } = ajvValidate;
      return res.status(400).json({
        status: 'Error',
        message: 'Validation Error',
        errors,
      });
    }
    next();
  };
}

module.exports = validateDto;
