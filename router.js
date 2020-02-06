const { Router } = require("express");
const Order = require("./Models/Order");
const csv = require("./utils/csv2josn");
const fs = require("fs");
const path = require("path");
const router = Router();

router.post("/upload", async (req, res) => {
  try {
    const csvData = req.files.file.data.toString("utf8");
    const csvJson = csv(csvData);
    for (let item of csvJson) {
      const order = new Order({
        ...item
      });
      await order.save();
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/orders", async (req, res) => {
  try {
    let data = await Order.find({});
    data = data.map((e, i) => {
      const obj = Object.assign(e)._doc;
      obj.num = i;
      return obj;
    });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});
router.get("/download", async (req, res) => {
  const data = await Order.find({ status: "approved" });
  await fs.open("orders.csv", "r+", err => {
    if (err) console.log(err);
    console.log("ok");
  });

  const orders = data.map(e => {
    const obj = Object.assign(e)._doc;
    delete obj._id;
    delete obj.__v;
    return obj;
  });

  let csvString = Object.keys(orders[0]).join(";") + "\r\n";
  csvString += orders.map(e => Object.values(e).join(";") + "\r\n").join("");

   fs.writeFile("orders.csv", csvString, err => {
    if (err) console.log(err);
    res.download(path.join(__dirname, "orders.csv"), err => {
      if (err) console.log(err);
      
      fs.unlink("orders.csv", err => {
        if (err) console.log(err);
      });
    });
  });
  
});
module.exports = router;
