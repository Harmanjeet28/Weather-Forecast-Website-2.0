import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Image, Alert } from 'react-bootstrap';
import AppNavbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const apiKey = '35e3efab0fe4a7d5850b58d5440e6842';

  const fetchWeatherData = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`);
      const weatherData = response.data;

      if (weatherData && weatherData.name) {
        setCityData(weatherData);
        setError(null);
        updateRecentlyViewed(weatherData.name);
      } else {
        setError('No valid weather data received.');
        setCityData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data. Please try again.');
      setCityData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByGeolocation = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
      const weatherData = response.data;

      if (weatherData && weatherData.name) {
        setCityData(weatherData);
        setError(null);
        updateRecentlyViewed(weatherData.name);
      } else {
        setError('No valid weather data received.');
        setCityData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data. Please try again.');
      setCityData(null);
    } finally {
      setLoading(false);
    }
  };

  const updateRecentlyViewed = (cityName) => {
    setRecentlyViewed(prev => {
      if (!prev.includes(cityName)) {
        return [...prev, cityName];
      }
      return prev;
    });
  };

  const handleLocationPermission = () => {
    navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
      if (permissionStatus.state === 'granted') {
        getUserLocation();
      } else if (permissionStatus.state === 'prompt') {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByGeolocation(latitude, longitude);
          },
          error => {
            console.error('Error getting geolocation:', error);
            setError('Error getting your location. Please try again.');
            setLoading(false);
          }
        );
      } else {
        setError('Permission to access location was denied.');
      }
    }).catch(error => {
      console.error('Error checking permission:', error);
      setError('Error checking location access permission.');
    });
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByGeolocation(latitude, longitude);
      },
      error => {
        console.error('Error getting geolocation:', error);
        setError('Error getting your location. Please try again.');
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    handleLocationPermission();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchWeatherData(query);
  };

  const getFlagUrl = (countryCode) => {
    return `http://openweathermap.org/images/flags/${countryCode.toLowerCase()}.png`;
  };

  return (
    <>
      <AppNavbar recentlyViewed={recentlyViewed} />
      <div className="dark-blur">
        <Container className="mt-4">
          <SearchBar onSearch={handleSearch} />
          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}
          {!error && cityData && (
            <div className="content-wrapper">
              <div className="text-center mb-4">
                {loading && <p>Loading...</p>}
                {page === 1 && (
                  <div>
                    <h2 className="text-center mb-4">Weather Information</h2>
                    <h3>
                      <Image src={getFlagUrl(cityData.sys.country)} alt="Country Flag" /> {cityData.name}, {cityData.sys.country}
                    </h3>
                    <h4>Current Temperature: {cityData.main.temp}°C</h4>
                    <p>Weather Description: {cityData.weather[0].description}</p>
                  </div>
                )}
                {page === 2 && (
                  <div>
                    <h2 className="text-center mb-4">Min and Max Temperatures</h2>
                    <h3>Min Temperature: {cityData.main.temp_min}°C</h3>
                    <h3>Max Temperature: {cityData.main.temp_max}°C</h3>
                  </div>
                )}
                {page === 3 && (
                  <div>
                    <h2 className="text-center mb-4">Wind and Geo Location</h2>
                    <h3>Wind Speed: {cityData.wind.speed} m/s</h3>
                    <h3>Geo Location: {cityData.coord.lat}, {cityData.coord.lon}</h3>
                  </div>
                )}
                <div className="text-center mt-4">
                  <Button variant="primary" onClick={() => setPage(1)}>Page 1</Button>{' '}
                  <Button variant="primary" onClick={() => setPage(2)}>Page 2</Button>{' '}
                  <Button variant="primary" onClick={() => setPage(3)}>Page 3</Button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default Home;
