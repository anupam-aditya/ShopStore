import React, { useEffect, useState } from "react";
import ItemList from "../itemList/ItemList";

function HomePage() {
	const [page, setPage] = useState(1);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);

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
		console.log(scrollHeight, scrollTop, clientHeight);
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
			<ItemList items={items} />
			{loading && <p>Loading...</p>}
		</section>
	);
}

export default HomePage;
