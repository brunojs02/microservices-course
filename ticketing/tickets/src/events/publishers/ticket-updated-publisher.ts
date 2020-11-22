import {
  Subjects,
  Publisher,
  TicketUpdatedEvent,
} from "@mscticketing/common/build/events";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
