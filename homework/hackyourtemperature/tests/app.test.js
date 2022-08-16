import request from "supertest";
import app from "../app.js";

//post tests

describe("POST /weather", () => {
  describe("when passed the city name", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app)
        .post("/weather")
        .send({ city: "paris" });
      expect(response.statusCode).toBe(200);
    });

    test("should specify json as the content type in the http header", async () => {
      const response = await request(app)
        .post("/weather")
        .send({ cityName: "paris" });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("text/html")
      );
    });
  });

  describe("when the city name is missing or invalid", () => {
    test("should respond with a 400 status code", async () => {
      const response = await request(app)
        .post("/weather")
        .send({ cityName: "" });
      expect(response.statusCode).toBe(400);
    });
    test("should respond with a 400 status code", async () => {
      const response = await request(app)
        .post("/weather")
        .send({ cityName: "abcd" });
      expect(response.statusCode).toBe(400);
    });
  });
});
