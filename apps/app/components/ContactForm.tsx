import { FormEvent, useEffect, useState } from "react";
import Input from "./Input";
import TextArea from "./Textarea";
import { validate } from "../utils/validate";
import zod, { ZodError } from "zod";
import axios from "axios";
import router from "next/router";
import SubmitLoader from "./SubmitLoader";

const formSchema = zod.object({
	name: zod.string({
		required_error: "Name is required",
	}),
	email: zod
		.string({
			required_error: "Email is required",
		})
		.email("Invalid Email Address"),
	message: zod.string({
		required_error: "Messsage is required",
	}),
	artwork: zod.string().optional(),
});

interface IValues {
	name: string;
	email: string;
	message: string;
	artwork: string;
}
interface IErrors extends Partial<IValues> {}
interface ContactFormProps {
	artworks: Array<{ id: string; name: string; type: string }>;
	preselectedArtwork?: string;
}
export const ContactForm = ({ artworks, preselectedArtwork }: ContactFormProps) => {
	const [values, setValues] = useState<IValues>({
		name: "",
		email: "",
		message: "",
		artwork: preselectedArtwork || "",
	});

	useEffect(() => {
		if(preselectedArtwork){
			setValues((prev) => ({ ...prev, artwork: preselectedArtwork }))
		}
	}, [preselectedArtwork]);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<ZodError | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Make api call to your email endpoint and pass the data in the call to the endpoint
		// using the state values, pass the object as the body of the POST request to the email endpoint
		const result = formSchema.safeParse(values);
		if (!result.success) {
			setErrors(result.error);

			return;
		}

		// Set loading state
		setIsSubmitting(true);

		const emailResponse = await axios.post("/api/hello", {
			...values,
		});
		// Set success page
		console.log(emailResponse);
		// {
		emailResponse && router.push("/emailSuccessPage");
		// }
	};

	const onChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	if (isSubmitting) return <SubmitLoader />;
	return (
		<div className="w-full min-h-screen pt-20">
			<div className="max-w-2xl mx-auto px-8">
				<h2 className="text-6xl font-cormorant font-bold text-gray-800 text-center mb-3">
					Get in Touch
				</h2>
				<p className="text-center text-gray-600 mb-12 font-cormorant text-xl">
					Interested in a piece? Have a question? I'd love to hear from you.
				</p>
				
				<form
					onSubmit={handleSubmit}
					className="bg-white border-8 border-gray-700 p-10 shadow-xl"
				>
					<Input
						errors={errors}
						value={values.name}
						onChange={onChange}
						id="name"
						name="name"
						placeholder="Full Name"
						label="Your Name"
					/>
					<Input
						errors={errors}
						value={values.email}
						onChange={onChange}
						id="email"
						name="email"
						placeholder="Email Address"
						label="Your Email"
					/>
					<div className="w-full mb-6">
						<label 
							htmlFor="artwork" 
							className="block mb-2 text-lg font-medium text-gray-800 font-cormorant tracking-wide"
						>
							Artwork of Interest (Optional)
						</label>
						<select
							id="artwork"
							name="artwork"
							value={values.artwork}
							onChange={onChange}
							className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-50 text-gray-800 font-cormorant focus:outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-700 transition-all"
						>
							<option value="">— Select an artwork (optional) —</option>
							{artworks.map((artwork) => (
								<option key={artwork.id} value={artwork.name}>
									{artwork.name} ({artwork.type})
								</option>
							))}
						</select>
					</div>
					<TextArea
						errors={errors}
						value={values.message}
						onChange={onChange}
						id="message"
						name="message"
						placeholder="Write us a message!"
						label="Message"
					/>

					<button
						className="w-full py-4 mt-8 text-lg font-cormorant font-semibold bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-900 focus:ring-4 focus:ring-gray-400 outline-none transition-all duration-200"
						type="submit"
					>
						Send Message
					</button>
				</form>
			</div>
		</div>
	);
};

export default ContactForm;
