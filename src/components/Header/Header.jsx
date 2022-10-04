import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Cart from "../../pages/Cart/Cart";

const Header = () => {
    const [modalShow, setModalShow] = useState(false);
    const [totalProduct, setTotalProduct] = useState(0);

    useEffect(() => {
        setInterval(() => {
            const listProduct =
                JSON.parse(localStorage.getItem("listProduct")) ?? [];
            const total = listProduct.length;
            setTotalProduct(total);
        }, 1);
    }, [modalShow]);

    const handleToggleCart = () => setModalShow(!modalShow);
    return (
        <>
            <Navbar className="navbar__brand">
                <div className="container">
                    <NavLink to="/" className="navbar__brand-logo">
                        Food <span>Order</span>
                    </NavLink>
                    <Nav className="navbar__brand-menu">
                        <NavLink to="/" className="navbar__brand-menu-link">
                            Home
                        </NavLink>
                        <NavLink className="navbar__brand-menu-link">
                            Cart
                        </NavLink>
                    </Nav>
                    <Nav className="navbar__brand-icon">
                        <button onClick={handleToggleCart}>
                            <i className="ri-shopping-cart-2-line"></i>
                            <span>{totalProduct}</span>
                        </button>
                        <button>
                            <i className="ri-user-line"></i>
                        </button>
                    </Nav>
                </div>
            </Navbar>
            <Cart modalShow={modalShow} handleToggleCart={handleToggleCart} />
        </>
    );
};

export default Header;
