import ItemList from "../itemList/ItemList";
import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

function HomePage() {
	const { filter } = useContext(GlobalContext);
	const [page, setPage] = useState(1);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);
	// console.log(filter);
	const loadMoreData = async () => {
		if (loading) return;

		setLoading(true);

		try {
			const response = await fetch(
				`http://localhost:5001/api/v1/getProducts/${page}`
			);

			const data = await response.json();
			setItems((prevItems) => [...prevItems, ...data]);
			setPage((prevPage) => prevPage + 1);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleScroll = () => {
		const scrollHeight = document.documentElement.scrollHeight;
		const scrollTop = document.documentElement.scrollTop;
		const clientHeight = document.documentElement.clientHeight;
		// console.log(scrollHeight, scrollTop, clientHeight);
		if (scrollTop + clientHeight + 20 >= scrollHeight) {
			loadMoreData();
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]); // Dependency array to ensure handleScroll is stable

	useEffect(() => {
		(async () => {
			try {
				const data = await loadMoreData();
			} catch (error) {
				console.error("Error fetching initial data:", error);
			}
		})();
	}, []); // Run once on mount

	return (
		<section>
			<ItemList
				results={
					filter === "All"
						? items
						: items.filter((item) => item.tag.includes(filter))
				}
			/>
			{loading && <p>Loading...</p>}
		</section>
	);
}

export default HomePage;
