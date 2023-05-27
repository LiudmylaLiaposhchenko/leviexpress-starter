import React, { useEffect, useState } from 'react';
import './style.css';

const CityOptions = ({ state, setState, cities }) => {
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

const DatesOptions = ({ date, setDate, dates }) => {
  return (
    <select
      onChange={(e) => {
        setDate(e.target.value);
      }}
      value={date}
    >
      <option value="">Vyberte</option>
      {dates.map((date) => (
        <option key={date.dateBasic} value={date.dateBasic}>
          {date.dateCs}
        </option>
      ))}
    </select>
  );
};

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [dates, setDates] = useState([]);
  const [cities, setCities] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://apps.kodim.cz/daweb/leviexpress/api/journey?fromCity=${fromCity}&toCity=${toCity}&date=${date}`,
    )
      .then((response) => response.json())
      .then((data) => onJourneyChange(data.results));
  };

  useEffect(() => {
    fetch('https://apps.kodim.cz/daweb/leviexpress/api/cities')
      .then((response) => response.json())
      .then((data) => setCities(data.results));
    fetch('https://apps.kodim.cz/daweb/leviexpress/api/dates')
      .then((response) => response.json())
      .then((data) => setDates(data.results));
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
            <DatesOptions date={date} setDate={setDate} dates={dates} />
          </label>
          <div className="journey-picker__controls">
            <button
              className="btn"
              type="submit"
              disabled={fromCity === '' || toCity === '' || date === ''}
            >
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};
