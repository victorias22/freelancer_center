import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'], 
    queryFn: () => 
      newRequest
      .get(
        `/orders`
        )
        .then((res)=>{
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      //Attempt to retrieve existing conversation:check if conversation already exists between seller & buyer
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);

    } catch (err) {
      //if we don't have conversation, create one
      if(err.response.status === 404){
        //"to": determined if the currentUser is seller or buyer. 
        //If current user = seller, conversation is sent to the buyer (buyerId), otherwise sent to the seller (sellerId).
      const res = await newRequest.post(`/conversations/`, {
        to:currentUser.seller ? buyerId : sellerId,
      });
      navigate(`/message/${res.data.id}`);
    }
  }
  };


  return (
    <div className="orders">
      {isLoading ? (
        "Loading" 
        ) : error ? (
          "Something went wrong" 
        ) : (
        <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Contact</th>
          </tr>
          {
            data.map((order) => (
            <tr key={order._id}>
            <td>
              <img
                className="image"
                src={order.img}
                alt=""
              />
            </td>
            <td>{order.title}</td>
            <td>{order.price}</td>
            <td>
              <img className="message" src="./img/message.png" alt="" onClick={()=>handleContact(order)}/>
            </td>
          </tr>))}
          
        </table>
      </div>)}
    </div>
  );
};

export default Orders;
