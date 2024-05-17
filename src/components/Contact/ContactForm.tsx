import { useForm, type SubmitHandler, type SubmitErrorHandler } from "react-hook-form";
import { FaIcon } from "../UI";
import { useEffect, useRef, useState } from "react";
import { formatPhoneNumber } from "./masks";
import emailjs from "@emailjs/browser";

type Inputs = {
	name: string;
	email: string;
	phone: string;
	subject: string;
	message: string;
};

const emailjsEnv = {
	serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
	templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
	publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export default function ContactForm() {
	// emailjs
	const form = useRef<HTMLFormElement>(null);
	function sendEmail() {
		if (form.current) {
			emailjs.sendForm(
				emailjsEnv.serviceId,
				emailjsEnv.templateId,
				form.current,
				{ publicKey: emailjsEnv.publicKey },
			);
		}
	}

	// react-hook-form
	const [invalidField, setInvalidField] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		formState: { isValid },
		watch,
		setValue,
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = () => {
		sendEmail();
		setInvalidField(null);
		form.current?.reset();
		alert("Mensagem enviada com sucesso!");
	};

	const onError: SubmitErrorHandler<Inputs> = (errors) => {
		if (errors.name) {
			setInvalidField("name");
		} else if (errors.email) {
			setInvalidField("email");
		} else if (errors.phone) {
			setInvalidField("phone");
		} else if (errors.subject) {
			setInvalidField("subject");
		} else {
			setInvalidField(null);
		}
		console.log(invalidField);
	};

	// console.log(
	//   errors.email,
	//   errors.name,
	//   errors.phone,
	//   errors.subject,
	//   errors.message
	// );

	// phone mask
	const phoneValue = watch("phone");
	useEffect(() => {
		setValue("phone", formatPhoneNumber(phoneValue));
	}, [phoneValue, setValue]);

	// style
	const inputContainer = "flex flex-col gap-1";
	// return
	return (
		<form
			onSubmit={handleSubmit(onSubmit, onError)}
			className="text-white flex flex-col gap-5 items-center"
			ref={form}
		>
			<ul className="w-full grid grid-cols-4 grid-flow-row gap-x-10 gap-y-4 max-lg:flex flex-col">
				<div className={`${inputContainer} col-span-2`}>
					<label htmlFor="name">
						Nome
						{invalidField === "name" && (
							<span className="text-red-500 font-semibold">*</span>
						)}
					</label>
					<input
						{...register("name", {
							required: "*",
							pattern: /^[a-zA-Z ]+$/i,
							maxLength: 50,
							minLength: 3,
						})}
						className="rounded-full py-[2px] pl-2 text-black outline-none focus:border-synth-green1 border-2 border-synth-neutral3"
						type="text"
						placeholder="Thomas A. Anderson"
					/>
				</div>
				<div className={`${inputContainer} col-span-2`}>
					<label htmlFor="email">
						Email
						{invalidField === "email" && (
							<span className="text-red-500 font-semibold">*</span>
						)}
					</label>
					<input
						{...register("email", {
							required: "*",
							pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
						})}
						type="email"
						className="rounded-full py-[2px] pl-2 text-black outline-none focus:border-synth-green1 border-2 border-synth-neutral3"
						placeholder="seumelhor@email.com"
					/>
				</div>
				<div className={`${inputContainer}`}>
					<label htmlFor="phone">
						Telefone
						{invalidField === "phone" && (
							<span className="text-red-500 font-semibold">*</span>
						)}
					</label>
					<input
						{...register("phone", { required: "*" })}
						className="rounded-full py-[2px] pl-2 text-black outline-none focus:border-synth-green1 border-2 border-synth-neutral3"
						placeholder="(00) 00000-0000"
						type="tel"
					/>
				</div>
				<div className={`${inputContainer} col-span-3`}>
					<label htmlFor="subject">
						Assunto
						{invalidField === "subject" && (
							<span className="text-red-500 font-semibold">*</span>
						)}
					</label>
					<input
						{...register("subject", {
							required: "*",
							maxLength: 50,
							minLength: 5,
						})}
						className="rounded-full py-[2px] pl-2 text-black outline-none focus:border-synth-green1 border-2 border-synth-neutral3"
						placeholder="Contato sobre..."
					/>
				</div>
				<div className={`${inputContainer} col-span-4`}>
					<label htmlFor="message">Mensagem</label>
					<textarea
						{...register("message")}
						className="resize-vertical min-h-20 rounded-2xl py-[2px] pl-2 text-black outline-none focus:border-synth-green1 border-2 border-synth-neutral3"
						placeholder="Gostaria de saber mais sobre..."
					/>
				</div>
			</ul>
			<button
				type="submit"
				className={`text-black ${
					isValid
						? "bg-synth-green1 border-2 border-synth-green1"
						: "bg-synth-neutral3 border-2 border-synth-neutral4"
				} rounded-full py-1 text-lg w-fit px-10 flex gap-2 items-center`}
				// disabled={!isValid}
			>
				<span>{"Enviar"}</span>
				<FaIcon name="paper-plane" style="solid" />
			</button>
		</form>
	);
}
