export type BackgroundProps = {
	className?: string;
	bgCss?: string;
};

export default function Background({ className, bgCss }: BackgroundProps) {
	return (
		<div
			className={`${className} w-full h-full absolute top-0 left-0 -z-0`}
			style={{
				background: bgCss,
			}}
		/>
	);
}
