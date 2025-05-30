import React from 'react';
import './Card.css'; // Ensure you have some basic styling

const EventCard = ({ image, eventName, eventVenue, eventType, onClick }) => {
  return (
    <div className="event-card" onClick={onClick} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
      {image ? (
        <img
          src={image}
          alt={eventName}
          className="event-card-image"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      ) : (
        <div className="event-card-image" style={{ width: '100%', height: '150px', backgroundColor: '#f0f0f0' }}>
          <p>No image available</p>
        </div>
      )}
      <div className="event-card-content">
        <h2 className="event-card-title">{eventName}</h2>
        <p className="card-address">{eventVenue}</p>
        <p className="card-type">{eventType}</p>
      </div>
    </div>
  );
};

export default EventCard;