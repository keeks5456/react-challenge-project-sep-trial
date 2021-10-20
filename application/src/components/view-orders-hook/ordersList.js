import React from "react";

const OrdersList = (props) => {
  const { orders } = props;
  if (!props || !props.orders || !props.orders.length)
    return (
      <div className="empty-orders">
        <h2>There are no orders to display</h2>
      </div>
    );

  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
    return strTime;
  };

  console.log(formatAMPM)

  return orders.map((order) => {
    const createdDate = new Date(order.createdAt);
    console.log(createdDate)
    return (
      <div className="row view-order-container" key={order._id}>
        <div className="col-md-4 view-order-left-col p-3">
          <h2>{order.order_item}</h2>
          <p>Ordered by: {order.ordered_by || ""}</p>
        </div>
        <div className="col-md-4 d-flex view-order-middle-col">
          <p>Order placed at {formatAMPM(createdDate)}</p>
          <p>Quantity: {order.quantity}</p>
        </div>
        <div className="col-md-4 view-order-right-col">
          <button className="btn btn-success">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>
    );
  });
};

export default OrdersList;
