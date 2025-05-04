import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Star } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";

// Sample product data (replace with real data from a database in a real app)
const products = [
	{ id: 1, name: "Smartphone X", price: 699, rating: 4.5, category: "Phones" },
	{ id: 2, name: "Laptop Pro", price: 1299, rating: 4.8, category: "Laptops" },
	{
		id: 3,
		name: "Wireless Earbuds",
		price: 149,
		rating: 4.2,
		category: "Accessories",
	},
	{
		id: 4,
		name: "Smartwatch 3",
		price: 299,
		rating: 4.0,
		category: "Wearables",
	},
	{
		id: 5,
		name: "Gaming Console",
		price: 499,
		rating: 4.7,
		category: "Gaming",
	},
	{ id: 6, name: "Tablet S", price: 399, rating: 4.3, category: "Tablets" },
];

// Loader to fetch products (mocked here)
export const loader: LoaderFunction = async () => {
	return json({ products });
};

export default function Gadgets() {
	const { products } = useLoaderData<typeof loader>();

	return (
		<div className="container mx-auto p-4 flex gap-6">
			{/* Sidebar for Filters */}
			<aside className="w-1/4 bg-gray-100 p-4 rounded-lg">
				<h2 className="text-lg font-semibold mb-4">Filters</h2>

				{/* Category Filter */}
				<div className="mb-4">
					<h3 className="text-sm font-medium mb-2">Category</h3>
					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="phones">Phones</SelectItem>
							<SelectItem value="laptops">Laptops</SelectItem>
							<SelectItem value="accessories">Accessories</SelectItem>
							<SelectItem value="wearables">Wearables</SelectItem>
							<SelectItem value="gaming">Gaming</SelectItem>
							<SelectItem value="tablets">Tablets</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Price Range Filter */}
				<div className="mb-4">
					<h3 className="text-sm font-medium mb-2">Price Range</h3>
					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select Price Range" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="0-200">$0 - $200</SelectItem>
							<SelectItem value="200-500">$200 - $500</SelectItem>
							<SelectItem value="500-1000">$500 - $1000</SelectItem>
							<SelectItem value="1000+">$1000+</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</aside>

			{/* Product Grid */}
			<main className="w-3/4">
				<h1 className="text-2xl font-bold mb-6">Gadgets</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{products.map((product: any) => (
						<Card
							key={product.id}
							className="shadow-md hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								{/* Placeholder for Product Image */}
								<div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
									<span className="text-gray-500">Image Placeholder</span>
								</div>
							</CardHeader>
							<CardContent>
								<CardTitle className="text-lg font-semibold">
									{product.name}
								</CardTitle>
								<p className="text-gray-600 mt-1">${product.price}</p>
								<div className="flex items-center mt-2">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`w-5 h-5 ${
												i < Math.floor(product.rating)
													? "text-yellow-400"
													: "text-gray-300"
											}`}
										/>
									))}
									<span className="ml-2 text-sm text-gray-500">
										({product.rating})
									</span>
								</div>
							</CardContent>
							<CardFooter>
								<Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
									Add to Cart
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</main>
		</div>
	);
}
