import React from "react";
import Country from "./Country";

const CountryList = ({ stats }) => {
  return (
    <div>
      {stats.map((country) => (
        <div key={country.countryCode}>
            <Country stats={country} />
        </div>
      ))}
    </div>
  );
};

export default CountryList;
