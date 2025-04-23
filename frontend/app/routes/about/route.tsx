import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
	CircleDollarSign,
	Clock,
	Instagram,
	Linkedin,
	ShoppingBag,
	Star,
	TrendingUp,
	Truck,
	Users,
} from "lucide-react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Our Story - Fashion Brand" },
		{ name: "description", content: "Learn about our fashion brand story" },
	];
};

export default function Index() {
	return (
		<>
			{/* Hero Section */}
			<section className="px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="flex flex-col justify-center">
					<h1 className="text-4xl font-bold mb-6">Our Story</h1>
					<p className="text-gray-600 mb-6">
						Founded in 2014, Harmony is a fresh approach to retail, providing a
						distinctive style an extra dimension to individuals. Founded by two
						friends with a shared vision, we've grown from a small boutique
						location into a widely popular style source that doesn't compromise
						fashion for being eco-friendly.
					</p>
					<p className="text-gray-600 mb-6">
						Our dedication to quality and ethical manufacturing is at the
						forefront of all we do. From where it all began wholesale to
						categorizing products, we're here for you.
					</p>
				</div>
				<div className="bg-pink-400 rounded-lg overflow-hidden">
					<img
						src="/api/placeholder/600/500"
						alt="Two fashion models posing with shopping bags"
						className="w-full h-full object-cover"
					/>
				</div>
			</section>

			{/* Stats Section */}
			<section className="px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card className="border-none shadow-sm">
					<CardContent className="flex flex-col items-center justify-center pt-6">
						<div className="bg-gray-100 rounded-full p-3 mb-3">
							<Clock size={24} className="text-gray-700" />
						</div>
						<h3 className="text-2xl font-bold">10.5k</h3>
						<p className="text-sm text-gray-500">Hours of service work</p>
					</CardContent>
				</Card>

				<Card className="border-none shadow-sm bg-red-500 text-white">
					<CardContent className="flex flex-col items-center justify-center pt-6">
						<div className="bg-red-400 rounded-full p-3 mb-3">
							<ShoppingBag size={24} className="text-white" />
						</div>
						<h3 className="text-2xl font-bold">33k</h3>
						<p className="text-sm">Items we've sold this year</p>
					</CardContent>
				</Card>

				<Card className="border-none shadow-sm">
					<CardContent className="flex flex-col items-center justify-center pt-6">
						<div className="bg-gray-100 rounded-full p-3 mb-3">
							<Star size={24} className="text-gray-700" />
						</div>
						<h3 className="text-2xl font-bold">45.5k</h3>
						<p className="text-sm text-gray-500">Customer reviews we have</p>
					</CardContent>
				</Card>

				<Card className="border-none shadow-sm">
					<CardContent className="flex flex-col items-center justify-center pt-6">
						<div className="bg-gray-100 rounded-full p-3 mb-3">
							<Users size={24} className="text-gray-700" />
						</div>
						<h3 className="text-2xl font-bold">25k</h3>
						<p className="text-sm text-gray-500">Active clients we work with</p>
					</CardContent>
				</Card>
			</section>

			{/* Team Section */}
			<section className="px-8 py-12">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="group">
						<div className="bg-gray-100 aspect-square overflow-hidden mb-4">
							<img
								src="/api/placeholder/300/300"
								alt="Tom Cruise"
								className="w-full h-full object-cover transition-transform group-hover:scale-105"
							/>
						</div>
						<h3 className="font-bold text-lg">Tom Cruise</h3>
						<p className="text-sm text-gray-500 mb-2">Fashion Designer</p>
						<div className="flex space-x-2">
							<Link to="#" className="text-gray-400 hover:text-gray-700">
								<Instagram size={16} />
							</Link>
							<Link to="#" className="text-gray-400 hover:text-gray-700">
								<Linkedin size={16} />
							</Link>
						</div>
					</div>

					<div className="group">
						<div className="bg-gray-100 aspect-square overflow-hidden mb-4">
							<img
								src="/api/placeholder/300/300"
								alt="Emma Watson"
								className="w-full h-full object-cover transition-transform group-hover:scale-105"
							/>
						</div>
						<h3 className="font-bold text-lg">Emma Watson</h3>
						<p className="text-sm text-gray-500 mb-2">Marketing Director</p>
						<div className="flex space-x-2">
							<Link to="#" className="text-gray-400 hover:text-gray-700">
								<Instagram size={16} />
							</Link>
							<Link to="#" className="text-gray-400 hover:text-gray-700">
								<Linkedin size={16} />
							</Link>
						</div>
					</div>

					<div className="group">
						<div className="bg-gray-100 aspect-square overflow-hidden mb-4">
							<img
								src="/api/placeholder/300/300"
								alt="Will Smith"
								className="w-full h-full object-cover transition-transform group-hover:scale-105"
							/>
						</div>
						<h3 className="font-bold text-lg">Will Smith</h3>
						<p className="text-sm text-gray-500 mb-2">CEO/Founder</p>
						<div className="flex space-x-2">
							<Link to="#" className="text-gray-400 hover:text-gray-700">
								<Instagram size={16} />
							</Link>
							<Link to="#" className="text-gray-400 hover:text-gray-700">
								<Linkedin size={16} />
							</Link>
						</div>
					</div>
				</div>

				{/* Pagination Dots */}
				<div className="flex justify-center mt-8 space-x-2">
					{[1, 2, 3, 4, 5].map((_, i) => (
						<button
							key={i}
							className={`w-2 h-2 rounded-full ${
								i === 0 ? "bg-gray-800" : "bg-gray-300"
							}`}
							aria-label={`Go to slide ${i + 1}`}
						/>
					))}
				</div>
			</section>

			{/* Features Section */}
			<section className="px-8 py-12 bg-gray-50">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="flex items-start space-x-4">
						<div className="bg-gray-200 rounded-full p-3">
							<Clock size={24} className="text-gray-700" />
						</div>
						<div>
							<h3 className="uppercase font-bold text-sm mb-2">
								FREE STANDARD DELIVERY
							</h3>
							<p className="text-sm text-gray-500">On all orders over $50</p>
						</div>
					</div>

					<div className="flex items-start space-x-4">
						<div className="bg-gray-200 rounded-full p-3">
							<Truck size={24} className="text-gray-700" />
						</div>
						<div>
							<h3 className="uppercase font-bold text-sm mb-2">
								24/7 CUSTOMER SERVICE
							</h3>
							<p className="text-sm text-gray-500">
								Friendly 24/7 customer support
							</p>
						</div>
					</div>

					<div className="flex items-start space-x-4">
						<div className="bg-gray-200 rounded-full p-3">
							<CircleDollarSign size={24} className="text-gray-700" />
						</div>
						<div>
							<h3 className="uppercase font-bold text-sm mb-2">
								MONEY BACK GUARANTEE
							</h3>
							<p className="text-sm text-gray-500">
								We return money within 30 days
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
