import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Stats from "./pages/stats";

const App: React.FC = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<Router>
			<div className="min-h-screen bg-spotify-base">
				<Header />
				<div className="flex relative">
					<Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
					<main
						className={`flex-1 min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out
                        ${isSidebarOpen ? "md:ml-72 lg:ml-80" : "md:ml-20"}`}
					>
						<div className="h-full">
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/stats" element={<Stats />} />
							</Routes>
						</div>
					</main>
				</div>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
