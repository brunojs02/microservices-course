import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

let mongo: MongoMemoryServer;

jest.mock("../nats-wrapper.ts");

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
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const payload = { id: userId, email: "test@example.com" };
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const sessionJSON = JSON.stringify({ jwt: token });
  const base64 = Buffer.from(sessionJSON).toString("base64");
  return [`express:sess=${base64}`];
};
