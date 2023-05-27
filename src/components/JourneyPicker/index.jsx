import React, { useEffect, useState } from 'react';
import './style.css';

export const CityOptions = ({ state, setState, cities }) => {
  return (
    <select
      onChange={(e) => {
        setState(e.target.value);
      }}
      value={state}
    >
      <option value="">Vyberte</option>
      {cities.map((city) => (
        <option key={city.code} value={city.code}>
          {city.name}
        </option>
      ))}
    </select>
  );
};

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([
    { name: 'Praha', code: 'CZ-PRG' },
    { name: 'Brno', code: 'CZ-BRQ' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fromCity, toCity, date);
  };
  useEffect(() => {
    fetch('https://apps.kodim.cz/daweb/leviexpress/api/cities')
      .then((response) => response.json())
      .then((data) => setCities(data.results));
  }, []);

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form onSubmit={handleSubmit} className="journey-picker__form">
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <CityOptions
              setState={setFromCity}
              state={fromCity}
              cities={cities}
            />
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <CityOptions setState={setToCity} state={toCity} cities={cities} />
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select
              onChange={(e) => {
                setDate(e.target.value);
                console.log('d');
              }}
              value={date}
            >
              <option value="">Vyberte</option>
              <option value="datum01">Datum 01</option>
              <option value="datum02">Datum 02</option>
              <option value="datum03">Datum 03</option>
              <option value="datum04">Datum 04</option>
              <option value="datum05">Datum 05</option>
            </select>
          </label>
          <div className="journey-picker__controls">
            <button className="btn" type="submit">
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};
