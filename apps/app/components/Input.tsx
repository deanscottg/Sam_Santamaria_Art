import React from "react";
import { ZodError, ZodIssue } from "zod";

interface InputProps {
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

const Input = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  errors,
  ...props
}: InputProps) => {
  return (
		<div className="w-full mb-3">
			<label
				className="block mb-2 text-lg font-medium text-gray-800 font-cormorant tracking-wide"
				htmlFor={id}
			>
				{label}
			</label>
			<input
				value={value}
				onChange={onChange}
				autoComplete="off"
				type="text"
				id={id}
				name={name}
				placeholder={placeholder}
				className=" font-cormorant w-full placeholder-gray-500 border-gray-500 border-opacity-50 rounded-md focus:ring-2 focus:ring-gray-600 "
				{...props}
			/>
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

export default Input;
