import React, { useState, useContext } from "react";
import Item from "../item/Item";
import "./ItemList.css";
import { Link } from "react-router-dom";
import { AutoSizer, List, WindowScroller } from "react-virtualized";
import { GlobalContext } from "../../context/GlobalState";
import useScreenType from "react-screentype-hook";

function ItemList({ results }) {
	const screenClass = useScreenType();
	const { addItemToCartList, cart } = useContext(GlobalContext);

	// console.log(results.length);
	// console.log(items);
	return (
		<>
			{results.length > 0 ? (
				<div style={{ width: "100%", height: "100%" }}>
					<WindowScroller>
						{({ height, isScrolling, registerChild, scrollTop }) => (
							<AutoSizer disableHeight>
								{({ width }) => {
									let itemsPerRow = 4;

									if (screenClass.isMobile) {
										itemsPerRow = 2;
									} else if (screenClass.isTablet) {
										itemsPerRow = 3;
									} else if (
										screenClass.isDesktop ||
										screenClass.isLargeDesktop
									) {
										itemsPerRow = 4;
									}

									//Here we are calculating height and width of logo container in gallery
									const styleHeightWidthValue = width / itemsPerRow;
									const rowCount = Math.ceil(results.length / itemsPerRow);
									return (
										<div ref={registerChild}>
											<List
												tabIndex={-1}
												role="grid"
												autoHeight
												className={"List"}
												width={width}
												height={height}
												rowCount={rowCount}
												isScrolling={isScrolling}
												scrollTop={scrollTop}
												rowHeight={styleHeightWidthValue}
												rowRenderer={({ index, key, style }) => {
													// console.log(index);
													const items = [];
													const fromIndex = index * itemsPerRow;
													const toIndex = fromIndex + itemsPerRow;

													for (let i = fromIndex; i < toIndex; i++) {
														const result = results[i];
														if (results.length && results[i]) {
															items.push(
																<div
																	to={`/item/${result.id}`}
																	role="row"
																	// className={"Item"}
																	key={i}
																	data-key={index}
																	style={{
																		height: styleHeightWidthValue,
																		width: styleHeightWidthValue,
																	}}
																>
																	{result && (
																		<div
																			role="gridcell"
																			tabIndex={-1}
																			style={{
																				// backgroundColor: `${result.signature.backgroundColor.default}`,
																				height: styleHeightWidthValue,
																				width: styleHeightWidthValue,
																			}}
																			className={"logoImgContainer"}
																		>
																			<img
																				tabIndex={0}
																				alt={"image"}
																				src={result.image}
																				className={"logoImage"}
																			/>
																			<div className="item-info">
																				<div className="item-price">
																					₹{result.price}
																				</div>
																				<div className="item-rating">
																					{result.rating}&#9733;
																				</div>
																			</div>
																			<div>
																				<button
																					className="item-btn"
																					// disabled={isAdded}
																					onClick={() => {
																						addItemToCartList(result);
																						// setIsAdded(true);
																					}}
																				>
																					Add To bag
																					{/* {isAdded ? (
																						<Link to="/cart">Go to Cart</Link>
																					) : (
																						"Add To bag"
																					)} */}
																				</button>
																			</div>
																		</div>
																	)}
																</div>
															);
														}
													}
													const styleForRow = {
														...style,
														height: styleHeightWidthValue,
														width: width,
														top: styleHeightWidthValue * index,
													};
													return (
														<div
															className={"Row"}
															key={key}
															style={styleForRow}
														>
															{items}
														</div>
													);
												}}
											/>
											<div className={"galleryLoadMoreLoader"}>
												<span>Loading</span>
											</div>
										</div>
									);
								}}
							</AutoSizer>
						)}
					</WindowScroller>
				</div>
			) : (
				// <Grid
				// 	autoWidth
				// 	cellRenderer={({ columnIndex, key, rowIndex, style }) => {
				// 		const item = items[4 * rowIndex + columnIndex];
				// 		return (
				// 			<Link to={`/item/${item?.id}`} key={item?.id} style={style}>
				// 				<Item
				// 					name={item?.name}
				// 					rating={item?.rating}
				// 					price={item?.price}
				// 					saleDiscount={item?.saleDiscount}
				// 					image={item?.image}
				// 					brand={item?.brand}
				// 				/>
				// 			</Link>
				// 		);
				// 	}}
				// 	columnCount={4}
				// 	columnWidth={330}
				// 	height={13 * 440}
				// 	rowCount={Math.ceil(items.length / 4.0)}
				// 	rowHeight={440}
				// 	width={1440}
				// />
				<></>
			)}
		</>
	);
}

export default ItemList;
