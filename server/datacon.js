const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();
const axios = require("axios");

// to be able to access from anywhere
router.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Credentials", "true");
  ctx.set("Access-Control-Allow-Origin", "*");
  await next();
});

router.options("*", async (ctx, next) => {
  ctx.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.status = 204;
  await next();
});

router.get("/coin", async (ctx, next) => {
  // get coin list from api
  const url = "https://api.coinmarketcap.com/v1/ticker/";

  const coinList = await axios.get(url);
  // check if symbol exist in coin list
  const index = coinList.data.findIndex(
    e => e.symbol.toLowerCase() === ctx.query.search.toLowerCase()
  );

  let resObj;
  if (index > -1) {
    // if coin exist, get price and symbol
    resObj = {
      status: "success",
      symbol: ctx.query.search.toUpperCase(),
      price: coinList.data[index].price_usd
    };
  } else {
    resObj = {
      status: "error"
    };
  }

  // send response to request
  ctx.body = JSON.stringify(resObj);
  return next();
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
