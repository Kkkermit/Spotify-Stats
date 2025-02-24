import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Header: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();

	const isActive = (path: string) => location.pathname === path;

	return (
		<header className="bg-spotify-base border-b border-spotify-gray/10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link to="/" className="flex items-center space-x-2">
						<motion.h1
							className="text-2xl font-bold bg-gradient-to-r from-spotify-green to-green-400 bg-clip-text text-transparent"
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.2 }}
						>
							Spotify Stats
						</motion.h1>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						{[
							{ path: "/", label: "Home" },
							{ path: "/dashboard", label: "Dashboard" },
							{ path: "/stats", label: "Stats" },
						].map(({ path, label }) => (
							<Link
								key={path}
								to={path}
								className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200
                                    ${isActive(path) ? "text-spotify-green" : "text-gray-300 hover:text-white"}`}
							>
								{label}
								{isActive(path) && (
									<motion.div
										className="absolute bottom-0 left-0 right-0 h-0.5 bg-spotify-green"
										layoutId="underline"
									/>
								)}
							</Link>
						))}
					</nav>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
					>
						<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							{isMenuOpen ? (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							) : (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							)}
						</svg>
					</button>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="md:hidden py-4"
					>
						<div className="flex flex-col space-y-4">
							{[
								{ path: "/", label: "Home" },
								{ path: "/dashboard", label: "Dashboard" },
								{ path: "/stats", label: "Stats" },
							].map(({ path, label }) => (
								<Link
									key={path}
									to={path}
									className={`px-3 py-2 rounded-md text-base font-medium
                                        ${
																					isActive(path)
																						? "text-spotify-green bg-spotify-gray/20"
																						: "text-gray-300 hover:text-white hover:bg-spotify-gray/10"
																				}`}
									onClick={() => setIsMenuOpen(false)}
								>
									{label}
								</Link>
							))}
						</div>
					</motion.div>
				)}
			</div>
		</header>
	);
};

export default Header;
