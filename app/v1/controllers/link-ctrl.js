const shortid = require("shortid");
const _ = require("lodash");
const Link = require("../models/link");

const getAllLinks = function(req, res) {
  const query = Link.find({});
  query.exec((err, links) => {
    if (err) {
      return res.send(err);
    }

    const mappedLinks = _.map(links, link => {
      return {
        id: link._id,
        createdAt: link.createdAt,
        hash: link.hash,
        url: link.url
      };
    });

    res.json(mappedLinks);
  });
};

const getByHash = function(req, res) {
  console.log("req.param", req.params);

  const query = Link.find({ hash: req.params.hash });
  query.exec((err, links) => {
    if (err) {
      return res.send(err);
    }
    if (links.length === 0) {
      return res.sendStatus(404);
    }
    const link = _.first(links);
    res.json({
      id: link._id,
      createdAt: link.createdAt,
      hash: link.hash,
      url: link.url
    });
  });
};

function postLink(req, res) {
  console.log("req.body", req.body);

  const link = {
    url: req.body.url,
    hash: shortid.generate()
  };

  var newLink = new Link(link);
  newLink.save((err, newLink) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.json({ id: newLink._id, hash: link.hash });
  });
}

function deleteById(req, res) {
  const query = Link.findByIdAndDelete(req.params.id);

  query.exec((err, link) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
}

function updateLink(req, res) {
  console.log("updateLink", req.body.url);
  const query = Link.findByIdAndUpdate(req.params.id, { url: req.body.url });

  query.exec((err, link) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
}

module.exports = {
  getLinks: getAllLinks,
  saveLink: postLink,
  getLinkByHash: getByHash,
  deleteLinkById: deleteById,
  updateLinkById: updateLink
};
