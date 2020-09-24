import request from "supertest";
import { app } from "../../app";

const singupUrl = "/api/users/signup";

it("returns 201 on successful sign up", async () => {
  return request(app)
    .post(singupUrl)
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(201);
});
