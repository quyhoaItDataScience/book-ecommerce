import React, { useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReceiptIcon from "@mui/icons-material/Receipt";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 16,
        },
      },
    },
    title: {
      display: true,
      text: "Biểu đồ doanh thu",
      font: {
        size: 28,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Doanh thu từng tháng",
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const PaperCustom = styled(Paper)(({ theme }) => ({
  padding: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const statisticsObjects = [
  { name: "Số đơn đặt", icon: <ShoppingBagIcon size="medium" /> },
  { name: "Đơn hàng bán", icon: <ReceiptIcon size="medium" /> },
  { name: "Lượt người xem", icon: <PeopleIcon size="medium" /> },
  { name: "Doanh Thu", icon: <PointOfSaleIcon size="medium" /> },
];

function index() {
  return (
    <Box display="grid" placeItems="center" padding="20px 40px">
      <Box marginBottom="20px">
        <Typography variant="h4">Số liệu bán hàng</Typography>
      </Box>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap="20px">
        {statisticsObjects.map((el) => (
          <PaperCustom>
            <Box display="flex" flexDirection="column" gap="8px">
              {el.icon}
              <Typography variant="h6">{el.name}</Typography>
            </Box>
            <Box>
              <Typography variant="h4">10</Typography>
            </Box>
          </PaperCustom>
        ))}
      </Box>
      {/* Revenue graph */}
      <Box width="100%" margin="20px 0" id="chart-container">
        <Line options={options} data={data} />
      </Box>
    </Box>
  );
}

export default index;
