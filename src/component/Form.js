import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Form.css";
import logo from "../img/logo.jpg";

const Form = () => {
  const [isCardVisible, setCardVisible] = useState(false);

  const handleCardOnClick = (e) => {
    e.preventDefault(); // Prevent form submission
    setCardVisible(true);
  };

  const handleResetOnClick = () => {
    setCardVisible(false);
  };

  return (
    <div className="d-flex justify-content-center flex-column ">
      {/* Form Section */}
      {!isCardVisible && (
        <div className="row justify-content-center" id="form">
          <div className="card col-lg-6 col-md-8 col-sm-10 col-12 m-3 p-4">
            <h4 className="text-center">Form Application</h4>

            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Check me out
                </label>
              </div>

              <button
                type="submit"
                onClick={handleCardOnClick}
                className="btn btn-primary mt-3 w-100"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Custom Card Section */}
      {isCardVisible && (
        <div className="row justify-content-center align-item-center">
          <div className="offset-lg-3"></div>
          <div className="card justify-content-center col-lg-6 col-md-8 col-sm-10 col-12 m-1 p-4 bg-dark text-white">
            <div className="row align-items-center m-2 px-5">
              <div className="col-auto">
                <div className="logo p-0">
                  <img src={logo} alt="img" style={{ width: "50px" }} />
                </div>
              </div>

              <div className="col">
                <div className="heading d-flex align-items-start">
                  <span>GMTUSDT</span>
                  <span className="sub-head badge bg-secondary mx-2">Perp</span>
                  <span className="badge bg-secondary">Cross 20x </span>
                  <span className="badge text-secondary">!!!!</span>
                </div>
              </div>

              <div className="col-auto">
                <FontAwesomeIcon icon={faShareNodes} />
              </div>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <div className="col-auto px-3">
                <u className="text-secondary dotted">Unrealized PNL (USDT)</u>
                <div className="text-danger">-0.01</div>

                <u className="text-secondary dotted">Size (USDT)</u>
                <div>19.89852</div>

                <u className="text-secondary dotted">Entry Price (USDT)</u>
                <div>0.12606</div>
              </div>

              <div className="col-auto px-3">
                <div className="text-secondary ">Margin (USDT)</div>
                <div>0.99</div>

                <div className="text-secondary ">Mark Price (USDT)</div>
                <div>0.12604</div>
              </div>

              <div className="col-auto px-3">
                <u className="text-secondary dotted">ROI</u>
                <div className="text-danger">-1.90%</div>

                <u className="text-secondary dotted">Margin Ratio</u>
                <div className="text-success">5.94%</div>

                <div className="text-secondary">Liq. Price (USDT)</div>
                <div>0.09565</div>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <div className="col-auto">
                <button className="btn btn-secondary">Leverage</button>
              </div>
              <div className="col-auto">
                <button className="btn btn-secondary">TP/SL</button>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-secondary"
                  onClick={handleResetOnClick}
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="offset-lg-3"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
