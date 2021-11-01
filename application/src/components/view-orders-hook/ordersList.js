import React from "react";
import { SERVER_IP } from "../../private";
import { useState } from "react";
import { useSelector } from "react-redux";

const OrdersList = (props) => {

  //edit state
  const [edit, setEdit] = useState(false)
  const [orderItem, setOrderItem] = useState("");
  const [quantity, setQuantity] = useState("1");

  const menuItemChosen = (event) => setOrderItem(event.target.value);
  const menuQuantityChosen = (event) => setQuantity(event.target.value);
  const auth = useSelector((state) => state.auth);
  const { orders } = props;


  // if (!props || !props.orders || !props.orders.length)
  //   return (
  //     <div className="empty-orders">
  //       <h2>There are no orders to display</h2>
  //     </div>
  //   );

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
      props.setRenderPage(true)
  };

  const editOrder = (id) => {
    console.log("clicks");
    fetch(`${SERVER_IP}/api/edit-order/`, {
      method: "POST",
      body: JSON.stringify({
        id: id,
    ordered_by: auth.email || "Unknown",
    quantity: quantity,
    menu_item: orderItem
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log("success", JSON.stringify(response)))
      .catch((error) => console.error(error));
      setEdit(false)
      props.setRenderPage(true)
  };

  const editOrderForm = (id) =>{
    if(edit){
      return (
        <form>
        <label className="form-label">I'd like to order...</label>
        <br />
        <select
          value={orderItem}
          onChange={(event) => menuItemChosen(event)}
          className="menu-select"
        >
          <option value="" defaultValue disabled hidden>
            Lunch menu
          </option>
          <option value="Soup of the Day">Soup of the Day</option>
          <option value="Linguini With White Wine Sauce">
            Linguini With White Wine Sauce
          </option>
          <option value="Eggplant and Mushroom Panini">
            Eggplant and Mushroom Panini
          </option>
          <option value="Chili Con Carne">Chili Con Carne</option>
        </select>
        <br />
        <label className="qty-label">Qty:</label>
        <select
          value={quantity}
          onChange={(event) => menuQuantityChosen(event)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <button
          type="button"
          className="order-btn"
          onClick={() => editOrder(id)}
        >
          Update Order!
        </button>
      </form>
      )
    } else return;
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
          <button onClick={() =>  setEdit(true)} className="btn btn-success">
            Edit
          </button>
          <button
            onClick={() => deleteOrder(order._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
        {editOrderForm(order._id)}
      </div>
    );
  });
};

export default OrdersList;
