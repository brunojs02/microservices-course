import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  data: any;
  subject: Subjects;
}

export abstract class Publisher<T extends Event> {
  private client: Stan;
  abstract subject: T["subject"];

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, data, (err: any, guid: any) => {
        if (err) reject(err);
        else resolve(guid);
      });
    });
  }
}
