import Image from "next/image";

interface LogoProps {
  className?: string;
}

function Logo({ className }: LogoProps) {
  return (
    <>
      <Image
        src="/notion-icon-light.png"
        alt="BlankSpace Logo"
        width={100}
        height={100}
        className={`dark:hidden ${className}`}
      />
      <div className="bg-foreground">
        <Image
          src="/notion-icon-dark.png"
          alt="BlankSpace Logo"
          width={100}
          height={100}
          className={`hidden dark:block ${className}`}
        />
      </div>
    </>
  );
}
export default Logo;
