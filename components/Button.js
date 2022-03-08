export default function Button ({ label, className, ...rest }) {
  return (
    <button
      {...rest}
      className={`p-2 text-2xl text-black uppercase transition-colors rounded-md bg-primary font-pixel hover:bg-white duration-normal ${className} flex items-center justify-center whitespace-nowrap
`}
    >
      {label}
    </button>
  )
}
