import React from "react";
import styled from "styled-components";

const Card = ({ name, cat, image }) => {
  return (
    <>
      <CardWrapper>
        <div className="img">
          <img className="image" src={image} alt="img" width="168px" />
        </div>
        <div className="name">
          <p>{name}</p>
        </div>
        <div className="cat">
          <p>{cat}</p>
        </div>
      </CardWrapper>
    </>
  );
};

export default Card;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 25px;
  margin: 10px;
  width: 168px;
  height: 192px;
  overflow: hidden;

  position: relative;
  .name {
    //font-family: 'Lato';
    /* display: flex;
    align-items: center; */
    color: black;
    //justify-content: space-around;
    /* font-size: 20px;
    text-align: center;
    //font-smooth: 2em;
    text-decoration: none; */
    //position: relative;
    /* min-height: 100px;
    padding-left: 5px;
    padding-right: 5px; */
    /* width: 200px;
    height: 100px;
    position: static; */
    font-size: 20px;
    font-weight: 600;
  }
  .img {
    /* left: -25%;
    display: block; */
    //width: 200px;
    //display: flex;
    //display: flex;
    //justify-content: center;
    //position: relative;
    height: 98px;
    .image {
      height: 95px;
    }
    //left: -25%;

    /* margin: auto; */
    /* min-height: 100%;
    min-width: 100%; */
  }
`;
