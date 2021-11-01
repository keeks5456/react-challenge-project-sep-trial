import React from "react";
import { render, screen } from "@testing-library/react";

import OrdersList from "./ordersList";



describe("Orders List", () => {
  test("renders with no prop", () => {
    render(<OrdersList />);
    const emptyDiv = document.getElementsByClassName("empty-orders");
    const arr = Array.from(emptyDiv);
    expect(arr.length).toBe(1);
  });

  test("renders one order", () => {
    const orders = [
      {
        order_item: "Food",
        quantity: "777",
        _id: 1,
      },
    ];
    render(<OrdersList orders={orders} />);
    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText(/^.*777.*$/gm)).toBeInTheDocument();
  });

  test("renders multiple orders", () => {
    const orders = [
      {
        order_item: "Food",
        quantity: "777",
        _id: 1,
      },
      {
        order_item: "Drink",
        quantity: "888",
        _id: 2,
      },
    ];
    render(<OrdersList orders={orders} />);
    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText(/^.*777.*$/gm)).toBeInTheDocument();
    expect(screen.getByText("Drink")).toBeInTheDocument();
    expect(screen.getByText(/^.*888.*$/gm)).toBeInTheDocument();
  });



  test("render order of time of HH:MM:SS format", () => {
    const orders = [
      {
        order_item: "Food",
        quantity: "777",
        _id: 1,
        createdAt: 'Tue Oct 19 2021 12:01:47 GMT-0700 '
      },
    ];
    render(<OrdersList orders={orders} />)
    expect(screen.getByText(/^.*12:01:47.*$/gm)).toBeInTheDocument();
  
  });
});
