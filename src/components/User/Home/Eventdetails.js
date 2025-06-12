import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

function Eventdetails() {
  // Event detail states
  const [eventImage, setEventImage] = useState("");
  const [Name, seteventName] = useState("");
  const [eventLanguage, seteventLanguage] = useState("");
  const [eventDuration, seteventDuration] = useState("");
  const [eventArtist, seteventArtist] = useState([]);
  const [Venue, seteventVenue] = useState("");
  const [eventAbout, seteventAbout] = useState("");
  const [eventDate, seteventDate] = useState("");
  const [Time, seteventTime] = useState([]); // Now an array
  const [eventType, seteventType] = useState("");
  const [eventSchedule, setEventSchedule] = useState(null);
  const [eventPricing, setEventPricing] = useState(null);
  const [location, setlocation] = useState(null);

  // Popups
  const [eventtimePopup, seteventtimePopup] = useState(false);

  const [id, setId] = useState("");
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
   * Fetch event details by ID from the server.
   */
  const fetchData = async (eventID) => {
    try {
      // Fetch event details
      const eventResponse = await axios.get(
        `http://localhost:5000/getevent/${eventID}`
      );

      const {
        eventName: Name,
        eventLanguage,
        eventDuration,
        eventArtist,
        eventVenue: Venue,
        imageURL,
        eventAbout,
        eventDate,
        eventTime: Time,
        eventType,
        location,
      } = eventResponse.data;

      setEventImage(imageURL);
      seteventName(Name);
      seteventLanguage(eventLanguage);
      seteventDuration(eventDuration);
      seteventArtist(eventArtist || []);
      seteventVenue(Venue);
      seteventAbout(eventAbout);
      seteventDate(eventDate);
      seteventTime(Array.isArray(Time) ? Time : []);
      seteventType(eventType);
      setlocation(location);

      // Fetch event schedule
      const scheduleResponse = await axios.get(
        `http://localhost:5000/eventschedule`
      );
      const matchedSchedule = scheduleResponse.data.find(
        (schedule) => schedule.eventName === Name
      );

      if (matchedSchedule) {
        setEventSchedule(matchedSchedule);
        const pricingData = matchedSchedule.EventshowTime?.[0] || {};
        setEventPricing(pricingData);
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  // On mount, get event ID from localStorage then fetch details.
  useEffect(() => {
    const eventID = localStorage.getItem("id");
    if (!eventID) {
      navigate("/");
      return;
    }
    setId(eventID);
    fetchData(eventID);
  }, [navigate]);

  // Handle Event Time popup
  const handleClick = () => {
    seteventtimePopup(true);
  };

  const handleTimeSelect = (chosenTime) => {
    const storedEmail = localStorage.getItem("userEmail") || "";
    navigate("/eventticketbooking", {
      state: {
        Name,
        Venue,
        eventDate,
        Time,
        pricing: eventPricing || {},
        userEmail: storedEmail,
        chosenTime,
      },
    });
    seteventtimePopup(false);
  };

  const closeTimePopup = () => {
    seteventtimePopup(false);
  };

  return (
    <div className="bg-[#f8f8f8] pt-3 font-sans">
      <div className="w-[90%] max-w-[1200px] mx-auto flex flex-col gap-3">
        {/* Banner */}
        <div className="relative w-full h-[320px] rounded-lg bg-[#eeeeee] overflow-hidden">
          <img
            src={eventImage}
            alt={Name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Event Details */}
        <div className="relative bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl text-[#333333] font-bold mb-2">{Name}</h2>
          <p className="text-base text-[#666666] mb-2">
            {eventType} | {eventLanguage} | {eventDuration}
          </p>
          <div className="flex flex-wrap gap-3 mb-2">
            <span className="flex items-center text-base text-[#666666]">
              🗓 {new Date(eventDate).toDateString()}
            </span>
            <span className="flex items-center text-base text-[#666666]">
              📍 {Venue}
            </span>
          </div>
          {eventSchedule?.EventshowTime?.[0]?.BronzeTicketPrice ? (
            <p className="text-base text-[#666666] mb-2">
              🎟 ₹{eventSchedule.EventshowTime[0].BronzeTicketPrice} onwards
            </p>
          ) : (
            <p className="text-base text-[#666666] mb-2">
              🎟 Lowest Price: ₹N/A
            </p>
          )}
          <button
            onClick={handleClick}
            className="
              absolute top-4 right-4
              bg-red-500 text-white
              px-6 py-2
              rounded-md
              text-sm font-medium
              transition-colors duration-300 ease
              hover:bg-red-600
            "
          >
            Book
          </button>
        </div>

        {/*** THREE‐COLUMN GRID: Artist + Share | About | Map ***/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-[320px]">
          {/*** ── LEFT COLUMN: Artist Panel + Share Card ── ***/}
          <div className="flex flex-col gap-3">
            {/* Artist Panel */}
            <div className="bg-white rounded-lg shadow-md p-2 flex flex-col items-center">
              {eventArtist.map((artist, idx) => (
                <div
                  key={idx}
                  className="w-full flex flex-col items-center mb-3"
                >
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-[80px] h-[80px] rounded-full object-cover mb-1"
                  />
                  <p className="text-sm text-[#444444] font-semibold">
                    {artist.artist}
                  </p>
                  <p className="text-sm text-[#444444]">{artist.name}</p>
                </div>
              ))}
            </div>

            {/* Share This Event */}
            <div className="bg-white rounded-lg shadow-md p-3 flex flex-col items-center">
              <h6 className="font-sans font-bold mb-2 text-sm">
                Share This Event
              </h6>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com"
                  className="
                    inline-flex items-center justify-center
                    w-8 h-8 text-[#333333]
                    hover:text-[#FFD700]
                    transition-colors duration-300 ease
                  "
                >
                  <i className="fab fa-facebook-f fa-md" />
                </a>
                <a
                  href="https://www.twitter.com"
                  className="
                    inline-flex items-center justify-center
                    w-8 h-8 text-[#333333]
                    hover:text-[#FFD700]
                    transition-colors duration-300 ease
                  "
                >
                  <i className="fab fa-twitter fa-md" />
                </a>
              </div>
            </div>
          </div>

          {/* ── MIDDLE COLUMN: About Panel ── */}
          <div className="bg-white rounded-lg shadow-md px-4 pt-3 pb-1 flex flex-col w-[450px] mb-[14px]">
            <h3 className="text-lg font-extrabold text-[#333333] mb-1">
              About
            </h3>
            <p className="text-sm text-[#555555] leading-relaxed">
              {eventAbout}
            </p>
          </div>

          {/* ── RIGHT COLUMN: Map Panel ── */}
          {location?.coordinates && (
            <div className="bg-white rounded-lg shadow-md p-3 flex items-center flex-col w-auto mb-[14px] ml-auto">
              <div className="w-[100%] h-[160px] rounded-md overflow-hidden mb-2">
                <iframe
                  title="Event location"
                  src={`https://maps.google.com/maps?q=${location.coordinates[0]},${location.coordinates[1]}&z=15&output=embed`}
                  loading="lazy"
                  allowFullScreen
                  className="w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
              {location.address && (
                <p className="text-sm text-[#444444]">{location.address}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Time Popup ── */}
      {eventtimePopup && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50">
          <div className="bg-white rounded-lg text-center p-4 max-w-[400px] w-[90%] shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-xl text-[#333333] hover:text-[#999999]"
              onClick={closeTimePopup}
            >
              &times;
            </button>
            <h4 className="text-lg font-bold mb-3">Select Event Time</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {Time.length > 0 ? (
                Time.map((time, i) => (
                  <button
                    key={i}
                    className="
                      border-2 border-blue-500
                      rounded-full
                      px-3 py-1
                      text-blue-500 text-sm
                      transition-colors duration-200 ease-in-out
                      hover:bg-blue-500 hover:text-white
                    "
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p className="text-sm text-[#666666]">No available times</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Eventdetails;