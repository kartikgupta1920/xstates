import React, { useState, useEffect } from 'react';
import styles from './LocationSelector.module.css';

function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://crio-location-selector.onrender.com/countries');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async (countryName) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async (countryName, stateName) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState('');
    setSelectedCity('');
    setStates([]);
    setCities([]);
    if (country) {
      fetchStates(country);
    }
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity('');
    setCities([]);
    if (state) {
      fetchCities(selectedCountry, state);
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className={styles['location-selector']}>
      <div className={styles['dropdown']}>
        <label htmlFor="country">Select Country:</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          className={styles['select']}
        >
          <option value="">--Select Country--</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className={styles['dropdown']}>
        <label htmlFor="state">Select State:</label>
        <select
          id="state"
          value={selectedState}
          onChange={handleStateChange}
          className={styles['select']}
          disabled={!selectedCountry}
        >
          <option value="">--Select State--</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className={styles['dropdown']}>
        <label htmlFor="city">Select City:</label>
        <select
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
          className={styles['select']}
          disabled={!selectedState}
        >
          <option value="">--Select City--</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {selectedCity && (
        <p className={styles['selection-result']}>
          You selected {selectedCity}, {selectedState}, {selectedCountry}.
        </p>
      )}
    </div>
  );
}

export default LocationSelector;
