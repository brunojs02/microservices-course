import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data = JSON.stringify({
    price: 20,
    id: "1234",
    title: "Event title",
  });

  stan.publish("ticket:created", data, () => {
    console.log("Event emited");
  });
});
