import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Cart = ({ modalShow, handleToggleCart }) => {
    const [showForm, setShowForm] = useState(false);
    const [ref, setRef] = useState(false);
    const [orderBtn, setOrderBtn] = useState("Order");

    const [listProduct, setListProduct] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [infoForm, setInfoForm] = useState({
        name,
        phoneNumber,
        postalCode,
        city,
    });
    const [infoFormUser, setInfoFormUser] = useState([]);

    const [isChangedCart, setIsChangedCart] = useState(false);

    useEffect(
        () => {
            setListProduct(
                JSON.parse(localStorage.getItem("listProduct")) ?? []
            );
        },
        [modalShow],
        [ref]
    );
    useEffect(() => {
        const totalAmout = listProduct
            .map((product) => product.amount * product.price)
            .reduce((preValue, currentValue) => preValue + currentValue, 0);
        setTotalPrice(parseInt(totalAmout));
    });

    useEffect(() => {
        setOrderBtn("Order");
        setShowForm(false);
    }, [handleToggleCart]);

    const decrementProduct = (index) => {
        const productIndex = listProduct.find((e, vt) => vt === index);
        if (productIndex.amount === 1) {
            const productDelete = listProduct.filter((e, idx) => idx !== index);
            console.log(productDelete);
            setListProduct(productDelete);
            localStorage.setItem("listProduct", JSON.stringify(productDelete));
        } else {
            let productAddAmount = {
                ...productIndex,
                amount: productIndex.amount--,
            };
            localStorage.setItem("listProduct", JSON.stringify(listProduct));
        }

        setRef(!ref);
    };
    const incrementProduct = (index) => {
        const productIndex = listProduct.find((e, vt) => vt === index);

        let productAddAmount = {
            ...productIndex,
            amount: productIndex.amount++,
        };
        localStorage.setItem("listProduct", JSON.stringify(listProduct));
        setRef(!ref);
    };

    const deleteProduct = (index) => {
        const productDelete = listProduct.filter((e, idx) => idx !== index);
        setListProduct(productDelete);
        localStorage.setItem("listProduct", JSON.stringify(productDelete));
    };

    const handleSubmitOrder = (e) => {
        if (listProduct.length === 0) {
            alert("them san pham");
            return;
        } else {
            setOrderBtn("Confirm");
            setShowForm(true);

            if (orderBtn === "Order") {
                return;
            } else if (
                name === "" ||
                phoneNumber === "" ||
                postalCode === "" ||
                city === ""
            ) {
                alert("nhap form");
            } else {
                const infoFormUser =
                    JSON.parse(localStorage.getItem("infoFormUser")) ?? [];
                setInfoForm({
                    name: name,
                    phoneNumber: phoneNumber,
                    postalCode: postalCode,
                    city: city,
                });
                infoFormUser.push(infoForm);

                localStorage.setItem(
                    "infoFormUser",
                    JSON.stringify(infoFormUser)
                );
                setIsChangedCart(!isChangedCart);
            }
        }
    };
    return (
        <>
            <Button variant="primary" onClick={handleToggleCart}>
                Launch demo modal
            </Button>

            <Modal show={modalShow} onHide={handleToggleCart} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title-cart">
                        Order Now
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-product__list">
                        {listProduct.map(
                            ({ id, image, price, name, amount }, index) => (
                                <div
                                    className="modal-product__list-item"
                                    key={index}>
                                    <div className="modal-product-info">
                                        <h4>{name}</h4>
                                        <div className="modal-product-info-value">
                                            <p>${price}</p>
                                            <span>x{amount}</span>
                                        </div>
                                    </div>
                                    <div className="modal-product-price">
                                        <button
                                            className="btn-outline"
                                            onClick={() =>
                                                decrementProduct(index)
                                            }>
                                            <i className="ri-subtract-fill"></i>
                                        </button>
                                        <button
                                            className="btn-outline"
                                            onClick={() =>
                                                incrementProduct(index)
                                            }>
                                            <i className="ri-add-line"></i>
                                        </button>
                                        <button
                                            className="btn-outline"
                                            onClick={() =>
                                                deleteProduct(index)
                                            }>
                                            <i className="ri-delete-bin-line"></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <div className="modal-product__Total">
                        <h3>Total Amount</h3>
                        <h4>${totalPrice}</h4>
                    </div>

                    {showForm === true && (
                        <form className="modal-input">
                            <div className="modal-input__group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="modal-input__group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                />
                            </div>
                            <div className="modal-input__group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    value={postalCode}
                                    onChange={(e) =>
                                        setPostalCode(e.target.value)
                                    }
                                />
                            </div>
                            <div className="modal-input__group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                        </form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn-outline" onClick={handleToggleCart}>
                        Close
                    </button>
                    <button className="btn" onClick={handleSubmitOrder}>
                        {orderBtn}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Cart;
