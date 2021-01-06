import { useState } from "react";

// import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";

import styles from "./Home.module.css";

export default function Home(props) {
  const { countries = [], res } = props;
  const [keyword, setKeyword] = useState("");

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>
          {" "}
          Found {countries.length} countries.
        </div>

        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by name, region and sub region"
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountries}></CountriesTable>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`https://restcountries.eu/rest/v2/all`);
  const countries = await res.json();

  console.log(res.data);

  return {
    props: {
      // res,
      countries,
    },
  };
};
