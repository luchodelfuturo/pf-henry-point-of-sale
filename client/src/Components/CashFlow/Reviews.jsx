import axios from "axios";
import React from "react";
import { useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { addReviews } from "../../redux/actions/cashFlowActions";
function Reviews() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [description, setDescription] = useState("")

  const dispatch = useDispatch()

const handleOnSubmit = (e) =>{
    e.preventDefault()

    let review = {
        rating: rating,
        description: description
    }
    dispatch(addReviews(review))
    // await axios.post("http://localhost:3001/cash/reviews", JSON.stringify(review))
    // .then(()=>console.log(JSON.stringify(review)));
    setRating(0)
    setDescription("")
}
  return (
    <div>
      <h5 style={{textAlign: "center"}}>Add Day's Review</h5>
      <form style ={{marginLeft: "10rem"}}onSubmit={handleOnSubmit}>
        <div style={{marginLeft: "3rem"}}>
          {[...Array(5)].map((e, i) => {
          const ratingValue = i + 1;

          return (
            <label>
              <input
                style={{ display: "none" }}
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <TiStarFullOutline
                style={{ cursor: "pointer", transition: "color 200ms" }}
                size={20}
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
        </div>
        <label style={{ display: "flex" }}>
          <textarea 
          rows="4" cols="25" 
          value={description}
          onChange={(e)=> setDescription(e.target.value)}/>
        </label>
        <label>
          <input style={{width: "61%"}}type="submit" value={"Submit"} />
        </label>
      </form>
    </div>
  );
}

export default Reviews;
