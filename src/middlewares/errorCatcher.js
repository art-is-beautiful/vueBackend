const errorCatcher = async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err.isJoi) {
        ctx.throw(400, err.details[0].message);
      }
      if (err.isPassport) {
        ctx.throw(400, err.message);
      }
      console.log(err);
      ctx.throw(err.status || 500, err.message);
    }
};

module.exports = { errorCatcher };