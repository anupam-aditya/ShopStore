import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import { GlobalContext } from "../../context/GlobalState";

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { cart, changeFilter } = useContext(GlobalContext);
	const updateHandler = (item) => {
		const filter = item.target.innerHTML;
		changeFilter(filter);
		if (
			location.pathname.includes("/orders") ||
			location.pathname.includes("/cart")
		)
			navigate("/");
	};
	return (
		<div className="navbar">
			<Link to="/">
				<h2>ShopStore</h2>
			</Link>
			<ul className="navbar-ul">
				<li onClick={updateHandler}>Women</li>
				<li onClick={updateHandler}>Men</li>
				<li onClick={updateHandler}>Clothing</li>
				<li onClick={updateHandler}>Shoes</li>
				<Link to="/cart">
					<li>
						&#128722; <span className="card-count">({cart.length})</span>
					</li>
				</Link>
				<Link to="/orders">
					<li>Orders</li>
				</Link>
			</ul>
		</div>
	);
};

export default Navbar;
