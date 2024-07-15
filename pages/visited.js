import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import WeatherCard from '../components/WeatherCard'; 

const VisitedCities = ({ recentlyViewed }) => {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Visited Cities</h2>
      <ListGroup>
        {recentlyViewed.map((city, index) => (
          <ListGroup.Item key={index}>
            <WeatherCard data={city} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default VisitedCities;
