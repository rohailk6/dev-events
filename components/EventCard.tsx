'use client';

import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

interface Props {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;

}

const EventCard = ({ title, image, slug, location, time, date }: Props) => {
    const handleClick = () => {
        posthog.capture('event_card_clicked', {
            event_title: title,
            event_slug: slug,
            event_location: location,
            event_date: date,
        });
    };

    const formattedDate = new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));

    const formattedTime = /^\d{2}:\d{2}$/.test(time)
        ? new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(
            new Date(`2026-01-01T${time}:00`),
        )
        : time;

    return (
        <Link href={`/events/${slug}`} id="event-card" onClick={handleClick}>

            <Image src={image} alt={`${title} event`} width={410} height={300} className="poster" />

            <div className="flex flex-row-gap-2">
                <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
                <p>{location}</p>
            </div>
            <p className="title">{title}</p>

            <div className="datetime">
                <div>
                    <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
                    <p>{formattedDate}</p>
                </div>
                <div>
                    <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
                    <p>{formattedTime}</p>
                </div>
            </div>


        </Link>

    )
}

export default EventCard
