import React from "react";
import { ZodError, ZodIssue } from "zod";

interface TextAreaProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  errors: ZodError | null;
}

const TextArea = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  errors,
  ...props
}: TextAreaProps) => {
  return (
		<div className="w-full mb-3">
			<label
				className="block mb-2 text-lg font-medium text-gray-800 font-cormorant tracking-wide"
				htmlFor={id}
			>
				{label}
			</label>
			<textarea
				autoComplete="off"
				id={id}
				name={name}
				rows={5}
				style={{ resize: "none" }}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="w-full placeholder-gray-500 border-gray-500 border-opacity-50 font-cormorant text-lg rounded-md focus:ring-2 focus:ring-gray-600 "
				{...props}
			></textarea>
			{errors &&
			errors.errors.findIndex((error: ZodIssue) => error.path.includes(name)) >
				-1 ? (
				<p className="text-red-500 italic text-sm">
					{errors?.flatten().fieldErrors[name]?.join("")}
				</p>
			) : null}
		</div>
	);
};

export default TextArea;
