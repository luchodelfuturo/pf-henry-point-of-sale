import React from "react";
import styled from "styled-components";

const Card = ({name, cat}) => {
  return (
    <>
      <CardWrapper>
        <div className="name">
          <p>{name}</p>
        </div>
        {/* <div className="cat">
          <p>{cat}</p>
        </div> */}

        {/* <div className="img">
          <img className="image" src={image} alt="img" />
        </div> */}
        
      </CardWrapper>
    </>
  );
};

export default Card;

const CardWrapper = styled.div`
  display: flex;
  background-color: white ;
  border-radius: 25px;
  margin: 10px;
  width: 168px;
  height: 192px;
  overflow: hidden;
  
  position: relative;
  .name {
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
  }
`;
