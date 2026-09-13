import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { EventDocument } from "@/database/event.model";
import { getSimilarEventsBySlug } from "@/lib/actions/event.action";
import Image from "next/image";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string; }) => {
    return (
        <div className="flex-row-gap-2 items-center">
            <Image src={icon} alt={alt} width={17} height={17} />
            <p>{label}</p>
        </div>
    );
};

const decodeList = (items: string[]) => {
    if (items.length === 1) {
        try {
            const decoded = JSON.parse(items[0]);
            if (Array.isArray(decoded)) return decoded;
        } catch {
            // Database-created events may already be stored as an array.
        }
    }

    return items;
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
    <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag) => (
            <div className="pill" key={tag}>{tag}</div>
        ))}
    </div>
)

const formatEventDate = (date: string) => date.split("T")[0] ?? date;

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const request = await fetch(`${BASE_URL}/api/events/${slug}`);
    const { event } = await request.json();

    if (!event?.description) return notFound();

    const { description, image, overview, date, time, agenda, audience, tags, mode, location, organizer } = event;

    const bookings = 10;

    const similarEvents: EventDocument[] = await getSimilarEventsBySlug(slug);
    return (

        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p className="mt-2">{description}</p>
            </div>

            <div className="details">
                {/* Left Side Event Content */}

                <div className="content">
                    <Image src={image} alt="Event Banner" width={800} height={800} className="banner" />

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={formatEventDate(date)} />
                        <EventDetailItem icon="/icons/clock.svg" alt="calendar" label={time} />
                        <EventDetailItem icon="/icons/pin.svg" alt="calendar" label={location} />
                        <EventDetailItem icon="/icons/mode.svg" alt="calendar" label={mode} />
                        <EventDetailItem icon="/icons/audience.svg" alt="calendar" label={audience} />
                    </section>

                    <EventAgenda agendaItems={decodeList(agenda)} />

                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={decodeList(tags)} />
                </div>
                {/* Right Side Booking Form */}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">
                                Join {bookings} people wo have already booked their spot
                            </p>
                        ) : (
                            <p className="text-sm">Be the first to book your spot</p>
                        )}

                        <BookEvent />
                    </div>
                </aside>
            </div>

            <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents.length > 0 && similarEvents.map((similarEvent: EventDocument) => (
                        <EventCard key={similarEvent.slug} {...similarEvent} />
                    ))}
                </div>

            </div>
        </section>
    )
}

export default EventDetailsPage;
