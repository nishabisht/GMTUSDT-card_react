import {
  faDownload,
  faDownLong,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Form.css";
import html2canvas from "html2canvas";

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
  const [tradeType, setTradeType] = useState("");
  const [lidPrice, setLidPrice] = useState(0);
  const [coinType, setCoinType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const size = margin * leverage;
    const calculatedRoi = ((markPrice - entryPrice) / entryPrice) * 100;
    const unreleasedPnl = (calculatedRoi * margin) / 100;
    // const calculatedMarginRatio = (margin / size) * 100;
    let calculatedLidPrice = 0;
    if (tradeType === "long") {
      calculatedLidPrice = entryPrice * (1 - 1 / leverage);
    } else if (tradeType === "short") {
      calculatedLidPrice = entryPrice * (1 + 1 / leverage);
    }

    setLidPrice(calculatedLidPrice);
    setEntryPrice(entryPrice);
    setSize(size);
    setUnreleasedPnl(unreleasedPnl);
    setRoi(calculatedRoi);
    // setMarginRatio(calculatedMarginRatio);
    setIsCardVisible(true);
  };

  const handleClose = () => {
    setIsCardVisible(false);
  };

  const downloadCard = () => {
    html2canvas(document.querySelector(".gmt-card")).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "card.png";
      link.click();
    });
  };

  return (
    <div className="container-fuild d-flex flex-column justify-content-center align-items-center">
      <h2 className="heading m-3 my-5">{coinType.toUpperCase()} Dashboard</h2>

      {!isCardVisible && (
        <div className="form-container">
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
              <label>Coin Type</label>
              <input
                type="text"
                value={coinType}
                onChange={(e) => setCoinType(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Margin Ratio</label>
              <input
                type="number"
                step="0.00001"
                value={marginRatio}
                onChange={(e) => setMarginRatio(e.target.value)}
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
            <div className="form-group d-flex justify-content-around">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  name="position"
                  type="radio"
                  id="long"
                  value="long"
                  checked={tradeType === "long"}
                  onChange={(e) => setTradeType(e.target.value)}
                  required
                />
                <div className="form-check-label" htmlFor="long">
                  Long
                </div>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  name="position"
                  type="radio"
                  id="short"
                  value="short"
                  checked={tradeType === "short"}
                  onChange={(e) => setTradeType(e.target.value)}
                  required
                />
                <div className="form-check-label" htmlFor="short">
                  Short
                </div>
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      )}

      {isCardVisible && (
        <>
          <div className="card-container">
            <div className="gmt-card">
              <div className="card-header">
                {tradeType === "short" ? (
                  <div className="logo logo-short">S</div>
                ) : (
                  <div className="logo logo-long">B</div>
                )}
                <div className="card-title">
                  <span className="gmt">{coinType}</span>
                  <span className="gmt-badge">Perp</span>
                  <span className="gmt-badge">Cross {leverage}x</span>
                  <span
                    className={tradeType === "short" ? "gmt red" : "gmt green"}
                  >
                    !!!
                    <span
                      className={
                        tradeType === "short"
                          ? roi >= 100
                            ? "gmt red"
                            : "gmt gray"
                          : roi >= 100
                          ? "gmt green"
                          : "gmt gray"
                      }
                    >
                      !
                    </span>
                  </span>
                  <span className="gmt gray right-icon ">
                    <FontAwesomeIcon icon={faShareNodes} />
                  </span>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="dotted label">Unrealized PNL (USDT)</div>
                    <div
                      className={
                        unreleasedPnl > 0.0
                          ? "green numbers fs-5 font-weight-bold"
                          : "red numbers fs-5 font-weight-bold"
                      }
                    >
                      {unreleasedPnl.toFixed(2)}
                    </div>
                    <div className="dotted label">Size (USDT)</div>
                    <div className="numbers">{size.toFixed(5)}</div>
                    <div className="dotted label">Entry Price (USDT)</div>
                    <div className="numbers">{entryPrice}</div>
                  </div>
                  <div className="col">
                    <div className="spacer"></div>
                    <div className="spacer"></div>
                    <div className="label">Margin (USDT)</div>
                    <div className="numbers">{margin}</div>
                    <div className="label">Mark Price (USDT)</div>
                    <div className="numbers">{markPrice}</div>
                  </div>
                  <div className="col text-end">
                    <div className="dotted label">ROI</div>
                    <div
                      className={
                        roi > 0.0
                          ? "green numbers fs-5 font-weight-bold"
                          : "red numbers fs-5 font-weight-bold"
                      }
                    >
                      {roi.toFixed(2)}%
                    </div>
                    <div className="dotted label">Margin Ratio</div>
                    <div
                      className={
                        marginRatio < 0.0 ? "red numbers" : "green numbers"
                      }
                    >
                      {marginRatio}%
                    </div>
                    <div className="label">Liq. Price (USDT)</div>
                    <div className="numbers">{lidPrice.toFixed(5)}</div>
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
          </div>
          <button className="btn btn-success my-2" onClick={downloadCard}>
            <FontAwesomeIcon icon={faDownload} className="px-1" />
            Card
          </button>
        </>
      )}
    </div>
  );
};

export default Form;
