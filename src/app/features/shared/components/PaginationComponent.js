import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function PaginationComponent({
	totalPages = 1,
	currentPage = 0,
	maxSize = 5,
	onPageChanged,
	style,
}) {
	let pages = [];
	if (currentPage - Math.floor(maxSize / 2) <= 0) {
		pages = Array.from(
			{ length: Math.min(totalPages, maxSize) },
			(v, i) => i
		);
	} else if (currentPage + Math.floor(maxSize / 2) >= totalPages) {
		pages = Array.from(
			{ length: maxSize },
			(v, i) => i + totalPages - maxSize
		);
	} else {
		pages = Array.from(
			{ length: maxSize },
			(v, i) => i + currentPage - Math.floor(maxSize / 2)
		);
	}

	function handleClick(e, i) {
		e.preventDefault();
		console.log(i);
		onPageChanged(i);
	}

	return (
		<Pagination style={style}>
			<PaginationItem disabled={currentPage <= 0}>
				<PaginationLink
					id='firstPageLink'
					first
					onClick={(e) => handleClick(e, -currentPage)}
				/>
			</PaginationItem>
			<PaginationItem disabled={currentPage <= 0}>
				<PaginationLink previous onClick={(e) => handleClick(e, -1)} />
			</PaginationItem>
			{pages.map((i) =>
				i === currentPage ? (
					<PaginationItem key={i.toString()} active>
						<PaginationLink
							onClick={(e) => handleClick(e, i - currentPage)}>
							{i + 1}
						</PaginationLink>
					</PaginationItem>
				) : (
					<PaginationItem key={i.toString()}>
						<PaginationLink
							onClick={(e) => handleClick(e, i - currentPage)}>
							{i + 1}
						</PaginationLink>
					</PaginationItem>
				)
			)}
			<PaginationItem disabled={currentPage >= totalPages - 1}>
				<PaginationLink next onClick={(e) => handleClick(e, 1)} />
			</PaginationItem>
			<PaginationItem disabled={currentPage >= totalPages - 1}>
				<PaginationLink
					last
					onClick={(e) => handleClick(e, totalPages - 1)}
				/>
			</PaginationItem>
		</Pagination>
	);
}
