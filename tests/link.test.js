const chai = require("chai");
var expect = chai.expect;
const supertest = require("supertest");

var server = supertest.agent("http://localhost:8888");

describe("Tests for /v1/link", function() {

  let newlyCreatedLinkId;
  
  it("should ping successfully", function(done) {
    server
      .get("/v1/ping")
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("should not get link by hash", function(done) {
    const hash = "6g8Th";

    server
      .get(`/v1/link/${hash}`)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });


  it("should save a link", function(done) {
    const link = {
      url: "https://www.google.com"
    };

    server
      .post("/v1/link")
      .send(link)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        const linkCreated = res.body;
        expect(linkCreated.hash).to.not.be.empty;
        done();
      });
  });

  it("should save a link which will be deleted later", function(done) {
    const link = {
      url: "https://testing.com"
    };

    server
      .post("/v1/link")
      .send(link)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        const linkCreated = res.body;
        newlyCreatedLinkId = linkCreated.id;
        expect(linkCreated.hash).to.not.be.empty;
        done();
      });
  });

  it("should fail to save a link", function(done) {
    const link = {
      urlWrongField: "https://www.google.com"
    };

    server
      .post("/v1/link")
      .send(link)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(500);
        done();
      });
  });

  it("should delete a link", function(done) {
    const idToDelete = newlyCreatedLinkId;

    server
      .delete(`/v1/link/${idToDelete}`)
      .end(function(err, res) {
        console.log("res.body", res.body);
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("should update a link", function(done) {
    const idToDelete = "5c055ce964699811735e511a";
    const updatedLink = {
      url: "http://shahjada.me"
    };

    server
      .put(`/v1/link/${idToDelete}`)
      .send(updatedLink)
      .end(function(err, res) {
        console.log("res.body", res.body);
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  
});
