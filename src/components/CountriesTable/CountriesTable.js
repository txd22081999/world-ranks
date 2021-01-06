import { useState } from "react";
import Link from "next/link";

import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import styles from "./CountriesTable.module.css";
import Country from "../../pages/country/[id]";

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] < b[value] ? 1 : -1));
  }
  return [...countries];
};

const SortArrow = ({ direction }) => {
  if (!direction) return null;

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries = [] }) => {
  const [direction, setDirection] = useState("");
  const [value, setValue] = useState("");

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection("desc");
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>

          {value === "name" && <SortArrow direction="desc" />}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>

          {value === "population" && <SortArrow direction="desc" />}
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>

          {value === "area" && <SortArrow direction="desc" />}
        </button>

        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>Gini</div>

          {value === "gini" && <SortArrow direction="desc" />}
        </button>
      </div>

      {orderedCountries.map(
        ({ name, population, alpha3Code, area = 0, gini = 0, flag }) => (
          <Link href={`/country/${alpha3Code}`}>
            <div className={styles.row} key={alpha3Code}>
              <div className={styles.flag}>
                <img src={flag} alt={name} />
              </div>
              <div className={styles.name}>{name}</div>

              <div className={styles.population}>{population}</div>

              <div className={styles.area}>{area || 0}</div>

              <div className={styles.gini}>{gini || 0}</div>
            </div>
          </Link>
        )
      )}
    </div>
  );
};

export default CountriesTable;
