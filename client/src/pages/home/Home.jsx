import React from 'react'
import "./Home.scss"
import Slide from '../../components/slide/Slide'
import CatCard from '../../components/catCard/CatCard'
import {cards, projects} from "../../data"
import Featured from '../../components/featured/Featured'
import TrustedBy from '../../components/trustedBy/TrustedBy'
import ProjectCard from '../../components/projectCard/ProjectCard.jsx'
const Home = () => {
  return (
    <div className="home">
      <Featured/>
      <TrustedBy/>
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map(card=>(
          <CatCard key={card.id} item={card}/>
        ))}
      </Slide>
      <div className="featured">
        <div className="container" >
        <div className="item" >
            <h1><pre>                   A whole world of freelance talent at your fingertips</pre></h1>
            <div className="title">
              <pre>           The best for every budget</pre>
              
            </div>
            <p>
              <pre>           Find high-quality services at every price point. No hourly rates, just project-based pricing.</pre>
            </p>
            <div className="title">
              <pre>           Quality work done quickly</pre>
              
            </div>
            <p>
              <pre>           Find the right freelancer to begin working on your project within minutes.</pre>
            </p>
            <div className="title">
              <pre>           Protected payments, every time</pre>
              
            </div>
            <p>
              <pre>           Always know what you'll pay upfront. Your payment isn't released until you approve the work.</pre> 
            </p>
            <div className="title">
              <pre>           24/7 support</pre>
             
            </div>
            <p>
              <pre>           Find high-quality services at every price point. No hourly rates, just project-based pricing.</pre>
            </p>
          </div>
          
        </div>
      
      
        
      </div>
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map(card=>(
          <ProjectCard key={card.id} card={card}/>
        ))}
      </Slide>
    </div>
  )
}

export default Home