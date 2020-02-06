const { Router } = require("express");
const Order = require("./Models/Order");
const csv = require("./utils/csv2josn");
const copyObj = require("./utils/copyObj");
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
    let data = await Order.find({});
    data = copyObj(data);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/orders", async (req, res) => {
  try {
    let data = await Order.find({});
    data = copyObj(data);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/download", async (req, res) => {
  try {
    const data = await Order.find({ status: "approved" });
    const orders = data.map(e => {
      const obj = Object.assign(e)._doc;
      delete obj._id;
      delete obj.__v;
      return obj;
    });

    let csvString = Object.keys(orders[0]).join(";") + "\r\n";
    csvString += orders.map(e => Object.values(e).join(";") + "\r\n").join("");

    fs.writeFile(path.join(__dirname, "orders.csv"), csvString, err => {
      if (err) console.log(err);
      res.download(path.join(__dirname, "orders.csv"), err => {
        if (err) console.log(err);
        fs.unlink(path.join(__dirname, "orders.csv"), err => {
          if (err) console.log(err);
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
