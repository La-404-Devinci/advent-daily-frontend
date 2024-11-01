export default function Logo({path, alt, className}) {
  return (
    <div className="flex items-center justify-center overflow-hidden rounded-lg aspect-square ">
      <img src={path} alt={alt} className={`object-cover ${className}`} />
    </div>
  );
}