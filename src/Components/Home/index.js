import { Component } from "react";
import { AiFillStar } from "react-icons/ai";
import { MdSort } from "react-icons/md";
import Cookies from "js-cookie";
import { Link, Navigate } from "react-router-dom";
// import Loader from "react-loader-spinner";

import Slider from "react-slick";
import Header from "../Header";
import Footer from "../Footer";
import ContextRct from "../../Context/index";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const restarentsStatus = {
  loading: "loading",
  success: "success",
};
const settings = {
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

class Home extends Component {
  state = {
    s: 1,
    sortBy: "Lowest",
    offersData: [],
    restaurentsData: [],
    resStatus: restarentsStatus.loading,
    offerStatus: restarentsStatus.loading,
  };

  componentDidMount() {
    this.getOffers();
    // console.log(Cookies.get("jwt_token"));
    this.getRestaurents();
  }

  getOffers = async () => {
    const url = "https://apis.ccbp.in/restaurants-list/offers";
    const token = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, options);
    const jsonData = await response.json();
    this.setState({
      offersData: jsonData.offers,
      offerStatus: restarentsStatus.success,
    });
    // console.log(jsonData.offers);
  };

  getRestaurents = async () => {
    const { s, sortBy } = this.state;
    const token = Cookies.get("jwt_token");
    const offset = (s - 1) * 9;
    // console.log(sortBy)
    const url = `https://apis.ccbp.in/restaurants-list?sort_by_rating=${sortBy}&offset=${offset}&limit=9`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const response = await fetch(url, options);
    const jsonData = await response.json();
    this.setState({
      restaurentsData: jsonData.restaurants,
      resStatus: restarentsStatus.success,
    });
    // console.log(jsonData.restaurants);
  };

  incr = () => {
    const { s } = this.state;
    if (s < 4) {
      this.setState((prev) => ({ s: prev.s + 1 }), this.getRestaurents);
    }
  };

  dicr = () => {
    const { s } = this.state;
    if (s > 1) {
      this.setState((prev) => ({ s: prev.s - 1 }), this.getRestaurents);
    }
  };

  sortByFunction = (event) => {
    this.setState({ sortBy: event.target.value }, this.getRestaurents);
  };

  loadingOffersFunction = () => (
    <div className="loader-align">
      {/* <Loader color="blue" type="ThreeDots" />
       */}
      <p>Loading......</p>
    </div>
  );

  loadingOffersFunction1 = () => (
    <div className="loader-align">
      <p>Loading......</p>
    </div>
  );

  successOffersFunction = () => {
    const { offersData } = this.state;
    return (
      <Slider {...settings}>
        {offersData.map((item) => (
          <li key={item.id}>
            <img className="carousel-img" alt="offer" src={item.image_url} />
          </li>
        ))}
      </Slider>
    );
  };

  AiFunctionOffers = () => {
    const { offerStatus } = this.state;
    switch (offerStatus) {
      case "loading":
        return this.loadingOffersFunction();
      case "success":
        return this.successOffersFunction();

      default:
        return "";
    }
  };

  successResFunction = () => {
    const { s, restaurentsData } = this.state;
    // console.log(restaurentsData)

    return (
      <div>
        <ul className="restaurent-bg">
          {restaurentsData.map((item) => (
            <Link to={`/restaurant/${item.id}`}>
              <li className="single-rest" key={item.id}>
                <img
                  className="rest-img"
                  src={item.image_url}
                  alt="restaurant"
                />
                <div>
                  <h1 className="rest-heading">{item.name}</h1>
                  <p>{item.cuisine}</p>
                  <p>
                    <AiFillStar color="#FFCC00" size="20" />
                    {item.user_rating.rating}
                  </p>
                  <h5>{item.user_rating.total_reviews} ratings</h5>
                </div>
              </li>
            </Link>
          ))}
        </ul>
        <div className="buts-inc-dic">
          <button onClick={this.dicr} type="button">
            &lt;
          </button>
          <span>{s} 0f 4</span>
          <button onClick={this.incr} type="button">
            &gt;
          </button>
        </div>
      </div>
    );
  };

  AiFunctionRestaurents = () => {
    const { resStatus } = this.state;
    switch (resStatus) {
      case "loading":
        return this.loadingOffersFunction1();
      case "success":
        return this.successResFunction();

      default:
        return "";
    }
  };

  render() {
    const token = Cookies.get("jwt_token");
    if (token === undefined) {
      return <Navigate to="/login" />;
    }

    return (
      <ContextRct.Consumer>
        {(value) => {
          const { sortByOptions } = value;
          const { sortBy } = this.state;

          return (
            <div>
              <Header />
              <div className="home-bg">
                <ul>{this.AiFunctionOffers()}</ul>
                <h1>Popular Restaurants</h1>
                <p>
                  Select Your favourite restaurant special dish and make your
                  day happy...
                </p>
                <MdSort />
                <p className="home-sortby">Sort By</p>

                <select
                  value={sortBy}
                  onChange={(event) => this.sortByFunction(event)}
                >
                  {sortByOptions.map((item) => (
                    <option key={item.id} value={item.value}>
                      {item.displayText}
                    </option>
                  ))}
                </select>
                {this.AiFunctionRestaurents()}
              </div>
              <Footer />
            </div>
          );
        }}
      </ContextRct.Consumer>
    );
  }
}

export default Home;
