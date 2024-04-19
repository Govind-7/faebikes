import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams, Navigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

import "./index.css";
import FoodItem from "../FoodItem";

const resDetailsStatus = {
  loading: "loading",
  success: "success",
};

const RestDetails = () => {
  const [hotelData, setHoteldata] = useState("");
  const [foodItems, setFooditems] = useState([]);
  const [status, setStatus] = useState(resDetailsStatus.loading);

  const { id } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const url = `https://apis.ccbp.in/restaurants-list/${id} `;
    const token = Cookies.get("jwt_token");
    const options = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const jsonData = await response.json();
    setHoteldata(jsonData);
    setFooditems(jsonData.food_items);
    setStatus(resDetailsStatus.success);

    // console.log(jsonData)
  };

  const successFunction = () => {
    return (
      <div>
        <div className="rest-img-details-align">
          <img alt="restaurant" src={hotelData.image_url} />
          <div className="resta-details-align">
            <h1>{hotelData.name}</h1>
            <p>{hotelData.cuisine}</p>
            <p>{hotelData.location}</p>
            <div className="rating-align">
              <div>
                <p>{hotelData.rating}</p>
                <p>{hotelData.reviews_count} ratings</p>
              </div>
              <div>
                <p>{hotelData.cost_for_two} Cost for two</p>
              </div>
            </div>
          </div>
        </div>

        <ul className="ul-items-align">
          {foodItems.map((item) => (
            <FoodItem key={item.id} data={item} />
          ))}
        </ul>
      </div>
    );
  };

  const loadingFunction = () => (
    <div className="loader-align">
      <p>Loading ...</p>
    </div>
  );

  const aiFUnction = () => {
    switch (status) {
      case "success":
        return successFunction();

      case "loading":
        return loadingFunction();

      default:
        return "";
    }
  };

  if (Cookies.get("jwt_token") === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <div className="rest-details-main-bg">
        {aiFUnction()}
        <Footer />
      </div>
    </div>
  );
};

export default RestDetails;
