const error = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.body = {
      status: "服务器出错",
      error: error.message
    };
  }
};

module.exports = error;
