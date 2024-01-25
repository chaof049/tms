let validation = (userValidation) => {
  return (req, res, next) => {
    let data = userValidation.validate(req.body);
    let error = data.error;
    if (error) {
      res.json({
        success: false,
        message: error.details[0].message,
      });
    } else {
      next();
    }
  };
};

export default validation;
