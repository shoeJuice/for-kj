import { useRouter } from "next/router";
import {useEffect} from "react";

/**
 * This is an example of a dynamic route set up using NextJS. To set up dynamic routes, you need to
 * name your route to [your_variable_here].jsx. The variable within the brackets is an attribute of the
 * context.query object that is destructured in the getServerSideProps method below.
 *
 * Note that I use the JSX file extension to denote whenever my code is going to rely on JSX.
 * It doesn't make much of a differerence but it helps to have that consistency when naming files.
 */

function CountryData({ data }) {
  const router = useRouter();

  useEffect(() => {
    if (!data) {
      setTimeout(() => {
        
        router.push("/");
      }, 10000);
    }
  }, []);

  return data ? (
    <div>
      <h1>Country: {data.Country}</h1>
      <h1>Confirmed: {data.Confirmed}</h1>
      <h1>Deaths: {data.Deaths}</h1>
      <h1>Active: {data.Active}</h1>
    </div>
  ) : (
    <div>There is no data for this country. Sorry!</div>
  );
}

/**
 *
 * The getServerSideProps method helps when you're making use of data that is prone to change.
 * You can use getServerSideProps to get the data from the server and ensure that the data is
 * fresh on each render. However, be aware that the performance of this method is heavily reliant
 * on the complexity of the calls you make within this function, and the connection strength of
 * the end user. Unless you condition the component otherwise, it may not render until the data is ready.
 *
 * @param {*} ctx The context object. Destructure its query attribute to get the query string.
 * @returns An object containing the props you've assembled through the server.
 */
export async function getServerSideProps(ctx) {
  const { country } = ctx.query;
  const target_country = String(country).toLowerCase();
  console.log(target_country);

  let data;

  data = await fetch(
    `https://api.covid19api.com/total/country/${target_country}`
  ).then((response) => response.json());
  // This call returns a huge list of data, I'm assuming you just need
  // the last entry in the list.

  data = data.slice(-1)[0];
  console.log(data);

  return data
    ? {
        props: {
          data,
        },
      }
    : {
        props: {
          error: {
            message: "Method not allowed",
          },
        },
      };
}

export default CountryData;
