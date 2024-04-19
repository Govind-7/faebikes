import { Link, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import { ImCross } from "react-icons/im";

import "./index.css";

const Header = () => {
  const [mMode, setMmode] = useState(false);
  const navigation = useNavigate();

  const logoutFunction = () => {
    Cookies.remove("jwt_token");

    navigation("/login");
  };

  const specialFunc = () => {
    setMmode((prevS) => !prevS);
  };
  //   console.log(mMode);

  return (
    <div>
      <nav className="header-bg">
        <div className="header-heading">
          <Link to="/">
            <img
              className="swiggy-logo"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAwFBMVEX3iB/////1iCP8//////zzeQD5///3hxv81Lz3ggDziSD3hRb4//v1kDH3gwj7//z/8+v2pmj3fgD2sX73dwD94Mj96d3y///82cH2lkj2rXb25dP8/fb7jTL4yKP2kjn3m1T94tL1t4z59ev6hSbvjiDzuon3wqP37+Hzol/7yqz4oWbzza/8zbX4kkL438L0v5fsm036bADuq2L2nkzuw5fkiyjzmT7pgAX42LT3uZb7tXfx+eztp2r30Kf46c+xHTnXAAANIUlEQVR4nO2dC1/bNheHbUmWsCRLsXOPhXMxzRzwS9yt3WAF+v2/1XvkkIxLAgGWRWx+frQlTprob51zdHSN5zU0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0/Ndhq3+EEGoF/CaOW6QPgBATjEfD4eQiji/ii8lweMqEEh46dsneDlJsPInb2XRaEIp97Pem02x0MYlEeOyivRURXi7apZVBKcZY6z787WPc6mXtCQrFJ6odIS4v/teyhdeaEh8gxCeaYgKScJEtxuqTuA9nyXA0MP5uaF6OLhU7dkH3gKlxvDRUvyDGSEoGF6fu+w5Tk9IA+AUxGp6mrWoYulw5DHnKG6U+oWBKL4iB0EbgNd2YuxunGedqWOUvqXhMPosEP3apd4HUcEnl3lo0Nd
            ll6KqacLJ8KYg9hWhtTobhJvNxCPCXSZe8QUuN6U6SY5f8GQyBjXWleasaKbuXijtWNQypr0sIuW+tGaJNyZ3LBgS6hnbyzWYG+Y35LhyrGS+s8pfayRfQ+cwxtwlHuXwpg3lJjCwm6tjlfwASw6mv32xj91AzOLaAR6jz9yqpac2V50zjqRbFR7T4OB27EwNU+VrFSJ+Slr8rRJC8ciYGqLh4LZLd+PKuXe1qhohMTx2pGpaU5rVIZmgRXqnrXU9jZ6pGTdLXwjL25TRAbLT7BSliTvRtwszgV3wG+3oQCNbe9Tzxi1vFjh7Q+Jng3ZeVWDHE73Y8tVMMyCkTByoGqUXvbxDjT7kDYrykav0dYoqRAzkNUyeva
            tlHTF6po/uMJ8bTv0UMHhzfadgeLeZ+YlIHzCxsF68nmfuIcaEjkOzTK9tHTD46fhLQKfcYxdhDjN9aHL9mOoNXpdhxC793LwYTAj8E22EzbTMH+zulNJ+j4+eawV5ipN+yYiiWFKSsastq0pjaUelWmsXcgRmoN4gRk5s+9e0UmpVi/2DcKtKTahZ/jY5vY96bxDDvdjY7H3Qtg8HdrA3Ei8n4FCnBwMaO3miy4OS1lHkjxmNCiPFwxeXYs/Ppdkr9+L6yBsS8HprvxYAcq+cextxRcU+S7TEwY8X8Krbhlp6k3dpjKFP7+W/RafSIU4uXJPU6h6P7i4Wp2z1yM8tNbxvp9fmPKAnR2bGFWBiLpnuJwVjLp1egqTG5zHvTUXBsHTWMq9d7zfWUrE0DyFOwr20y0Drnws7vHhuUZG+elXmuNZ+H6Phuw3m4R7f5NTROh8KFCTTx9fUBjVeAnDOfuzAbyPYZatpDz3mCjj8dyHlyArf2ndNmG0x2/K4ZRDMWjoq3TzM/pXWrHOjPgJ1NUvxBMcTvfRVuLG5IuvTdc4ArjEldWY2azPOPicGUDNzIAew4YEo/FADIjZk74P81XJ18MJrh4psT3WYLxLMPidEyTZzwfs8uA+DpxyrGZK64DJB8zz+UbbYWrlSM7QYMe1S/c7mJJfWOPwe4Bokgk6/OOO/GZO6scoYMUSwK+c6mBhPcm7hTMZbg5L0VoyU9UW6N0qjhe6Oz7uftxInxjDUMqX3Gz7aTJp4TCxrWsLPk9+J9MUAXriw12XCG1B/5i2vmd4GLK0cS5jVMoLMkftcyTVMlToUyz6phnkjmJzshW4WCn/Uit+LyGpYEu+hcbY0PxjffHUrL9oJ5vLN1dE3qlDvR+d/B9lkXpraKwfJ74MAQ03ZACIo4EyrZIERd2mCrGNpzd3uT8CKkErWI2z/XUxbpPBY2XG0XA42/s2I4Ekm8NBj7Gq9mlQ3t05u7zi4xU+Hu3ibIau7sOgXa7/urCRhMiMT4h9oihvgyX6gzVz3GQ2zL2nOoqFG4RYzB8vrKcyrFfARi7OuWQm8XQ3TrD4Hcm3JewxHqPJvg2CXGz7OAu9WReYqa5E8Gnom/Q8w0cNb51yTTJzOxZoeY/NbZfY0b1LdiLzHkuuPANOYrRMG1xvSBpRnjL56FZtrvcTdWMrzMF15I8qCfRqQfC5Y8FoMLB1Yxvg73kvnjzQF9nEVn88dGJpcdl7r9uwDrAUN74DbYGNqbPqwVUJqeubc9czvqsnhxv7YxeexcX3kXLGm/OI4ub64D5nCX7AnB8oVRNCLTK+Zsl+wpkG+Oi12rHSFq518/QyTbIIL5rhFByHbmwWeIZBuECJbbZ6Clwd3A3R7ZNqCXNs6lxs9rh/gF/1RSLEjdGvN08Z+tmc/R9D+GRZ2TPnleM2beOXbR3g5nnKdPzQy8qBs4NX2xN8nF05F0yGvCz9K+PCX587HPYJNP3D+haQdfgu6jnebYfLIW5gFcqHFLrpsbjYm+c7/X/wJJnK8zAYnN9SdrLZ8SnK9PB9M05c4sXXofCNyGgKURH+dD9WlS5e3wZFho8BuJ8x+dT21jXj0iEIPnG2oD2afpju2AeTzINCF0lnz53Dbm1YuEeNCltKusrmOX5uNwFqYu7ML+W0CemAw/dwPzEC7Yv0dMQ0NDQ0PDfw/mMaFCQCA7MCHCJEmU/Y2h1W54xOylOj0W9rl10s+ZPcogUUkSos0qRnb/FqFKwtVFZpd2hfcnnd3/figpzBNsUZ2X30eRAjViOMuqrN5gwdh84dlCoHn25/nCXhn+8ssv2brcSKhhGx5n2eJqfSYTsynouP0nXJ7HUb3ndDz/5c+qvdp9ykbnVTYbHq7fIKJ5agzWRTkRVgx0iWk5hs8L4yK9FKBpUlBCY2avYOhernf4Baia1jM2JC1/3I81M6SiebcFXWqTF+UtVDYa3/mEFG2bYsObY0NPDneMI0OzgtrTcrFefoOii1JTmcfQVUkGBrcZY+HcaFmALC9ZSGlosCpL+EeX2v+lfehCF/GqP8C88Z2hWsMlqXUxs7dn1MIYD+rbM4MXH/KcMLVI4TZSCjdfzpU9paGgms6YF05aBHdBQ7LUmt7Z/rGKCdZ+7UhcoGUflPmUYrgXdL5yJTEuJbVvh7E2WGbgTeI0gwd2C7qaTLHRd9HhrEy1c/ioskplDnZmrS4FXcuhqDcCkNiuAoKCWSsDM7ODf1YM58E5lUabwWyWgfoyqpdlMa8tqcRmWc2yFMtyyOrbVYC25VCxyoDB3aqDDYCysG3AHuLO7V07qm9ukoFV3YySb3bPGS7HnZJo+rO+nQ/EnI3tfNnNaBgqftstkarFiPHPvpR5dclCFJfl8KqOil5l66lKJqk2MjvkihQrhphBHEFvaxU94x7WOEtKDTZBzQL1ICJU/HHNoGRurWke2EXpajgOGYNXMG+kwasyZtfPqfFQ8TP7lmBeYIvp1wrMFZzrcCPTSCxSCsVOB+3oatUWoC72/Wnco/UXG1TtFvj5RV1pD8QEP7Gvc8W4gBYK2o7aDxg6h/vQWoTQuIR1e7VyDzbPfZJfdyEu3B30hADGK3BZonFefr2yF3hivwcg7+ZgL9LINCUYd8fisRivI6G+0g5S7cGKHyFY2emAYr8XitN2t764nNezHQpCstZ5TnB64DPC1OUdeLiNpenIFpkLe+6kNsT0Mxu0wWnxaPXSBz7zqw1lPztemFnPgp+7pBaDfTIIUJRR4mMs6SCxjS/3RtBUaTCA6sDb0BEft7vQtkB8Xf6xspZrDZ9MdL7IDLiNJvl9m/1ATMcYafIOVxk0iRLElwHy2OkJPEoZRxm169Okv9qrzQUv6wPQpoc9Vg/yDxGoSfs6h0iTt+uGPJnnoID4GYe230hNy9OnYljyk0JDEvAkA4+CECJPAuszFSW4+JacQn0RqFv/5H67RjgqiPbN7MDbHYX6Vo0ScQl5gNSzOglkdsc59vOYqRK8xvRH90V44DPih81s5h21mM3aA+mbutgs7kPbcx3wRTWf3+GNGMSiEt6yd8hQZhnPUpPGQQeCGibVaj9iUoJ54esxU5MWSCzWmeEDMR432Mib6vcg6HSqvm9KW2xxWdSe8cVGst/sV1Fs1gecg2OB+x9UjGjbRRfFSVZ/WU61mmoNfxQQ3Ww4CAdS0jJ6Jobx8DuGWsvT7l03TaE+ajGQAdhVDzrtXl93e0STwSYBvRdzSC2emCy1XcdnJHjo+sMEh6bmZJU55/4qlXksxvr0XT+/Ib6RBFv3ua4NyiZiGkIJrU861P76sIZ/RgwTi5/2MD9iv2dhfr/unUFKQ0ar7tiyXwzXRVCx0X1ss2bkcRVBAtnXBEPyiWlrFTs8Fs0gYzUQmCUkr635XzUD6Wu6OOwkOwc15y34XGy6o/H6YjIplqt2MrmV3/lfNQOOYr7cP2R8VNpjpuCWF7NJtP56OjQqc8j5KTVptljPRTFUQg1OLw4rhiFoZybtKqtGw81yUcjv24svq9Txy/zb5igsdLqIJ39t84c+5SKugIvJg/X/jI0nI3i/2WJ4+uAk7eHFxcXk0Ee4c2tq3unpo60ViKOI25OjOWeRt1l+ZY1LhF82j5gQKkIRpMwPG3bowqAoilB9UMsmetnX/kM7Hp4fTIi2ru1B3rMjC7aeacgcPOmwoaGhoaGhoaGhoaGhoaGhoeE/D/oX8X9pZgPr2yPRqgAAAABJRU5ErkJggg=="
              alt="website logo"
            />
          </Link>
        </div>

        <Link className="head-special" to="/">
          <p>Home</p>
        </Link>
        <Link className="head-special" to="/cart">
          <p>Cart</p>
        </Link>

        <button
          className="header-button"
          onClick={logoutFunction}
          type="button"
        >
          Logout
        </button>

        <button onClick={specialFunc} className="menu-button" type="button">
          <AiOutlineMenu />
        </button>
      </nav>
      {mMode && (
        <nav className="mobile-view-align">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/cart">
            <p>Cart</p>
          </Link>

          <button className="but1" onClick={logoutFunction} type="button">
            Logout
          </button>

          <button className="but2" onClick={specialFunc} type="button">
            <ImCross />
          </button>
        </nav>
      )}
    </div>
  );
};

export default Header;
