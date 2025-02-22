import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import Chart from "chart.js/auto";

function HomePage() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Store chart instance to destroy it later

  const [dataSource, setDataSource] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#ffcd56",
          "#ff6384",
          "#36a2eb",
          "#fd6b19",
          "#4bc0c0",
          "#9966ff",
          "#ff9f40",
        ],
      },
    ],
    labels: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await Axios.get("http://localhost:3001/budget");

        const updatedData = {
          datasets: [
            {
              data: res.data.myBudget.map((item) => item.budget),
              backgroundColor: [
                "#ffcd56",
                "#ff6384",
                "#36a2eb",
                "#fd6b19",
                "#4bc0c0",
                "#9966ff",
                "#ff9f40",
              ],
            },
          ],
          labels: res.data.myBudget.map((item) => item.title),
        };

        setDataSource(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new Chart instance and store it in ref
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: dataSource,
      });
    }
  }, [dataSource]);

  return (
    <main className="center" id="main">
      <div className="page-area">
        <article>
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article>
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article>
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article>
          <h1>Free</h1>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </article>

        <article>
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article>
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article>
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article>
          <h1>Chart</h1>
          <p>
            <canvas ref={chartRef} width="400" height="400"></canvas>
          </p>
        </article>
      </div>
    </main>
  );
}

export default HomePage;
