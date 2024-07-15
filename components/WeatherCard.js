import React from 'react';
import { Card, Button } from 'react-bootstrap';

const WeatherCard = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>; 
  }

  const { name, sys, weather, main, wind } = data.current || {}; 

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>{name}, {sys?.country}</Card.Title> {/* Access country safely with optional chaining */}
        <Card.Text>{weather?.[0]?.description}</Card.Text> {/* Access nested properties safely */}
        <Card.Text>Current Temperature: {main?.temp}°C</Card.Text>
        <Card.Text>Min: {main?.temp_min}°C, Max: {main?.temp_max}°C</Card.Text>
        <Card.Text>Wind Speed: {wind?.speed} m/s | Humidity: {main?.humidity}% | Pressure: {main?.pressure} hPa</Card.Text>
        <Button variant="primary">Show More Details</Button>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
