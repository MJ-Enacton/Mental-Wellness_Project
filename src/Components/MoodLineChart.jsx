import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
);

const moodScale = {
  "😁": 5,
  "😊": 4,
  "😐": 3,
  "😕": 2,
  "😢": 1,
};

export const MoodLineChart = () => {
  const moods = useSelector((state) => state.Mood);
  const selectedDate = useSelector((state) => state.selectedDate);

  // filter ONLY today's moods
  const filtered = moods
    .filter((m) => {
      // console.log(m);

      return m.addedAt?.split("T")[0] === selectedDate;
    })
    .sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));

  const data = {
    labels: filtered.map((m) => {
      const date = new Date(m.addedAt);

      return date.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }),
    datasets: [
      {
        label: "Mood Trend",
        data: filtered.map((m) => moodScale[m.emoji] || 0),
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.2)",
        tension: 0.4,
        pointRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Mood Intensity",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};
