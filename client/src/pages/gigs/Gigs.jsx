import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

//we use uselocation to retrieve the information in the url: ex: pathname:"/gigs" search: "?cat=design"  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('cat');

//isLoading: boolean flag that indicates whether the request is being processed
//data: the object that contains the data returned by the query.
//refetch: function which allows you to manually trigger a new execution of the query
  const { isLoading, error, data, refetch } = useQuery({ //useQuery: make queries to a server
    queryKey: ['gigs'], //'gigs': query key to identify the query and store it in the React Query cache.
    queryFn: () => 
      newRequest.get(`/gigs${location.search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then(res=>{
        return res.data;
      }),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };
  
//on the page /gigs?cat=design for example, on the right: Sort by: Newest/Best Selling  
useEffect(() => {
    refetch();
  }, [sort]);


  const apply = ()=>{
    //refetch(): function given by useQuery
    refetch();
  }

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Search for:</span>
        
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading 
          ? "loading" 
          : error 
          ? "Something went wrong." 
          : data.map((gig) => <GigCard key={gig._id} item={gig} /> )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
