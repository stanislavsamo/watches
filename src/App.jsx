import { useState, useEffect } from "react";
import "./App.css";
import Clock from "./components/Clock";
import moment from "moment-timezone";
//import dataForm from "./../data.json";
function App() {
  const [dataList, setList] = useState([]);
  const [data, setData] = useState({
    date: new Date().toLocaleDateString(),
    traveled: 0,
  });
  console.log(data);

  const onSubmit = (event) => {
    event.preventDefault();

    const { target } = event;
    const formData = new FormData(target);

    const data2 = Object.fromEntries(formData);
    if (dataList.find((dat) => dat.date == data2.date)) {
      setList((dataList) =>
        dataList.filter((dat, i, arr) => {
          if (dat.date == data2.date) dat.traveled = Number(data2.traveled);
          return arr;
        })
      );
    } else
      setList((dataList) =>
        [...dataList, data2].sort((a, b) => {
          return (
            new Date(a.date.slice(0, 10).split(".").reverse().join("-")) -
            new Date(b.date.slice(0, 10).split(".").reverse().join("-"))
          );
        })
      );
    console.log(data2, dataList);
  };
  const onChange = (event) => {
    const { target } = event;
    console.log(target);
    const { value } = target;
    setData(value);
    console.log("value:", value);
  };
  const handleClick = (x) => {
    setList((dataList) =>
      [...dataList].filter((obj) => {
        return obj.date !== x;
      })
    );
    console.log(dataList, x);
  };

  //******************************************** */

  const clock = moment().format("LTS").toString(); //new Date().toLocaleTimeString();
  console.log(clock);
  // eslint-disable-next-line no-unused-vars
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="wrapper">
      <Clock clock={clock} />
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="column">
            <label htmlFor="date">Название</label>
            <input
              type="text"
              name="date"
              value={data.date}
              onChange={onChange}
            />
          </div>
          <div className="column">
            <label htmlFor="traveled">Временная зоча (ч)</label>
            <input
              type="text"
              name="traveled"
              value={data.traveled}
              onChange={onChange}
            />
          </div>
          <div className="column">
            <button type="submit">OK</button>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="answer">
          <ul>
            {[...dataList].map((record, i) => (
              <li key={i}>
                <span>{record.date}</span>
                <Clock clock={clock} hours={record.traveled} />{" "}
                <span>{record.traveled} часа </span>{" "}
                <button
                  className="delete"
                  onClick={() => handleClick(record.date)}
                >
                  удалить
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
