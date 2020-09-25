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

it("returns 400 with invalid email", async () => {
  return request(app)
    .post(singupUrl)
    .send({
      email: "testcom",
      password: "test",
    })
    .expect(400);
});

it("returns 400 with invalid password", async () => {
  return request(app)
    .post(singupUrl)
    .send({
      email: "test@test.com",
      password: "t",
    })
    .expect(400);
});

it("returns 400 with missing email and password", async () => {
  await request(app)
    .post(singupUrl)
    .send({
      email: "test@test.com",
    })
    .expect(400);

  return request(app)
    .post(singupUrl)
    .send({
      password: "test",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post(singupUrl)
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(201);

  await request(app)
    .post(singupUrl)
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(400);
});

it("sets a cookie after a successful signup", async () => {
  const response = await request(app)
    .post(singupUrl)
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
