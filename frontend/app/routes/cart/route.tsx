import { json } from "@remix-run/node";
import { useLoaderData, Form, useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState } from "react";

// Loader to fetch cart data
export const loader = async () => {
	const cartItems = [
		{ id: 1, name: "LCD Monitor", price: 650, quantity: 1 },
		{ id: 2, name: "H1 Gamepad", price: 250, quantity: 2 },
	];
	return json({ cartItems });
};

export default function Index() {
	const { cartItems } = useLoaderData<typeof loader>();
	const fetcher = useFetcher();
	const [coupon, setCoupon] = useState("");

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const shipping = 0; // Free shipping as per design
	const total = subtotal + shipping;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Cart Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex">
				{/* Cart Items */}
				<div className="flex-1 mr-8">
					<div className="bg-white shadow-sm rounded-lg p-6">
						<div className="grid grid-cols-4 font-semibold text-gray-600 border-b pb-2">
							<div>Product</div>
							<div>Price</div>
							<div>Quantity</div>
							<div>Subtotal</div>
						</div>
						{cartItems.map((item) => (
							<div
								key={item.id}
								className="grid grid-cols-4 items-center py-4 border-b"
							>
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gray-200 rounded"></div>
									<span>{item.name}</span>
								</div>
								<div>${item.price}</div>
								<div className="flex items-center space-x-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => {
											fetcher.submit(
												{ id: item.id.toString(), action: "decrease" },
												{ method: "post" }
											);
										}}
									>
										-
									</Button>
									<span>{item.quantity}</span>
									<Button
										variant="outline"
										size="sm"
										onClick={() => {
											fetcher.submit(
												{ id: item.id.toString(), action: "increase" },
												{ method: "post" }
											);
										}}
									>
										+
									</Button>
								</div>
								<div>${item.price * item.quantity}</div>
							</div>
						))}
					</div>
					<Button variant="outline" className="mt-4">
						Return To Shop
					</Button>
				</div>

				{/* Coupon and Total */}
				<div className="w-80">
					<div className="bg-white shadow-sm rounded-lg p-6">
						<div className="flex space-x-2 mb-4">
							<Input
								placeholder="Coupon Code"
								value={coupon}
								onChange={(e) => setCoupon(e.target.value)}
							/>
							<Button
								variant="default"
								className="w-full bg-blue-500 hover:bg-blue-600"
							>
								Apply Coupon
							</Button>
						</div>
						<div className="border-t pt-4">
							<h3 className="font-semibold text-gray-600 mb-4">Cart Total</h3>
							<div className="flex justify-between mb-2">
								<span>Subtotal:</span>
								<span>${subtotal}</span>
							</div>
							<div className="flex justify-between mb-2">
								<span>Shipping:</span>
								<span>Free</span>
							</div>
							<div className="flex justify-between font-semibold text-lg border-t pt-2">
								<span>Total:</span>
								<span>${total}</span>
							</div>
							<Button
								variant="default"
								className="w-full mt-4 bg-blue-500 hover:bg-blue-600"
							>
								Proceed to checkout
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Action to handle quantity updates
export const action = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const id = parseInt(formData.get("id") as string);
	const action = formData.get("action") as string;

	// Simulate updating quantity (in a real app, this would update a database)
	const cartItems = [
		{ id: 1, name: "LCD Monitor", price: 650, quantity: 1 },
		{ id: 2, name: "H1 Gamepad", price: 250, quantity: 2 },
	];

	const updatedItems = cartItems.map((item) => {
		if (item.id === id) {
			if (action === "increase") {
				return { ...item, quantity: item.quantity + 1 };
			} else if (action === "decrease" && item.quantity > 1) {
				return { ...item, quantity: item.quantity - 1 };
			}
		}
		return item;
	});

	return json({ cartItems: updatedItems });
};
