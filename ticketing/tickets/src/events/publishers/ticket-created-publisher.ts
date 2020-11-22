import {
  Subjects,
  Publisher,
  TicketCreatedEvent,
} from "@mscticketing/common/build/events";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
