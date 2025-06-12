import React, { useState } from "react";

const Faq = () => {
  const faqData = [
    {
      question: "Why Become an Online Member?",
      answer: `Your exclusive username and password let you buy movie tickets hassle-free. 
      As an online member, you can enjoy the privilege of advance booking, loyalty 
      points, exclusive movie merchandise, and more! Register now to experience 
      TicketFlix at its best.`,
    },
    {
      question: "5 Simple Steps to Buy Tickets Online",
      answer: `1) Sign up or log in to your TicketFlix account. 
      2) Browse the movie list. 
      3) Select your preferred showtime. 
      4) Choose seats and pay online. 
      5) Receive your e-ticket instantly!`,
    },
    {
      question: "Charges for Booking Tickets Online?",
      answer: `TicketFlix may charge a nominal internet handling fee. The exact amount 
      depends on the payment gateway and theater policies. All fees will be clearly 
      displayed before you confirm your booking.`,
    },
    {
      question: "Can I Book Tickets in Advance?",
      answer: `Absolutely! As a TicketFlix member, you can book tickets days or even weeks 
      before the official release date, depending on the cinema's policy.`,
    },
    {
      question: "Can I Cancel Tickets Booked Online and Get a Refund?",
      answer: `Refund policies vary by theater. If cancellation is allowed, you’ll see a 
      “Cancel Booking” option under your account’s “My Bookings” section. A refund 
      (minus any convenience fees) will be processed back to your original payment 
      method, usually within 5-7 business days.`,
    },
    {
      question: "Is the facility available on tickets bought from the Cinema?",
      answer: `No, you can only modify or cancel tickets purchased through TicketFlix 
      online. Tickets purchased directly at the cinema counter must follow the 
      cinema's own policies.`,
    },
    {
      question: "What is the amount of refund I will get on cancellation of the ticket?",
      answer: `Refund amounts depend on the time of cancellation and the cinema’s 
      policy. Check the cancellation policy details on the booking page 
      before confirming your purchase.`,
    },
    {
      question: "Can partially used tickets be cancelled?",
      answer: `Once a ticket is partially used (e.g., if you’ve already viewed part of 
      the show), it generally cannot be cancelled. Please confirm with the 
      theater's policy for exceptions.`,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 font-sans">
      <h1 className="text-center text-3xl font-semibold mb-8 text-gray-800">FAQ</h1>
      <div className="border-t border-gray-300">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-gray-300">
            <button
              onClick={() => handleToggle(index)}
              className="w-full text-left bg-gray-50 hover:bg-gray-100 px-4 py-4 text-lg text-gray-800 flex justify-between items-center"
            >
              {item.question}
              <span className="text-2xl text-gray-400">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>
            {activeIndex === index && (
              <div className="bg-white px-4 py-4 text-gray-600 animate-fadeIn">
                <p className="whitespace-pre-line">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;