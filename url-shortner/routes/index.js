var express = require('express');
var router = express.Router();

const Url = require("../models/Url");

router.get('/:code', async (req, res) => {
  
  let urlCode = req.params.code;

  try {
    const url = await Url.findOne({ urlCode });

    if(!url) {
      return res.status(404).json("No URL Found.").end();
    }

    res.redirect(url.longUrl);
  } catch (error) {
    return res.status(500).json(error).end();
  }

});

module.exports = router;
