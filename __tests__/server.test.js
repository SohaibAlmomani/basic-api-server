"use strict";

const { app } = require("../src/server");
const supertest = require("supertest");
const mockRequest = supertest(app);
const { db } = require("../src/models/index");

beforeAll(async () => {
  await db.sync();
});

describe("Web server", () => {
  // Check if 404 is handled
  test("Should respond with 404 status on an invalid route", async () => {
    const response = await mockRequest.get("/foo");
    expect(response.status).toBe(404);
  });
  test("Should respond with 404 status on an invalid route", async () => {
    const response = await mockRequest.get("/cloth");
    expect(response.status).toBe(404);
  });
  //Food Test
  test("I can add the Food", async () => {
    const response = await mockRequest.post("/food").send({
      FoodName: "mansaf",
      FoodContent: "jameed",
      FoodPrice: "50 JD",
    });
    expect(response.status).toBe(201);
  });
  test("I can get all Food", async () => {
    const response = await mockRequest.get("/food");
    expect(response.status).toBe(200);
  });
  test("bad method", async () => {
    const response = await mockRequest.post("/food/:id").send({
      FoodName: "mansaf",
      FoodContent: "jameed",
      FoodPrice: "50 JD",
    });
    expect(response.status).toBe(404);
  });

  //Clothes Test
  test("I can add the Clothes", async () => {
    const response = await mockRequest.post("/clothes").send({
      ClothesType: "suit",
      ClothesColor: "black",
      ClothesPrice: "100 JD",
    });
    expect(response.status).toBe(201);
  });
  test("I can get all clothes", async () => {
    const response = await mockRequest.get("/clothes");
    expect(response.status).toBe(200);
  });
  test("bad method", async () => {
    const response = await mockRequest.post("/clothes/:id").send({
      ClothesType: "suit",
      ClothesColor: "black",
      ClothesPrice: "100 JD",
    });
    expect(response.status).toBe(404);
  });

  // test if can update a Food
  test("I can update on Food", async () => {
    const response = await mockRequest.put("/food/1");
    expect(response.status).toBe(201);
  });
  test("I can update on Clothes", async () => {
    const response = await mockRequest.put("/clothes/1");
    expect(response.status).toBe(201);
  });
  // test if can delete a Clothes
  test("I can delete on Food", async () => {
    const response = await mockRequest.delete("/food/1");
    expect(response.status).toBe(204);
  });
  test("I can delete on Clothes", async () => {
    const response = await mockRequest.delete("/clothes/1");
    expect(response.status).toBe(204);
  });
});

afterAll(async () => {
  await db.drop();
});
