import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import PaginationComponent from "./PaginationComponent";

test("renders app", () => {
    	let currentPage = 0;
		let setCurrentPage = (i) => {
			currentPage = i;
		};
		render(
			<PaginationComponent
				totalPages={10}
				currentPage={currentPage}
				maxSize={5}
				onPageChanged={(i) => {
					setCurrentPage(
						Math.max(
							Math.min(
								currentPage + i,
								pagination.totalPages - 1
							),
							0
						)
					);
				}}
			/>
		);
});
