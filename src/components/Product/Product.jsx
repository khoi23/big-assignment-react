import React, { useState } from "react";

const Product = ({ id, name, description, price, image, handleAddProduct }) => {
    const [amount, setAmount] = useState(1);

    const handleGetProduct = () => {
        const product = {
            id,
            name,
            description,
            image,
            price,
            amount,
        };

        handleAddProduct(product);
    };
    return (
        <div className="product__list-item" key={id}>
            <div className="product-img">
                <img src={image} alt="product" />
            </div>
            <div className="product-info">
                <h4>{name}</h4>
                <p>{description}</p>
                <span>${price}</span>
            </div>
            <div className="product-price">
                <div className="product-price-amount">
                    <span>Amount: </span>
                    <input
                        type={"number"}
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                    />
                </div>
                <div className="product-price-add">
                    <button className="btn" onClick={handleGetProduct}>
                        +Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
