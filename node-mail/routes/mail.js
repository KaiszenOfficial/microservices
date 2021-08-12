const debug   = require("debug")("node-mail:mail");
const express = require('express');
const router  = express.Router();
const config  = require("config");
const _       = require("lodash");

router.post('/', (req, res) => {
  
  debug(req.body);

  return res.formatter.ok();
});

router.get("/templates/:templateId", (req, res) => {

  let templateId = req.params.templateId;
  let mailTemplates = config.get("templates");

  if(_.indexOf(mailTemplates, { templateId })) {
    let template = mailTemplates.find(template => template.templateId == templateId);
    if(_.isEmpty(template)) {
      return res.render("404");
    }
    return res.render(`templates/${template.templateName}`);
  }

  return res.render("404")
  
});

module.exports = router;
