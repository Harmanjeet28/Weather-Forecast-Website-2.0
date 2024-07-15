import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInput(query)) {
      onSearch(query.trim());
      setError('');
    } else {
      setError('Please enter a valid city name, city_name,country_code format, or city ID.');
    }
  };

  const validateInput = (input) => {
    const regex = /^[a-zA-Z\s]*,?[a-zA-Z\s]{2}$|^\d+$/;
    return regex.test(input.trim());
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex">
      <Form.Group controlId="cityInput" className="mb-0 mr-2 flex-grow-1">
        <Form.Control
          type="text"
          placeholder="Enter city name, city_name,country_code, or city ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          isInvalid={error !== ''}
        />
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
