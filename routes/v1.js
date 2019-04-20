const linkCtrl = require("../app/v1/controllers/link-ctrl");

module.exports = function(app) {
  app.get("/v1/ping", (req, res) => res.json({ message: "pong!" }));
  app.get("/v1/link", linkCtrl.getLinks);
  app.get("/v1/link/:hash", linkCtrl.getLinkByHash);
  app.post("/v1/link", linkCtrl.saveLink);
  app.delete("/v1/link/:id", linkCtrl.deleteLinkById);
  app.put("/v1/link/:id", linkCtrl.updateLinkById);
};
