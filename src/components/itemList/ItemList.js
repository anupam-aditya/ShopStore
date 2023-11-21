import React from "react";
import Item from "../item/Item";
import "./ItemList.css";
import { Link } from "react-router-dom";
import { Grid, List } from "react-virtualized";

function ItemList({ items }) {
	// console.log(items);
	return (
		<div className="item-list">
			{items.length > 0 ? (
				<Grid
					autoWidth
					cellRenderer={({ columnIndex, key, rowIndex, style }) => {
						const item = items[4 * rowIndex + columnIndex];
						return (
							<Link to={`/item/${item?.id}`} key={item?.id} style={style}>
								<Item
									name={item?.name}
									rating={item?.rating}
									price={item?.price}
									saleDiscount={item?.saleDiscount}
									image={item?.image}
									brand={item?.brand}
								/>
							</Link>
						);
					}}
					columnCount={4}
					columnWidth={330}
					height={13 * 440}
					rowCount={Math.ceil(items.length / 4.0)}
					rowHeight={440}
					width={1440}
				/>
			) : (
				<></>
			)}
		</div>
	);
}

export default ItemList;
