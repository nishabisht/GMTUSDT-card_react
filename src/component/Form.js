import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Form.css";
import logo from "../img/logo.jpg";

const Form = () => {
  const [entryPrice, setEntryPrice] = useState("");
  const [margin, setMargin] = useState("");
  const [markPrice, setMarkPrice] = useState("");
  const [leverage, setLeverage] = useState("");
  const [size, setSize] = useState(null);
  const [unreleasedPnl, setUnreleasedPnl] = useState(null);
  const [roi, setRoi] = useState(null);
  const [marginRatio, setMarginRatio] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [lidPrice, setLidPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const size = margin * leverage;
    const calculatedRoi = ((markPrice - entryPrice) / entryPrice) * 100;
    const unreleasedPnl = (calculatedRoi * margin) / 100;
    const calculatedMarginRatio = (margin / size) * 100;

    setLidPrice(0.09565);
    setEntryPrice(entryPrice);
    setSize(size);
    setUnreleasedPnl(unreleasedPnl);
    setRoi(calculatedRoi);
    setMarginRatio(calculatedMarginRatio);
    setIsCardVisible(true);
  };

  const handleClose = () => {
    setIsCardVisible(false);
  };

  return (
    <div className="container-fuild d-flex justify-content-center align-items-center">
      <div className="form-container">
        {!isCardVisible && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Entry Price (USDT)</label>
              <input
                type="number"
                step="0.00001"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Margin (USDT)</label>
              <input
                type="number"
                step="0.00001"
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Mark Price (USDT)</label>
              <input
                type="number"
                step="0.00001"
                value={markPrice}
                onChange={(e) => setMarkPrice(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Leverage</label>
              <input
                type="number"
                step="0.00001"
                value={leverage}
                onChange={(e) => setLeverage(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        )}

        {isCardVisible && (
          <div className="gmt-card ">
            <div className="card-header">
              <div className="logo">B</div>
              <div className="card-title ">
                <span className="gmt">GMTUSDT</span>
                <span className="gmt-badge">Perp</span>
                <span className="gmt-badge">Cross 20x</span>
                <span className="gmt gray">!!!!</span>

                <span className="gmt gray right-icon ">
                  <FontAwesomeIcon icon={faShareNodes} />
                </span>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="dotted label">Unrealized PNL (USDT)</div>
                  <div className={unreleasedPnl >= 0 ? "green" : "red"}>
                    {unreleasedPnl.toFixed(2)}
                  </div>
                  <div className="dotted label">Size (USDT) </div>
                  <div>{size.toFixed(5)}</div>
                  <div className="dotted label">Entry Price (USDT) </div>
                  <div>{entryPrice}</div>
                </div>
                <div className="col">
                  <div className="spacer"></div> {/* First empty space */}
                  <div className="spacer"></div> {/* Second empty space */}
                  <div className="label">Margin (USDT) </div>
                  <div>{margin}</div>
                  <div className="label">Mark Price (USDT) </div>
                  <div>{markPrice}</div>
                </div>
                <div className="col text-end">
                  <div className="dotted label">ROI</div>
                  <div className={roi >= 0 ? "green" : "red"}>
                    {roi.toFixed(2)}%
                  </div>
                  <div className="dotted label">Margin Ratio </div>
                  <div>{marginRatio.toFixed(2)}%</div>
                  <div className="label">Liq. Price (USDT) </div>
                  <div>{lidPrice.toFixed(5)}</div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="action-btn">Leverage</button>
              <button className="action-btn">TP/SL</button>
              <button className="action-btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
