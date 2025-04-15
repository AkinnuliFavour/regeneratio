// app/components/Footer.tsx
import { Link } from "@remix-run/react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
	return (
		<footer className="bg-gray-900 text-gray-300">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Company Info */}
					<div>
						<h3 className="text-white text-lg font-bold mb-4">TechStore</h3>
						<p className="mb-4 text-sm">
							Your one-stop shop for all electronics and tech gadgets. We
							provide high-quality products at competitive prices.
						</p>
						<div className="flex space-x-4">
							<a href="#" className="text-gray-400 hover:text-white">
								<Facebook className="h-5 w-5" />
							</a>
							<a href="#" className="text-gray-400 hover:text-white">
								<Twitter className="h-5 w-5" />
							</a>
							<a href="#" className="text-gray-400 hover:text-white">
								<Instagram className="h-5 w-5" />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link to="/" className="hover:text-white">
									Home
								</Link>
							</li>
							<li>
								<Link to="/about" className="hover:text-white">
									About Us
								</Link>
							</li>
							<li>
								<Link to="/products" className="hover:text-white">
									Products
								</Link>
							</li>
							<li>
								<Link to="/blog" className="hover:text-white">
									Blog
								</Link>
							</li>
							<li>
								<Link to="/contact" className="hover:text-white">
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Customer Support */}
					<div>
						<h3 className="text-white text-lg font-bold mb-4">
							Customer Support
						</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link to="/faq" className="hover:text-white">
									FAQ
								</Link>
							</li>
							<li>
								<Link to="/shipping" className="hover:text-white">
									Shipping Policy
								</Link>
							</li>
							<li>
								<Link to="/returns" className="hover:text-white">
									Returns & Refunds
								</Link>
							</li>
							<li>
								<Link to="/privacy" className="hover:text-white">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link to="/terms" className="hover:text-white">
									Terms & Conditions
								</Link>
							</li>
						</ul>
					</div>

					{/* Newsletter */}
					<div>
						<h3 className="text-white text-lg font-bold mb-4">Newsletter</h3>
						<p className="mb-4 text-sm">
							Subscribe to receive updates on new arrivals and special offers.
						</p>
						<form className="flex">
							<input
								type="email"
								placeholder="Your email"
								className="bg-gray-800 text-white px-4 py-2 text-sm rounded-l-md focus:outline-none w-full"
							/>
							<button
								type="submit"
								className="bg-red-600 text-white px-4 py-2 text-sm rounded-r-md hover:bg-red-700"
							>
								Subscribe
							</button>
						</form>
					</div>
				</div>

				<div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-sm">
						© {new Date().getFullYear()} TechStore. All rights reserved.
					</p>
					<div className="mt-4 md:mt-0">
						<img
							src="/api/placeholder/200/30"
							alt="Payment methods"
							className="h-8"
						/>
					</div>
				</div>
			</div>
		</footer>
	);
}
