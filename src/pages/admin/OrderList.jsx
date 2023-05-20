import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderApi from "../../api/orderApi";
import { Button } from "@mui/material";
import moment from "moment";

const generateOrders = (numOfOrders) => {
  let orders = [];

  for (let i = 0; i < numOfOrders; i++) {
    let order = {};
    order.orderId = i + 1;
    order.userName = "Quy Hoa";
    order.orderDate = "28/01/2003";
    order.status = "Pending";
    orders.push(order);
  }

  return orders;
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const res = await orderApi.getOrders();
      console.log(res);
      setOrders(res);
    };
    getOrders();
  }, []);
  const navigate = useNavigate();
  const handleView = (order) => {
    navigate(`/admin/orders/${order._id}`, {
      state: {
        orderId: order._id,
        name: order.orderedBy.name,
      },
    });
  };
  const handleDelete = async (orderId) => {
    setOrders(orders.filter((order) => order._id !== orderId));
    await orderApi.deleteOrder(orderId);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Order Id</th>
          <th>User Name</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order) => (
          <tr key={order?._id}>
            <td>{order?._id}</td>
            <td>{order?.orderedBy?.name}</td>
            <td>{moment(order?.orderDate).format("DD/MM/YYYY, h:mm a")}</td>

            <td>{order?.status}</td>

            <td>
              <Button
                variant="contained"
                color="info"
                onClick={() => handleView(order)}
              >
                View
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(order._id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;
