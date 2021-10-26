import React from "react";
import { SERVER_IP } from "../../private";

const OrdersList = (props) => {
  console.log(props)

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

  const deleteOrder = (id) => {
    console.log(id);
    fetch(`${SERVER_IP}/api/delete-order/`, {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log("success", JSON.stringify(response)))
      .catch((error) => console.error(error));
  };

  const editOrder = (id) =>{
    
    console.log('clicks')
    // fetch(`${SERVER_IP}/api/edit-order/`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     id: id,
    // ordered_by: ordered_by,
    // quantity: quantity,
    // menu_item: menu_item
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((response) => console.log("success", JSON.stringify(response)))
    //   .catch((error) => console.error(error));
  }

  return orders.map((order) => {
    // console.log(order)
    const createdDate = new Date(order.createdAt);
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
          <button onClick={() => editOrder(order.id)} className="btn btn-success">
            Edit
          </button>
          <button
            onClick={() => deleteOrder(order._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
};

export default OrdersList;
