const express = require('express');
const Razorpay = require('razorpay');
const keys = require('../config/keys');
const router = express.Router();

router.post('/orders', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const instance = new Razorpay({
      key_id: keys.RAZORPAY_KEY_ID,
      key_secret: keys.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency: currency,
      receipt: 'order_rcptid_11'
    };

    const order = await instance.orders.create(options);

    if (!order) {
      return res.status(500).send("Some error occurred");
    }
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
