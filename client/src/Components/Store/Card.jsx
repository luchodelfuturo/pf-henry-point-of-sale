import React from "react";
import styled from "styled-components";
import { colors } from "../../theme/variables";
import { Tag } from "../../theme/styled-componets";

const Card = ({ name, cat, image, price, stock }) => {
  return (
    <>
      {stock > 0 ? (
        <CardWrapper className="active">
          <div className="img">
            <img className="image" src={image} alt="img" width="168px" />
          </div>
          <div className="name">
            <p>{name}</p>
          </div>
          <Tag className="cat">{cat}</Tag>
          <div className="price-cont">
            <div className="sign">$</div>
            <div className="price">{price}</div>
          </div>
          {stock < 20 ? <div className="stock">{stock}</div> : null}
        </CardWrapper>
      ) : (
        <CardWrapper>
          <div className="img">
            <img className="image" src={image} alt="img" width="168px" />
          </div>
          <div className="name">
            <p>{name}</p>
          </div>
          <Tag className="cat">{cat}</Tag>
          <div className="price-cont">
            <div className="sign">$</div>
            <div className="price">{price}</div>
          </div>
          {stock < 10 ? <div className="nostock">{stock}</div> : null}
          <div className="inactive"></div>
        </CardWrapper>
      )}
    </>
  );
};

export default Card;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  cursor: pointer;
  box-shadow: 4px 9px 17px -11px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  margin: 10px;
  width: 168px;
  height: 192px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  &:active {
    transition: all 0.1s ease;
    transform: scale(0.95);
    //background: rgba(47, 238, 63, 0.418);
  }

  .inactive {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 25px;
    width: 168px;
    height: 192px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
  }
  .name {
    color: black;
    margin-top: -20px;
    text-align: left;
    font-size: 18px;
    font-weight: 700;
    padding-left: 10px;
    padding-right: 10px;
  }
  .img {
    height: 98px;
    .image {
      height: 95px;
    }
  }
  .cat {
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    //vertical-align: middle;
    position: absolute;
    margin-left: 10px;
    margin-top: 10px;
    padding-left: 7px;
    padding-right: 7px;
    height: 28px;
    background-color: ${colors.lgreen};
    border-radius: 25px;
  }
  .price-cont {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 3px 0px 0px;
    margin-top: 147px;
    margin-left: 10px;
    position: relative;
    background-color: ${colors.lgreen};
    box-shadow: 4px 2px 9px -1px rgba(0, 0, 0, 0.25);
    border-radius: 26px;
    width: 84px;
    height: 28px;
    text-align: center;
    position: absolute;
    .sign {
      font-size: 15px;
      padding-bottom: 6px;
      margin-left: 5px;
    }
    .price {
      font-size: 24px;
      margin-left: 5px;
      padding-bottom: 6px;
    }
  }
  .stock {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 0px 1px 0px;
    margin-top: 150px;
    right: 10px;
    position: relative;
    background-color: ${colors.orange};
    //box-shadow: 4px 2px 9px -1px rgba(0, 0, 0, 0.25);
    border-radius: 26px;
    width: 28px;
    height: 28px;
    text-align: center;
    position: absolute;
    z-index: 3;
  }
  .nostock {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 0px 1px 0px;
    margin-top: 150px;
    right: 10px;
    position: relative;
    background-color: ${colors.red};
    //box-shadow: 4px 2px 9px -1px rgba(0, 0, 0, 0.25);
    border-radius: 26px;
    width: 28px;
    height: 28px;
    text-align: center;
    position: absolute;
    z-index: 3;
  }
`;
