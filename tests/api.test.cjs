const request = require("supertest");
const app = require("../app");

describe("User API", () => {
  let server;

  afterAll(async () => {
    await server.close();
  });

  it("should get all users", async () => {
    const response = await request(app).get("/api/v1/user");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
describe("User API", () => {
  it("should get all users", async () => {
    const response = await request(app).get("/api/v1/user");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should create a new user", async () => {
    const newUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };
    const response = await request(app).post("/api/v1/user").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", newUser.name);
    expect(response.body).toHaveProperty("email", newUser.email);
  });

  it("should update a user", async () => {
    const updateUser = {
      name: "Jane Doe",
      email: "jane.doe@example.com",
    };
    const response = await request(app)
      .put("/api/v1/user/:id")
      .send(updateUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", updateUser.name);
    expect(response.body).toHaveProperty("email", updateUser.email);
  });

  it("should delete a user", async () => {
    const response = await request(app).delete("/api/v1/user/:id");
    expect(response.status).toBe(204);
  });
});
