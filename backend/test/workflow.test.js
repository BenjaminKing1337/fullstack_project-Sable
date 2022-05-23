const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

describe("/Sable Test Collection", () => {
  it("Register user & login", (done) => {
    let user = {
      name: "SableTest",
      email: "sabletest@sable.com",
      pass: "123456",
    };
    chai
      .request(server)
      .post("/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal(null);
        chai
          .request(server)
          .post("/users/login")
          .send({
            email: "sabletest@sable.com",
            pass: "123456",
          })
          .end((err, res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(null);
            done();
          });
      });
  });

  it("Register user (with invalid password) and fail registration", (done) => {
    let user = {
      name: "SableTest",
      email: "sabletest@sable.com",
      pass: "123",
    };
    chai
      .request(server)
      .post("/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal(
          '"pass" length must be at least 6 characters long'
        );
        done();
      });
  });
});
