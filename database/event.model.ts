import mongoose, { Schema, type Model } from "mongoose";

export interface EventDocument {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const requiredText = {
  type: String,
  required: true,
  trim: true,
  validate: {
    validator: (value: string) => value.length > 0,
    message: "This field cannot be empty.",
  },
} as const;

const nonEmptyStringList = {
  type: [String],
  required: true,
  validate: {
    validator: (values: string[]) =>
      values.length > 0 && values.every((value) => value.trim().length > 0),
    message: "At least one non-empty value is required.",
  },
} as const;

function createSlug(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Event date must be a valid date.");
  }

  return date.toISOString();
}

function normalizeTime(value: string): string {
  const match = /^(\d{1,2}):(\d{2})(?:\s*([ap]m))?$/i.exec(value.trim());

  if (!match) {
    throw new Error("Event time must use HH:MM or HH:MM AM/PM format.");
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3]?.toLowerCase();

  if (minutes > 59 || (period ? hours < 1 || hours > 12 : hours > 23)) {
    throw new Error("Event time must be a valid time.");
  }

  if (period === "pm" && hours !== 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

const eventSchema = new Schema<EventDocument>(
  {
    title: requiredText,
    slug: { type: String, trim: true },
    description: requiredText,
    overview: requiredText,
    image: requiredText,
    venue: requiredText,
    location: requiredText,
    date: requiredText,
    time: requiredText,
    mode: requiredText,
    audience: requiredText,
    agenda: nonEmptyStringList,
    organizer: requiredText,
    tags: nonEmptyStringList,
  },
  { timestamps: true },
);

// Keep URLs stable unless the title changes, then normalize date and time before saving.
eventSchema.pre("save", function () {
  if (this.isModified("title")) {
    const slug = createSlug(this.title);

    if (!slug) {
      throw new Error("Event title must contain letters or numbers.");
    }

    this.slug = slug;
  }

  this.date = normalizeDate(this.date);
  this.time = normalizeTime(this.time);
});

eventSchema.index({ slug: 1 }, { unique: true });

export const Event: Model<EventDocument> =
  (mongoose.models.Event as Model<EventDocument>) ||
  mongoose.model<EventDocument>("Event", eventSchema);
