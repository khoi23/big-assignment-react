import React, { useEffect, useState } from "react";
import Helmet from "../../components/Helmet/Helmet";

import Spinner from "react-bootstrap/Spinner";
import Product from "../../components/Product/Product";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [listProduct, setListProduct] = useState([]);
    const [isChangedCart, setIsChangedCart] = useState(false);

    // check product trong cart
    const checkExistProduct = (arrayProduct, idProduct) => {
        for (let i = 0; i < arrayProduct.length; i++) {
            if (arrayProduct[i].id === idProduct) {
                return i;
            }
        }
        return -1;
    };

    // add product
    const handleAddProduct = (product) => {
        const listProduct =
            JSON.parse(localStorage.getItem("listProduct")) ?? [];

        const index = checkExistProduct(listProduct, product.id);

        if (index !== -1) {
            const newAmount = listProduct[index].amount + product.amount;
            listProduct[index].amount = newAmount;
        } else {
            listProduct.push(product);
        }

        localStorage.setItem("listProduct", JSON.stringify(listProduct));

        setIsChangedCart(!isChangedCart);
    };

    //goi api product
    useEffect(() => {
        const fetchData = () => {
            fetch("https://625a91bf0ab4013f94a2d9a8.mockapi.io/meals")
                .then((response) => response.json())
                .then((data) => {
                    setListProduct(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchData();
    }, []);

    return (
        <Helmet title={"Trang Chu"}>
            <section className="common__section"></section>
            <section className="notice">
                <div className="notice-container">
                    <h3>Delicious Food, Delivered To You</h3>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Aliquam numquam at quam quis obcaecati quo vitae
                        accusamus facere voluptatibus exercitationem ipsum,{" "}
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                    </p>
                </div>
            </section>
            <section className="product">
                <div className="product-container">
                    {isLoading ? (
                        <div className="spinner-loading">
                            <Spinner
                                as="span"
                                animation="border"
                                size="lg"
                                role="status"
                                aria-hidden="true"
                            />
                            <span>Loading...</span>
                        </div>
                    ) : (
                        <div className="product__list">
                            {listProduct.map(
                                (
                                    { id, image, price, name, description },
                                    index
                                ) => (
                                    <Product
                                        key={index}
                                        id={id}
                                        image={image}
                                        price={price}
                                        name={name}
                                        description={description}
                                        handleAddProduct={handleAddProduct}
                                    />
                                )
                            )}
                        </div>
                    )}
                </div>
            </section>
        </Helmet>
    );
};

export default Home;
