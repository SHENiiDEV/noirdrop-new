export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-xs font-semibold text-zinc-300 tracking-wide mb-1.5 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
