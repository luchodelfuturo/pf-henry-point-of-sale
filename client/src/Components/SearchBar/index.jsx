import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/productsActions';
function SearchBar() {
    const[product, setProduct] = useState("");
    const dispatch = useDispatch()

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        dispatch(getProducts(product))
        setProduct("")
    }
    const handleOnChange = (e) => {
        setProduct(e.target.value)
    }
    return (
        <form onSubmit={handleOnSubmit}>
            <input 
                type ="text"
                placeholder='Search Product...'
                value={product}
                onChange={handleOnChange}/>
                <button>buscar</button>
        </form>
    );
}

export default SearchBar;