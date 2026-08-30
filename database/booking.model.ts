import mongoose, { Schema, type Model, type Types } from "mongoose";

import { Event } from "./event.model";

export interface BookingDocument {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<BookingDocument>(
  {
    // Indexing the reference supports fast lookups of an event's bookings.
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [emailPattern, "Please provide a valid email address."],
    },
  },
  { timestamps: true },
);

// Prevent bookings from being saved for an event that no longer exists.
bookingSchema.pre("save", async function () {
  if (!this.isModified("eventId")) return;

  const event = await Event.exists({ _id: this.eventId });

  if (!event) {
    throw new Error("Cannot create a booking for an event that does not exist.");
  }
});

bookingSchema.index({ eventId: 1 });

export const Booking: Model<BookingDocument> =
  (mongoose.models.Booking as Model<BookingDocument>) ||
  mongoose.model<BookingDocument>("Booking", bookingSchema);
