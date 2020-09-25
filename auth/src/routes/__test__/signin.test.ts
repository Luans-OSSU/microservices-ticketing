import request from "supertest";
import { app } from "../../app";

const singupUrl = "/api/users/signup";
const singinUrl = "/api/users/signin";

it("fails when an email that does not exist is supplied", async () => {
  await request(app)
    .post(singinUrl)
    .send({ email: "test@test.com", password: "test" })
    .expect(400);
});

it("fails when an incorrect password is suplied", async () => {
  await request(app)
    .post(singupUrl)
    .send({ email: "test@test.com", password: "test" })
    .expect(201);

  await request(app)
    .post(singinUrl)
    .send({ email: "test@test.com", password: "asdasd" })
    .expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await request(app)
    .post(singupUrl)
    .send({ email: "test@test.com", password: "test" })
    .expect(201);

  const response = await request(app)
    .post(singinUrl)
    .send({ email: "test@test.com", password: "test" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
