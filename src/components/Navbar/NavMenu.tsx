import NavlinkScroll from "./NavlinkScroll";
import links from "./links";

export default function NavMenu() {
	return (
		<ul className="max-sm:hidden flex gap-12 max-lg:gap-5 text-3xl max-lg:text-2xl max-md:text-xl">
			{links.map((link) => (
				<li key={link.sectionId}>
					<NavlinkScroll sectionId={link.sectionId} label={link.label} />
				</li>
			))}
		</ul>
	);
}
