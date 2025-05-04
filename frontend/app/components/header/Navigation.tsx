// app/components/Navigation.tsx
import { Link } from "@remix-run/react";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useNavigate } from "@remix-run/react";

export default function Navigation() {
	const navigate = useNavigate();

	return (
		<header className="bg-white shadow-sm">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link to="/" className="text-xl font-bold text-gray-900">
						TechStore
					</Link>

					{/* Navigation Links - Desktop */}
					<nav className="hidden md:flex items-center space-x-8">
						<Link
							to="/"
							className="text-sm font-medium text-gray-900 hover:text-gray-700"
						>
							Home
						</Link>
						<Link
							to="/about"
							className="text-sm font-medium text-gray-500 hover:text-gray-700"
						>
							About
						</Link>
						<Link
							to="/gadgets"
							className="text-sm font-medium text-gray-500 hover:text-gray-700"
						>
							Categories
						</Link>
					</nav>

					{/* Search Bar */}
					<div className="hidden md:flex items-center w-1/3">
						<div className="relative w-full">
							<Input
								type="text"
								placeholder="Search for products..."
								className="w-full pr-10 border-gray-300 rounded-md"
							/>
							<button className="absolute right-2 top-1/2 transform -translate-y-1/2">
								<Search className="h-5 w-5 text-gray-400" />
							</button>
						</div>
					</div>

					{/* User Actions */}
					<div className="flex items-center space-x-4">
						<Link to="/wishlist" className="text-gray-500 hover:text-gray-700">
							<Heart className="h-6 w-6" />
						</Link>
						<Link
							to="/cart"
							className="text-gray-500 hover:text-gray-700 relative"
						>
							<ShoppingCart className="h-6 w-6" />
							<span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
								3
							</span>
						</Link>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className="text-gray-500 hover:text-gray-700">
									<User className="h-6 w-6" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Orders</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	);
}
