import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

import { app } from "../app";

declare global {
  namespace NodeJS {
    interface Global {
      signup(email: string, password: string): Promise<string[]>;
    }
  }
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "jwt_key_test_purposes";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = async (email: string, password: string) => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  return response.get("Set-Cookie");
};
