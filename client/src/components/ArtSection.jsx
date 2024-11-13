import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ARTS } from "../utils/queries";

import Carousel from "./Carousel";

function MoreSection({ thing }) {
  // title, description, date, image
  return thing ? (
    <>
      <section>
        <h1>TEST section for more info</h1>
        <h1>{thing.title}</h1>
      </section>
    </>
  ) : (
    <>
      <h1>NOTHING SELECTED</h1>
    </>
  );
}

function ArtSection() {
  const { loading, data } = useQuery(GET_ARTS);
  const artThings = data ? data.artThings : [];

  const CardComponent = Card;
  const [selectedProject, setSelectedProject] = useState();

  // const [cardContainerWidth, setCardContainerWidth] = useState(windowWidth/cardsPerSlide);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function setCardNum() {
    if (windowWidth >= 1200) {
      setCardsPerSlide("4");
    } else if (1200 > windowWidth && windowWidth > 800) {
      setCardsPerSlide("3");
    } else {
      setCardsPerSlide("2");
    }
    setCardContainerWidth((windowWidth - 30) / cardsPerSlide);
  }

  const [cardsPerSlide, setCardsPerSlide] = useState("2");

  const [cardContainerWidth, setCardContainerWidth] = useState((window.innerWidth - 30) / cardsPerSlide);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); 
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // LOOK INTO USEREDUCER, IDK what it is but it might be what I want
  useEffect(() => {
    setCardNum()
  }, [windowWidth]);

  function Card({ thing }) {
    function handleClick() {
      setSelectedProject(thing);
    }

    return (
      <>
        <div className="card" onClick={handleClick}>
          <figure>
            <img src={thing.image} className="crop-img"></img>
          </figure>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="flex-col flex-center-all carousel-section">
        <h2>Art Things</h2>
        <div className="spacer"></div>
        {loading ? (
          <h1>loading...</h1>
        ) : (
          <Carousel
            items={artThings}
            // cardContainerWidth={cardContainerWidth}
            cardsPerSlide={cardsPerSlide}
            cardContainerWidth={cardContainerWidth}
            CardComponent={CardComponent}
          ></Carousel>
        )}
      </section>
      <h1> window width: {windowWidth} </h1>
      <MoreSection thing={selectedProject}></MoreSection>
    </>
  );
}

export default ArtSection;
