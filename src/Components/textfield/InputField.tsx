import { ElementType } from "react";
import "./input.css";

const InputField = ({
  label,
  type,
  Icon,
  star,
  readOnly,
  name,
  value,
  onChange,
  error,
  characterLength,
  min,
  disabled = false,
}: {
  label: string;
  type: string;
  Icon?: ElementType;
  star?: boolean;
  readOnly?: boolean;
  name?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  characterLength?: number;
  min?: number;
  disabled?: boolean;
}) => {
  return (
    <div className="pb-3">
      <div className="flex flex-col">
        <label
          htmlFor={label}
          className={`pb-2  ${star ? "starAfter" : ""} font-semibold text-sm`}
        >
          {label}
        </label>
        <div className="relative">
          <input
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            className={`border border-slate-500 py-2 rounded pl-3 w-full focus:outline-[#1d69fa] pr-2.5 dateInput read-only:focus:outline-none`}
            readOnly={readOnly || false}
            min={min}
            disabled={disabled}
          />
          {Icon && <Icon className="top-2.5 right-2.5 absolute" size={22} />}
          {value.length > 0 ? (
            characterLength !== undefined ? (
              value.length < characterLength ? (
                <span className="pt-2 text-red-400">{error}</span>
              ) : null
            ) : null
          ) : error!?.length > 0 ? (
            <span className="pt-2 text-red-400">{error}</span>
          ) : null}
          {error!?.length > 0 ? (
            <span className="pt-2 text-red-400">{error}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default InputField;
