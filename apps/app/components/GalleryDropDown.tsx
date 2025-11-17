import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GalleryDropDown = () => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setIsOpen(false);
	}, []);
	useEffect(() => {
		setIsOpen(false);
	}, [router.pathname]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div ref={dropdownRef}>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="nav-link-btn flex flex-row items-center gap-1"
			>
				Gallery
				{isOpen ? (
					<motion.span
						initial={{ rotate: 0 }}
						animate={{ rotate: 180 }}
						className="text-sm"
					>
						▾
					</motion.span>
				) : (
					<motion.span
						initial={{ rotate: 180 }}
						animate={{ rotate: 0 }}
						className="text-sm"
					>
						▾
					</motion.span>
				)}
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="bg-gray-100 border border-gray-300 shadow-lg absolute top-20 text-gray-700 flex flex-col items start rounded-lg p-3"
					>
						<Link className="gallery-dropdown-item" href="/gallery/painting">
							{" "}
							Paintings
						</Link>
						<Link className="gallery-dropdown-item" href="/gallery/photograph">
							{" "}
							Photography
						</Link>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default GalleryDropDown;
