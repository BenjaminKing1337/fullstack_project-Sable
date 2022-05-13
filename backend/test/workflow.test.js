const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

describe("/Sable Test Collection", () => {
  
  it("Register user & login", (done) => {
    let user = {
      name: "Agent 47",
      email: "47@47.47",
      pass: "474747",
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
            email: "47@47.47",
            pass: "474747",
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
      name: "Agent 47",
      email: "47@47.47",
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

  // it("Register user, login, create task & verify it in DB", (done) => {
  //   let user = {
  //     name: "Agent 47",
  //     email: "47@47.47",
  //     pass: "474747",
  //   };
  //   // Register
  //   chai
  //     .request(server)
  //     .post("/users/register")
  //     .send(user)
  //     .end((err, res) => {
  //       expect(res.status).to.be.equal(200);
  //       expect(res.body).to.be.a("object");
  //       expect(res.body.error).to.be.equal(null);
  //       // login
  //       chai
  //         .request(server)
  //         .post("/users/login")
  //         .send({
  //           email: "47@47.47",
  //           pass: "474747",
  //         })
  //         .end((err, res) => {
  //           expect(res.status).to.be.equal(200);
  //           expect(res.body.error).to.be.equal(null);
  //           let token = res.body.data.token;
  //           let task = {
  //             name: "Test Task",
  //             description: "Test Task Description",
  //             img: "https://i.imgur.com/ZxJrIRA.png",
  //             type: "Ballistic",
  //             price: 500,
  //             inStock: true,
  //           };
  //           // Create
  //           chai
  //             .request(server)
  //             .post("/tasks")
  //             .set({ "auth-token": token })
  //             .send(task)
  //             .end((err, res) => {
  //               expect(res.status).to.be.equal(201);
  //               expect(res.body).to.be.a("array");
  //               expect(res.body.length).to.be.eql(1);
  //               let savedTask = res.body[0];
  //               expect(savedTask.name).to.be.equal(task.name);
  //               expect(savedTask.description).to.be.equal(task.description);
  //               expect(savedTask.img).to.be.equal(task.img);
  //               expect(savedTask.type).to.be.equal(task.type);
  //               expect(savedTask.price).to.be.equal(task.price);
  //               expect(savedTask.inStock).to.be.equal(task.inStock);
  //               // Verify
  //               chai
  //                 .request(server)
  //                 .get("/tasks")
  //                 .end((err, res) => {
  //                   expect(res.status).to.be.equal(200);
  //                   expect(res.body).to.be.a("array");
  //                   expect(res.body.length).to.be.eql(1);

  //                   done();
  //                 });
  //             });
  //         });
  //     });
  // });

  // it("Register user, login, create task, verify & delete it from DB", (done) => {
  //   let user = {
  //     name: "Agent 47",
  //     email: "47@47.47",
  //     pass: "474747",
  //   };
  //   // Register
  //   chai
  //     .request(server)
  //     .post("/users/register")
  //     .send(user)
  //     .end((err, res) => {
  //       expect(res.status).to.be.equal(200);
  //       expect(res.body).to.be.a("object");
  //       expect(res.body.error).to.be.equal(null);
  //       // Login
  //       chai
  //         .request(server)
  //         .post("/users/login")
  //         .send({
  //           email: "47@47.47",
  //           pass: "474747",
  //         })
  //         .end((err, res) => {
  //           expect(res.status).to.be.equal(200);
  //           expect(res.body.error).to.be.equal(null);
  //           let token = res.body.data.token;
  //           let task = {
  //             name: "Test Task",
  //             description: "Test Task Description",
  //             img: "https://i.imgur.com/ZxJrIRA.png",
  //             type: "Ballistic",
  //             price: 500,
  //             inStock: true,
  //           };
  //           // Create
  //           chai
  //             .request(server)
  //             .post("/tasks")
  //             .set({ "auth-token": token })
  //             .send(task)
  //             .end((err, res) => {
  //               expect(res.status).to.be.equal(201);
  //               expect(res.body).to.be.a("array");
  //               expect(res.body.length).to.be.eql(1);

  //               let savedTask = res.body[0];
  //               expect(savedTask.name).to.be.equal(task.name);
  //               expect(savedTask.description).to.be.equal(task.description);
  //               expect(savedTask.img).to.be.equal(task.img);
  //               expect(savedTask.type).to.be.equal(task.type);
  //               expect(savedTask.price).to.be.equal(task.price);
  //               expect(savedTask.inStock).to.be.equal(task.inStock);
  //               // Verify
  //               chai
  //                 .request(server)
  //                 .get("/tasks")
  //                 .end((err, res) => {
  //                   expect(res.status).to.be.equal(200);
  //                   expect(res.body).to.be.a("array");
  //                   expect(res.body.length).to.be.eql(1);
  //                 });
  //               // Delete
  //               chai
  //                 .request(server)
  //                 .delete("/tasks/" + savedTask._id)
  //                 .set({ "auth-token": token })
  //                 .end((err, res) => {
  //                   expect(res.status).to.be.equal(200);
  //                   const actualVal = res.body.message;
  //                   expect(actualVal).to.be.equal(
  //                     "Task was succesfully deleted."
  //                   );
  //                   done();
  //                 });
  //             });
  //         });
  //     });
  // });

  // it("Register user, login, create task, verify, update & then delete it from DB", (done) => {
  //   let user = {
  //     name: "Agent 47",
  //     email: "47@47.47",
  //     pass: "474747",
  //   };
  //   // Register
  //   chai
  //     .request(server)
  //     .post("/users/register")
  //     .send(user)
  //     .end((err, res) => {
  //       expect(res.status).to.be.equal(200);
  //       expect(res.body).to.be.a("object");
  //       expect(res.body.error).to.be.equal(null);
  //       // Login
  //       chai
  //         .request(server)
  //         .post("/users/login")
  //         .send({
  //           email: "47@47.47",
  //           pass: "474747",
  //         })
  //         .end((err, res) => {
  //           expect(res.status).to.be.equal(200);
  //           expect(res.body.error).to.be.equal(null);
  //           let token = res.body.data.token;
  //           let task = {
  //             name: "Test Task",
  //             description: "Test Task Description",
  //             img: "https://i.imgur.com/ZxJrIRA.png",
  //             type: "Ballistic",
  //             price: 500,
  //             inStock: true,
  //           };
  //           // Create
  //           chai
  //             .request(server)
  //             .post("/tasks")
  //             .set({ "auth-token": token })
  //             .send(task)
  //             .end((err, res) => {
  //               res.should.have.status(201);
  //               expect(res.body).to.be.a("array");
  //               expect(res.body.length).to.be.eql(1);
  //               let savedTask = res.body[0];
  //               expect(savedTask.name).to.be.equal(task.name);
  //               expect(savedTask.description).to.be.equal(task.description);
  //               expect(savedTask.img).to.be.equal(task.img);
  //               expect(savedTask.type).to.be.equal(task.type);
  //               expect(savedTask.price).to.be.equal(task.price);
  //               expect(savedTask.inStock).to.eql(task.inStock);

  //               let taskUpdated = {
  //                 name: "Test Task Update",
  //                 description: "Test Task Description Update",
  //                 img: "https://i.imgur.com/ZxJrIRA.png",
  //                 type: "Melee",
  //                 price: 100,
  //                 inStock: false,
  //               };
  //               // Update
  //               chai
  //                 .request(server)
  //                 .put("/tasks/" + savedTask._id)
  //                 .set({ "auth-token": token })
  //                 .send(taskUpdated)
  //                 .end((err, res) => {
  //                   res.should.have.status(200);
  //                   res.body.should.have.property("message");
  //                   expect(res.body.message).to.be.equal(
  //                     "task was succesfully updated."
  //                   );
  //                   // Verify
  //                   chai
  //                     .request(server)
  //                     .get("/tasks")
  //                     .end((err, res) => {
  //                       expect(res.status).to.be.equal(200);
  //                       expect(res.body).to.be.a("array");
  //                       expect(res.body.length).to.be.eql(1);
  //                     });
  //                   // Delete
  //                   chai
  //                     .request(server)
  //                     .delete("/tasks/" + savedTask._id)
  //                     .set({ "auth-token": token })
  //                     .end((err, res) => {
  //                       expect(res.status).to.be.equal(200);
  //                       const actualVal = res.body.message;
  //                       expect(actualVal).to.be.equal(
  //                         "Task was succesfully deleted."
  //                       );
  //                       done();
  //                     });
  //                 });
  //             });
  //         });
  //     });
  // });
});
