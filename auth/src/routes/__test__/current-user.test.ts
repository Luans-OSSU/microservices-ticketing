import request from "supertest";
import { app } from "../../app";

const singupUrl = "/api/users/signup";
const currentUserUrl = "/api/users/currentuser";

it("responds with details about the current user", async () => {
  const cookie = await global.getAuthCookie();

  const response = await request(app)
    .get(currentUserUrl)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authenticated", async () => {
  const response = await request(app).get(currentUserUrl).send().expect(200);

  expect(response.body.currentUser).toEqual(null);
});
