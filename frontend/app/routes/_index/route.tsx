// File: app/routes/_index.tsx
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/components/ui/carousel";

// Define types for our product data
type Product = {
	id: string;
	name: string;
	price: number;
	oldPrice?: number;
	image: string;
	category: string;
	isNewArrival?: boolean;
	isFeatured?: boolean;
	isBestSelling?: boolean;
};

type Category = {
	id: string;
	name: string;
	icon: string;
};

// Loader function to fetch data
export const loader = async () => {
	// In a real app, you would fetch this data from your API or database
	const featuredProducts: Product[] = [
		{
			id: "1",
			name: "Red Wireless Controller",
			price: 59.99,
			oldPrice: 69.99,
			image: "/images/controller-red.jpg",
			category: "Gaming",
			isFeatured: true,
		},
		{
			id: "2",
			name: "Wireless Earbuds",
			price: 99.99,
			image: "/images/earbuds.jpg",
			category: "Audio",
			isFeatured: true,
		},
		{
			id: "3",
			name: "Smart TV 4K HDR",
			price: 499.99,
			oldPrice: 599.99,
			image: "/images/tv.jpg",
			category: "TV & Home",
			isFeatured: true,
		},
		{
			id: "4",
			name: "Modern Chair",
			price: 149.99,
			image: "/images/chair.jpg",
			category: "Furniture",
			isFeatured: true,
		},
	];

	const bestSellingProducts: Product[] = [
		{
			id: "5",
			name: "Portable Speaker",
			price: 79.99,
			image: "/images/speaker.jpg",
			category: "Audio",
			isBestSelling: true,
		},
		{
			id: "6",
			name: "Gaming Headphones",
			price: 129.99,
			oldPrice: 149.99,
			image: "/images/headphones.jpg",
			category: "Gaming",
			isBestSelling: true,
		},
		{
			id: "7",
			name: "Smartphone XS",
			price: 899.99,
			image: "/images/smartphone.jpg",
			category: "Phones",
			isBestSelling: true,
		},
		{
			id: "8",
			name: "Leather Bag",
			price: 199.99,
			image: "/images/bag.jpg",
			category: "Fashion",
			isBestSelling: true,
		},
	];

	const newArrivals: Product[] = [
		{
			id: "9",
			name: "Smartwatch Pro",
			price: 249.99,
			image: "/images/smartwatch.jpg",
			category: "Wearables",
			isNewArrival: true,
		},
		{
			id: "10",
			name: "Laptop Ultra",
			price: 1299.99,
			oldPrice: 1499.99,
			image: "/images/laptop.jpg",
			category: "Computers",
			isNewArrival: true,
		},
		{
			id: "11",
			name: "Wireless Charger",
			price: 49.99,
			image: "/images/charger.jpg",
			category: "Accessories",
			isNewArrival: true,
		},
		{
			id: "12",
			name: "Bluetooth Speaker",
			price: 129.99,
			image: "/images/bluetooth-speaker.jpg",
			category: "Audio",
			isNewArrival: true,
		},
	];

	const categories: Category[] = [
		{ id: "1", name: "Phones", icon: "smartphone" },
		{ id: "2", name: "Laptops", icon: "laptop" },
		{ id: "3", name: "Audio", icon: "headphones" },
		{ id: "4", name: "Gaming", icon: "gamepad" },
		{ id: "5", name: "Accessories", icon: "package" },
	];

	return json({
		featuredProducts,
		bestSellingProducts,
		newArrivals,
		categories,
	});
};

export default function Index() {
	const { featuredProducts, bestSellingProducts, newArrivals, categories } =
		useLoaderData<typeof loader>();

	return (
		<div className="min-h-screen bg-slate-50">
			{/* Header and Navigation would go here */}

			{/* Hero Banner */}
			<div className="relative w-full h-80 bg-gradient-to-r from-purple-700 to-indigo-900 text-white">
				<div className="container mx-auto px-4 h-full flex items-center">
					<div className="max-w-md">
						<h1 className="text-4xl font-bold mb-4">Up to 70% off Shopping!</h1>
						<p className="mb-6">
							Discover amazing deals on the latest tech products and
							accessories.
						</p>
						<Button
							variant="default"
							className="bg-white text-purple-900 hover:bg-gray-100"
						>
							Shop Now
						</Button>
					</div>
					<div className="absolute right-0 bottom-0 h-full w-1/2 flex items-center justify-center">
						{/* This would be your hero image */}
						<div className="w-64 h-64 bg-purple-400 rounded-full opacity-50"></div>
					</div>
				</div>
			</div>

			{/* Featured Products */}
			<section className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold">Flash Sales</h2>
					<div className="flex space-x-2">
						<Button variant="outline" size="sm">
							1d
						</Button>
						<Button variant="outline" size="sm">
							2d
						</Button>
						<Button variant="outline" size="sm">
							3d
						</Button>
						<Button variant="outline" size="sm">
							4d
						</Button>
						<Button variant="outline" size="sm">
							5d
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
					{featuredProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>

				<div className="text-center mt-8">
					<Button variant="default" className="bg-red-600 hover:bg-red-700">
						View All Products
					</Button>
				</div>
			</section>

			{/* Categories */}
			<section className="container mx-auto px-4 py-8">
				<h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
					{categories.map((category) => (
						<div
							key={category.id}
							className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
						>
							<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
								<span className="text-gray-600">{category.icon}</span>
							</div>
							<span className="text-sm font-medium">{category.name}</span>
						</div>
					))}
				</div>
			</section>

			{/* Best Selling Products */}
			<section className="container mx-auto px-4 py-8">
				<h2 className="text-2xl font-bold mb-6">Best Selling Products</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
					{bestSellingProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>

				<div className="text-center mt-8">
					<Button variant="default" className="bg-red-600 hover:bg-red-700">
						View All Products
					</Button>
				</div>
			</section>

			{/* Music Experience Banner */}
			<section className="container mx-auto px-4 py-8">
				<div className="bg-black text-white rounded-lg p-8 relative overflow-hidden">
					<div className="relative z-10 max-w-md">
						<h2 className="text-3xl font-bold mb-4">
							Enhance Your Music Experience
						</h2>
						<div className="flex space-x-4 mb-6">
							<div className="w-8 h-8 bg-green-500 rounded-full"></div>
							<div className="w-8 h-8 bg-blue-500 rounded-full"></div>
							<div className="w-8 h-8 bg-red-500 rounded-full"></div>
						</div>
						<Button
							variant="default"
							className="bg-green-500 hover:bg-green-600"
						>
							Explore Now
						</Button>
					</div>
					{/* Background elements would go here */}
				</div>
			</section>

			{/* Explore New Products */}
			<section className="container mx-auto px-4 py-8">
				<h2 className="text-2xl font-bold mb-6">Explore New Products</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
					{newArrivals.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>

				<div className="text-center mt-8">
					<Button variant="default" className="bg-red-600 hover:bg-red-700">
						View All Products
					</Button>
				</div>
			</section>

			{/* New Arrivals */}
			<section className="container mx-auto px-4 py-8">
				<h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="col-span-2 bg-gray-100 rounded-lg p-6 flex flex-col justify-between min-h-64">
						<h3 className="text-2xl font-bold">Premium Sound Quality</h3>
						<img
							src="/api/placeholder/400/320"
							alt="Premium speaker"
							className="mx-auto my-4"
						/>
						<div className="flex justify-between items-end">
							<div>
								<div className="flex space-x-2 mb-2">
									<span className="inline-block w-2 h-2 rounded-full bg-black"></span>
									<span className="inline-block w-2 h-2 rounded-full bg-gray-400"></span>
									<span className="inline-block w-2 h-2 rounded-full bg-gray-400"></span>
								</div>
								<Button
									variant="default"
									className="bg-black hover:bg-gray-800"
								>
									Shop Now
								</Button>
							</div>
							<div>
								<p className="text-lg font-bold">$299.99</p>
							</div>
						</div>
					</div>
					<div className="grid grid-rows-2 gap-6">
						<div className="bg-gray-100 rounded-lg p-6">
							<h3 className="text-xl font-bold mb-2">Wireless Earbuds</h3>
							<p className="text-sm text-gray-600 mb-4">Latest technology</p>
							<div className="flex justify-between items-end">
								<Button variant="outline" size="sm">
									Shop Now
								</Button>
								<img
									src="/api/placeholder/100/80"
									alt="Earbuds"
									className="h-20"
								/>
							</div>
						</div>
						<div className="bg-gray-100 rounded-lg p-6">
							<h3 className="text-xl font-bold mb-2">Smart Watch</h3>
							<p className="text-sm text-gray-600 mb-4">Track your fitness</p>
							<div className="flex justify-between items-end">
								<Button variant="outline" size="sm">
									Shop Now
								</Button>
								<img
									src="/api/placeholder/100/80"
									alt="Smartwatch"
									className="h-20"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Footer would go here */}
		</div>
	);
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Card
			className="relative overflow-hidden transition-all duration-300 hover:shadow-md"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{product.oldPrice && (
				<div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
					{Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
				</div>
			)}
			<div className="relative h-48 bg-gray-100">
				<img
					src={
						product.image.startsWith("/")
							? `/api/placeholder/400/320`
							: product.image
					}
					alt={product.name}
					className="w-full h-full object-contain p-4"
				/>
				<div
					className={`absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center transition-opacity duration-300 ${
						isHovered ? "opacity-100" : "opacity-0"
					}`}
				>
					<Button variant="default" size="sm" className="mx-1">
						Add to Cart
					</Button>
				</div>
			</div>
			<CardContent className="p-4">
				<div className="text-sm text-gray-500 mb-1">{product.category}</div>
				<h3 className="font-medium text-gray-900 mb-1 truncate">
					{product.name}
				</h3>
				<div className="flex items-center space-x-2">
					<span className="font-bold text-gray-900">
						${product.price.toFixed(2)}
					</span>
					{product.oldPrice && (
						<span className="text-sm text-gray-500 line-through">
							${product.oldPrice.toFixed(2)}
						</span>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
