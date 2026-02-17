import Image from "next/image";

function Logo({
  variant,
  className,
}: {
  variant: "light" | "dark";
  className: string;
}) {
  const imageSrc: string =
    variant === "dark" ? "/notion-icon-dark.png" : "/notion-icon-light.png";

  return (
    <Image
      src={imageSrc}
      alt="BlankSpace Logo"
      className={className}
      width={100}
      height={100}
    />
  );
}
export default Logo;
