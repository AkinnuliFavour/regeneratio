// app/routes/products.$productId.tsx
import { useState } from "react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {
	Heart,
	ShoppingCart,
	Truck,
	Clock,
	ChevronRight,
	Star,
	Minus,
	Plus,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

// Define types for our product data
type Product = {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	images: string[];
	description: string;
	rating: number;
	reviewCount: number;
	colors: {
		name: string;
		value: string;
	}[];
	inStock: boolean;
	freeShipping: boolean;
	estimatedDelivery: string;
	relatedProducts: RelatedProduct[];
};

type RelatedProduct = {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	rating: number;
	reviewCount: number;
	isOnSale?: boolean;
	isNew?: boolean;
};

// Loader function to fetch data
export const loader = async ({ params }: LoaderFunctionArgs) => {
	const productId = params.productId;

	// In a real app, you would fetch this data from your API or database
	const product: Product = {
		id: "controller-dualsense",
		name: "Haptic VR-D-R2 Gamepad",
		price: 192.0,
		images: [
			"/images/controller-front.jpg",
			"/images/controller-side-1.jpg",
			"/images/controller-side-2.jpg",
			"/images/controller-side-3.jpg",
			"/images/controller-side-4.jpg",
		],
		description:
			"Experience a next-level gaming with precise haptic feedback and adaptive triggers. Connect wirelessly via Bluetooth for seamless integration with compatible devices.",
		rating: 4.5,
		reviewCount: 36,
		colors: [
			{ name: "Black", value: "#000000" },
			{ name: "White", value: "#FFFFFF" },
			{ name: "Red", value: "#FF0000" },
			{ name: "Blue", value: "#0000FF" },
		],
		inStock: true,
		freeShipping: true,
		estimatedDelivery: "3-4 business days",
		relatedProducts: [
			{
				id: "controller-red",
				name: "Earth-W1-R69 Gamepad",
				price: 59.99,
				originalPrice: 69.99,
				image: "/images/controller-red.jpg",
				rating: 4.5,
				reviewCount: 245,
				isOnSale: true,
			},
			{
				id: "keyboard-rgb",
				name: "RK-306 RGB Keyboard",
				price: 89.99,
				image: "/images/keyboard-rgb.jpg",
				rating: 4.7,
				reviewCount: 179,
			},
			{
				id: "monitor-gaming",
				name: "4K UHD Gaming Monitor",
				price: 299.99,
				originalPrice: 349.99,
				image: "/images/monitor-gaming.jpg",
				rating: 4.8,
				reviewCount: 198,
				isOnSale: true,
			},
			{
				id: "pc-cooler",
				name: "RGB Liquid CPU Cooler",
				price: 129.99,
				image: "/images/cpu-cooler.jpg",
				rating: 4.6,
				reviewCount: 156,
			},
		],
	};

	if (!product) {
		throw new Response("Product not found", { status: 404 });
	}

	return json({ product });
};

export default function ProductDetails() {
	const { product } = useLoaderData<typeof loader>();
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [selectedColor, setSelectedColor] = useState(product.colors[0]);

	// Function to render star ratings
	const renderStars = (rating: number) => {
		const stars = [];
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 >= 0.5;

		for (let i = 0; i < 5; i++) {
			if (i < fullStars) {
				stars.push(
					<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
				);
			} else if (i === fullStars && hasHalfStar) {
				stars.push(
					<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
				);
			} else {
				stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
			}
		}
		return stars;
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Breadcrumb */}
			<div className="container mx-auto px-4 py-2">
				<div className="flex items-center text-sm text-gray-500">
					<Link to="/" className="hover:text-gray-700">
						Home
					</Link>
					<ChevronRight className="h-3 w-3 mx-1" />
					<Link to="/gaming" className="hover:text-gray-700">
						Gaming
					</Link>
					<ChevronRight className="h-3 w-3 mx-1" />
					<span className="text-gray-700">Haptic VR-D-R2 Gamepad</span>
				</div>
			</div>

			{/* Product Details Section */}
			<section className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Product Images */}
					<div className="flex flex-col-reverse md:flex-row gap-4">
						{/* Thumbnail Images */}
						<div className="flex md:flex-col gap-2 mt-4 md:mt-0">
							{product.images.map((image, index) => (
								<button
									key={index}
									className={`border-2 ${
										selectedImage === index
											? "border-gray-700"
											: "border-gray-200"
									} p-1 w-16 h-16`}
									onClick={() => setSelectedImage(index)}
								>
									<img
										src={
											image.startsWith("/") ? `/api/placeholder/60/60` : image
										}
										alt={`${product.name} view ${index + 1}`}
										className="w-full h-full object-contain"
									/>
								</button>
							))}
						</div>

						{/* Main Image */}
						<div className="bg-gray-100 flex items-center justify-center flex-grow h-96">
							<img
								src={
									product.images[selectedImage].startsWith("/")
										? `/api/placeholder/500/500`
										: product.images[selectedImage]
								}
								alt={product.name}
								className="max-h-full max-w-full object-contain"
							/>
						</div>
					</div>

					{/* Product Info */}
					<div>
						<h1 className="text-2xl font-bold mb-2">{product.name}</h1>

						{/* Rating */}
						<div className="flex items-center gap-2 mb-4">
							<div className="flex">{renderStars(product.rating)}</div>
							<span className="text-sm text-gray-500">
								({product.reviewCount} Reviews)
							</span>
						</div>

						{/* Price */}
						<div className="mb-4">
							<span className="text-2xl font-bold">
								${product.price.toFixed(2)}
							</span>
						</div>

						{/* Description */}
						<p className="text-gray-600 mb-6">{product.description}</p>

						{/* Color Selection */}
						<div className="mb-6">
							<h3 className="font-medium mb-2">Colors</h3>
							<div className="flex gap-2">
								{product.colors.map((color) => (
									<button
										key={color.name}
										className={`w-8 h-8 rounded-full border-2 ${
											selectedColor.name === color.name
												? "border-gray-700"
												: "border-gray-200"
										}`}
										style={{ backgroundColor: color.value }}
										onClick={() => setSelectedColor(color)}
										aria-label={color.name}
									/>
								))}
							</div>
						</div>

						{/* Quantity */}
						<div className="mb-6">
							<h3 className="font-medium mb-2">Size</h3>
							<div className="flex items-center gap-2">
								<button className="border border-gray-300 px-3 py-1">S</button>
								<button className="border border-gray-300 px-3 py-1 bg-gray-900 text-white">
									M
								</button>
								<button className="border border-gray-300 px-3 py-1">L</button>
								<button className="border border-gray-300 px-3 py-1">XL</button>
							</div>
						</div>

						{/* Quantity */}
						<div className="mb-6">
							<div className="flex items-center gap-4">
								<div className="flex items-center border border-gray-300">
									<button
										className="px-3 py-2 border-r border-gray-300"
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
									>
										<Minus className="h-4 w-4" />
									</button>
									<input
										type="text"
										value={quantity}
										onChange={(e) => {
											const val = parseInt(e.target.value);
											if (!isNaN(val) && val > 0) {
												setQuantity(val);
											}
										}}
										className="w-12 text-center py-2 border-none focus:outline-none"
									/>
									<button
										className="px-3 py-2 border-l border-gray-300"
										onClick={() => setQuantity(quantity + 1)}
									>
										<Plus className="h-4 w-4" />
									</button>
								</div>

								<Button
									variant="default"
									className="bg-red-600 hover:bg-red-700 px-8 py-2"
								>
									Add to cart
								</Button>

								<Button variant="outline" className="border-gray-300 p-2">
									<Heart className="h-5 w-5" />
								</Button>
							</div>
						</div>

						{/* Shipping Info */}
						<div className="border-t border-gray-200 pt-6 space-y-4">
							<div className="flex items-center gap-3">
								<div className="bg-gray-100 p-2 rounded-full">
									<Truck className="h-5 w-5 text-gray-600" />
								</div>
								<div>
									<p className="font-medium">Free Delivery</p>
									<p className="text-sm text-gray-500">
										Free shipping on orders exceeding $100
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<div className="bg-gray-100 p-2 rounded-full">
									<Clock className="h-5 w-5 text-gray-600" />
								</div>
								<div>
									<p className="font-medium">In-Stock Delivery</p>
									<p className="text-sm text-gray-500">
										Delivered in {product.estimatedDelivery}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Related Products Section */}
			<section className="container mx-auto px-4 py-8">
				<div className="mb-6 flex justify-between items-center">
					<div className="flex items-center">
						<div className="bg-red-600 h-6 w-2 mr-2"></div>
						<h2 className="text-lg font-medium">Related Items</h2>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
					{product.relatedProducts.map((item) => (
						<RelatedProductCard key={item.id} product={item} />
					))}
				</div>
			</section>
		</div>
	);
}

// Related Product Card Component
function RelatedProductCard({ product }: { product: RelatedProduct }) {
	const [isHovered, setIsHovered] = useState(false);
	const [isWishlisted, setIsWishlisted] = useState(false);

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
				{product.isOnSale && (
					<div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-0.5 z-10">
						SALE
					</div>
				)}

				{/* New Badge */}
				{product.isNew && (
					<div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-0.5 z-10">
						NEW
					</div>
				)}

				{/* Wishlist Button */}
				<button
					className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md z-10"
					onClick={() => setIsWishlisted(!isWishlisted)}
				>
					<Heart
						className={`h-4 w-4 ${
							isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
						}`}
					/>
				</button>

				{/* Image Container */}
				<Link to={`/products/${product.id}`}>
					<div className="bg-gray-100 h-48 flex items-center justify-center mb-3">
						<img
							src={
								product.image.startsWith("/")
									? `/api/placeholder/300/300`
									: product.image
							}
							alt={product.name}
							className="max-h-44 object-contain mx-auto"
						/>
					</div>
				</Link>
			</div>

			<CardContent className="p-0">
				{/* Product Info */}
				<Link to={`/products/${product.id}`}>
					<h3 className="font-medium text-sm mb-1 line-clamp-2">
						{product.name}
					</h3>
				</Link>

				<div className="flex items-center space-x-2 mb-2">
					<span className="font-medium">${product.price.toFixed(2)}</span>
					{product.originalPrice && (
						<span className="text-xs text-gray-500 line-through">
							${product.originalPrice.toFixed(2)}
						</span>
					)}
				</div>

				{/* Ratings */}
				<div className="flex items-center gap-1">
					<div className="flex">{renderStars(product.rating)}</div>
					<span className="text-xs text-gray-500">({product.reviewCount})</span>
				</div>
			</CardContent>
		</Card>
	);
}
