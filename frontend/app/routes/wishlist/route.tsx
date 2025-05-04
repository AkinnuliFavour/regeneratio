import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Heart, X, ChevronRight, Star } from "lucide-react";
import Navigation from "~/components/header/Navigation";
import { Footer } from "~/components/footer/Footer";

// Define types for our wishlist data
type WishlistItem = {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	category: string;
	isOnSale: boolean;
	isInStock: boolean;
	isNew?: boolean;
	rating?: number;
	reviewCount?: number;
};

// Loader function to fetch data
export const loader = async () => {
	// In a real app, you would fetch this data from your API or database
	const wishlistItems: WishlistItem[] = [
		{
			id: "1",
			name: "Sport duffel bag",
			price: 70.0,
			originalPrice: 93.0,
			image: "/images/duffel-bag.jpg",
			category: "Bags",
			isOnSale: true,
			isInStock: true,
		},
		{
			id: "2",
			name: "Wall Game Claw Crawler",
			price: 50.0,
			image: "/images/wall-crawler.jpg",
			category: "Games",
			isOnSale: false,
			isInStock: true,
		},
		{
			id: "3",
			name: "US5 Ultimate USB Gamepad",
			price: 59.99,
			image: "/images/gamepad-black.jpg",
			category: "Gaming",
			isOnSale: false,
			isInStock: true,
		},
		{
			id: "4",
			name: "Quilted jacket",
			price: 90.0,
			image: "/images/jacket.jpg",
			category: "Clothing",
			isOnSale: false,
			isInStock: true,
		},
		{
			id: "5",
			name: "15.6 inch gaming laptop",
			price: 699.0,
			originalPrice: 899.0,
			image: "/images/laptop.jpg",
			category: "Computers",
			isOnSale: true,
			isInStock: true,
			rating: 4.5,
			reviewCount: 124,
		},
		{
			id: "6",
			name: "HD LED Gaming Monitor",
			price: 399.0,
			image: "/images/monitor.jpg",
			category: "Electronics",
			isOnSale: false,
			isInStock: true,
			rating: 5.0,
			reviewCount: 5,
		},
		{
			id: "7",
			name: "US5 Ultimate USB Gamepad",
			price: 59.99,
			image: "/images/gamepad-red.jpg",
			category: "Gaming",
			isOnSale: false,
			isInStock: true,
			isNew: true,
			rating: 4.5,
			reviewCount: 345,
		},
		{
			id: "8",
			name: "Mechanical gaming keyboard",
			price: 69.99,
			image: "/images/keyboard.jpg",
			category: "Gaming",
			isOnSale: false,
			isInStock: true,
			rating: 4.5,
			reviewCount: 542,
		},
	];

	return json({
		wishlistItems,
		totalItems: wishlistItems.length,
	});
};

export default function Wishlist() {
	const { wishlistItems, totalItems } = useLoaderData<typeof loader>();

	return (
		<div className="min-h-screen bg-white">
			{/* Main Content */}
			<main className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-xl font-medium">Wishlist ({totalItems})</h1>
					<div className="flex items-center gap-2">
						<Button variant="outline" className="text-sm px-4 py-1 h-auto">
							Share my Wishlist
						</Button>
					</div>
				</div>

				{/* Banner - "Ends For You" */}
				<div className="mb-8 flex justify-between items-center">
					<div className="flex items-center">
						<div className="bg-blue-600 h-6 w-2 mr-2"></div>
						<h2 className="text-sm font-medium">Ends For You</h2>
					</div>
					<Button
						variant="ghost"
						size="sm"
						className="text-xs flex items-center gap-1 h-auto"
					>
						See All
						<ChevronRight className="h-3 w-3" />
					</Button>
				</div>

				{/* Wishlist Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
					{wishlistItems.map((item) => (
						<WishlistItemCard key={item.id} item={item} />
					))}
				</div>
			</main>
		</div>
	);
}

// Wishlist Item Card Component
function WishlistItemCard({ item }: { item: WishlistItem }) {
	const [isHovered, setIsHovered] = useState(false);

	// Function to render star ratings
	const renderStars = (rating: number) => {
		const stars = [];
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 >= 0.5;

		for (let i = 0; i < 5; i++) {
			if (i < fullStars) {
				stars.push(
					<Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
				);
			} else if (i === fullStars && hasHalfStar) {
				stars.push(
					<Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
				);
			} else {
				stars.push(<Star key={i} className="h-3 w-3 text-gray-300" />);
			}
		}
		return stars;
	};

	return (
		<Card
			className="relative border-0 shadow-none"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="relative">
				{/* Sale Badge */}
				{item.isOnSale && (
					<div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-0.5 z-10">
						SALE
					</div>
				)}

				{/* New Badge */}
				{item.isNew && (
					<div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-0.5 z-10">
						NEW
					</div>
				)}

				{/* Remove Button */}
				<button className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md z-10">
					<X className="h-4 w-4 text-gray-500" />
				</button>

				{/* Image Container */}
				<div className="bg-gray-100 h-48 flex items-center justify-center mb-3">
					<img
						src={
							item.image.startsWith("/")
								? `/api/placeholder/300/300`
								: item.image
						}
						alt={item.name}
						className="max-h-44 object-contain mx-auto"
					/>
				</div>
			</div>

			<CardContent className="p-0">
				{/* Product Info */}
				<div className="mb-1 text-xs text-gray-500">{item.category}</div>
				<h3 className="font-medium text-sm mb-1 line-clamp-2">{item.name}</h3>

				<div className="flex items-center space-x-2 mb-2">
					<span className="font-medium">${item.price.toFixed(2)}</span>
					{item.originalPrice && (
						<span className="text-xs text-gray-500 line-through">
							${item.originalPrice.toFixed(2)}
						</span>
					)}
				</div>

				{/* Ratings */}
				{item.rating && (
					<div className="flex items-center gap-1">
						<div className="flex">{renderStars(item.rating)}</div>
						<span className="text-xs text-gray-500">({item.reviewCount})</span>
					</div>
				)}

				{/* Add to Cart Button - Shown on hover */}
				<Button
					variant="default"
					className={`w-full mt-3 bg-black hover:bg-gray-800 text-white text-xs py-1 h-8 transition-opacity ${
						isHovered ? "opacity-100" : "opacity-0"
					}`}
				>
					Add to cart
				</Button>
			</CardContent>
		</Card>
	);
}
