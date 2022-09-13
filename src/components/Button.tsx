import { forwardRef } from "react"

interface ButtonProps {
	variant?: "primary" | "secondary" | "danger"
	children: React.ReactNode
	component: "button" | "a"
	onClick?: () => void
	href?: string
}

const primaryStyle = "bg-blue-500 hover:bg-blue-700"
const secondaryStyle = "bg-green-500 hover:bg-green-700"
const dangerStyle = "bg-red-500 hover:bg-red-700"

const Button = forwardRef<HTMLAnchorElement, ButtonProps>(({ children, href, variant, component, onClick }, ref) => {
	const buttonStyle = `${
		variant === "primary" ? primaryStyle : variant === "secondary" ? secondaryStyle : variant === "danger" ? dangerStyle : primaryStyle
	} text-white font-bold py-2 px-4 rounded flex items-center gap-2`

	return (
		<>
			{component === "button" && (
				<button className={buttonStyle} onClick={onClick}>
					{children}
				</button>
			)}
			{component === "a" && (
				<a className={buttonStyle} onClick={onClick} href={href} ref={ref}>
					{children}
				</a>
			)}
		</>
	)
})

Button.displayName = "Button"

export default Button
