import React, {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";


/* const fetch_countries = await Promise.all(countries.map(async(country) => {
    const stats = await fetch(
      `https://api.covid19api.com/total/country/${country.Slug}`
    ).then((response) => response.json());
    stats_per_country.push(stats);
  })); */

/**
 * This is the Country functional component. Look closely, I passed stats.Country as a prop to the
 * NextJS Link Component. NextJS comes with routing attached. So, I don't need to worry about routing 
 * so long as I have my route file set up correctly. The routes are the files within the pages folder.
 * You can nest routes by plopping subfolders into the pages folder. 
 * 
 */
const Country = ({ stats }) => {

  return (
    <>
      <Image
        src={`https://www.countryflags.io/${stats.CountryCode}/flat/64.png`}
        width={64}
        height={64}
        alt={stats.Country}
      ></Image>
      <Link href={`countries/${stats.Slug}`} passHref>
        <a>{stats.Country}</a>
      </Link>
    </>
  );
};

export default Country;
