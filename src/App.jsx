import React, { useEffect, useState } from "react";
// import ShowDetails from "./components/Seachbar";
import { Loader } from "./components";
import "./app.css";
import axios from "axios";

const App = () => {
  const [searchterm, setSearchterm] = useState("");
  const [dataa, setdata] = useState({});
  const [loading, setLoading] = useState(true);
  const [show, setshow] = useState(false);
  // const key = "38605139d8514808aee100446231707";
  const key = process.env.REACT_APP_KEY_WEATHER;
  const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${searchterm}&aqi=yes`;

  useEffect(() => {
    // console.log(dataa);
    console.log("");
  }, [searchterm]);

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchterm !== "") {
      setLoading(true);
      await axios
        .get(url)
        .then((response) => {
          setdata(response.data);
          setLoading(false);
          setshow(true);
        })

        .catch((err) => {
          alert(err.response.data.error.message);
          refreshPage();
        });
    }
    setSearchterm("");
  };

  if (show) {
    return (
      <div className="main">
        {/* <Searchicon /> */}
        <main>
          <section className="input-form">
         
            <form>
              <input
                required
                type="text"
                placeholder="Enter Location....."
                value={searchterm}
                name={searchterm}
                onChange={(e) => {
                  setSearchterm(e.target.value);
                }}
              />
              <button onClick={handleSearch}>search</button>
            </form>
          </section>

          {loading === true ? <Loader /> : null}

          <section className="details">
            <div className="location-icon">
              {dataa.location ? (
                <div className="location">
                  <h1>{dataa.location.name}</h1>
                  <span>
                    {dataa.current.temp_c} <span>&#8451;</span>
                  </span>
                  <p>{dataa.location.region}</p>
                  <p>{dataa.location.country}</p>
                  <h3>{dataa.location.localtime}</h3>
                </div>
              ) : null}
              <div className="icon">
                <p>{dataa.current.condition.text}</p>
                <img src={dataa.current.condition.icon} alt="" />
              </div>
            </div>
            <div className="current">
              {dataa.current ? (
                <section>
                  <div className="cart">
                    <h1>Wind details</h1>
                    <br />
                    <div>
                      <p>Speed : </p>
                      <h3>{dataa.current.wind_kph}</h3>
                      <span>km/h</span>
                    </div>
                    <div>
                      <p>Direction :</p>
                      <h3>{dataa.current.wind_dir}</h3>
                    </div>
                  </div>
                  <div className="cart">
                    <h1>Environment Details</h1>
                    <div>
                      <p> Humidity :</p>
                      <h3>
                        {dataa.current.humidity} <span>%</span>{" "}
                      </h3>
                    </div>

                    <div>
                      <p>Precipitation :</p>
                      <h3>{dataa.current.precip_mm}</h3>
                      <span>mm</span>
                    </div>
                    <div>
                      <p>Precipitation :</p>
                      <h3>{dataa.current.precip_in}</h3>
                      <span>in</span>
                    </div>
                  </div>
                  <div className="cart">
                    <h1>Feels Like </h1>
                    <div>
                      <p> Visivilty :</p>
                      <h3>{dataa.current.vis_km}</h3>
                      <span>km</span>
                    </div>

                    <div>
                      <p> Temperature :</p>
                      <h3>{dataa.current.feelslike_c}</h3>
                      <span>&#8451;</span>
                    </div>

                    <div>
                      <p> Temperature :</p>
                      <h3>{dataa.current.feelslike_f}</h3>
                      <span> &#8457; </span>
                    </div>
                    <div>
                      <p>UV :</p>
                      <h3>{dataa.current.uv}</h3>
                      <span></span>
                    </div>
                  </div>
                </section>
              ) : null}
            </div>
          </section>
        </main>
      </div>
    );
  } else {
    return (
      <section className="input-form">
           <h1>{key}</h1>
        <form>
          <input
            required
            type="text"
            placeholder="Enter Location....."
            value={searchterm}
            name={searchterm}
            onChange={(e) => {
              setSearchterm(e.target.value);
            }}
          />
          <button onClick={handleSearch}>search</button>
        </form>
      </section>
    );
  }
};

export default App;
