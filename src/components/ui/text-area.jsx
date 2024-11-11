export default function TextArea({ register, errors, ...props }) {
    return (
        <div className="flex flex-col items-start w-full">
            <label htmlFor={props.id}>{props.label}</label>
            <textarea
                id={props.id}
                className="w-full py-2 pl-3 pr-8 mt-2 bg-white border border-gray-300 rounded-md focus:border-blue-900 text-gray-950"
                {...register(props.name)}
                placeholder={props.placeholder}
                value={props.value || ""}
                onChange={props.onChange}
            />
            {errors[props.name] && (
                <p role="alert" className="mt-1 text-red-500">
                    {errors[props.name].message}
                </p>
            )}
        </div>
    );
}