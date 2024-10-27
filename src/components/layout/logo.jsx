export default function Logo({path, alt}) {
  return (
    <div className="flex items-center justify-center overflow-hidden rounded-lg aspect-square ">
      <img src={path} alt={alt} className="object-cover w-40 h-40" />
    </div>
  );
}