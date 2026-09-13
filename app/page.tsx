import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events as featuredEvents } from "@/lib/constants";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {

  const response = await fetch(`${BASE_URL}/api/events`);

  const { events = [] } = await response.json();
  const featuredSlugs = new Set(featuredEvents.map((event) => event.slug));
  const displayEvents = [
    ...events.filter((event: { slug: string }) => !featuredSlugs.has(event.slug)),
    ...featuredEvents,
  ];



  return (
    <section>
      <h1 className="text-center">The Hub for Every Dev <br /> Event You Can/t Miss </h1>
      <p className="text-center mt-5">Hackathon, Meetups, and Conference, All in One place</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Features Events</h3>

        <ul className="events">
          {displayEvents.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>

          ))}
        </ul>
      </div>
    </section>
  )
}

export default Page;
