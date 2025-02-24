import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const location = useLocation();

	const navigationItems = [
		{ path: "/", label: "Home", icon: "🏠" },
		{ path: "/dashboard", label: "Dashboard", icon: "📊" },
		{ path: "/stats", label: "Stats", icon: "📈" },
	];

	const sidebarVariants = {
		open: {
			width: "auto",
			transition: { duration: 0.3, ease: "easeInOut" },
		},
		closed: {
			width: "5rem",
			transition: { duration: 0.3, ease: "easeInOut" },
		},
	};

	return (
		<>
			{/* Desktop Toggle Button */}
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className="hidden md:flex fixed top-4 left-4 z-50 p-2 rounded-full
                         bg-spotify-gray/30 hover:bg-spotify-gray/50 
                         backdrop-blur-sm text-white
                         transition-all duration-300 ease-out
                         shadow-lg shadow-black/20"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				<svg
					className="w-5 h-5 transition-transform duration-300"
					style={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d={isOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
					/>
				</svg>
			</motion.button>

			{/* Mobile Menu Button */}
			<motion.button
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				className="md:hidden fixed bottom-4 right-4 z-50 p-3 rounded-full
                         bg-spotify-green text-white shadow-lg shadow-spotify-green/20
                         transition-all duration-300 ease-out"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
					/>
				</svg>
			</motion.button>

			{/* Sidebar Container */}
			<AnimatePresence mode="wait">
				<motion.div
					variants={sidebarVariants}
					initial={false}
					animate={isOpen ? "open" : "closed"}
					className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-40
                             bg-spotify-base border-r border-spotify-gray/10
                             transition-all duration-300 ease-in-out
                             ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                             ${isOpen ? "w-72 lg:w-80" : "w-20"}`}
				>
					<div className={`flex flex-col h-full ${isOpen ? "p-6" : "p-3"}`}>
						{/* Logo Section */}
						<motion.div className="mb-8" animate={{ opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.2 }}>
							<h2
								className="text-2xl font-bold bg-gradient-to-r from-spotify-green to-green-400 
                                       bg-clip-text text-transparent truncate"
							>
								{isOpen ? "Spotify Stats" : "SS"}
							</h2>
						</motion.div>

						{/* Navigation Items */}
						<nav className="flex-1 mt-8">
							<ul className="space-y-2">
								{navigationItems.map(({ path, label, icon }) => {
									const isActive = location.pathname === path;
									return (
										<motion.li key={path} whileHover={{ x: isOpen ? 4 : 0 }} transition={{ duration: 0.2 }}>
											<Link
												to={path}
												onClick={() => setIsMobileMenuOpen(false)}
												className={`flex items-center px-4 py-3 rounded-lg 
                                                        transition-all duration-200
                                                        ${
																													isActive
																														? "bg-spotify-gray/20 text-spotify-green"
																														: "text-gray-300 hover:bg-spotify-gray/10 hover:text-white"
																												}`}
												title={label}
											>
												<span className="text-xl">{icon}</span>
												<AnimatePresence mode="wait">
													{isOpen && (
														<motion.span
															className="ml-3 font-medium"
															initial={{ opacity: 0, width: 0 }}
															animate={{ opacity: 1, width: "auto" }}
															exit={{ opacity: 0, width: 0 }}
															transition={{ duration: 0.2 }}
														>
															{label}
														</motion.span>
													)}
												</AnimatePresence>
												{isActive && isOpen && (
													<motion.div
														layoutId="sidebar-active"
														className="ml-auto w-1.5 h-5 rounded-full bg-spotify-green"
													/>
												)}
											</Link>
										</motion.li>
									);
								})}
							</ul>
						</nav>
					</div>
				</motion.div>
			</AnimatePresence>
		</>
	);
};

export default Sidebar;
