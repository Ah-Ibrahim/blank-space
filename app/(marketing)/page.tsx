import Image from "next/image";
import Heading from "./_components/heading";
import HeroButton from "./_components/hero-button";

function LandingPage() {
  return (
    <section>
      <div className="md:w-2/3 flex flex-col items-center space-y-6 mt-30 mx-auto px-4">
        <Heading />
        <p className="text-center font-bold md:text-xl w-full xs:w-xs  md:w-md">
          BlankSpace is the connected workspace where better, faster work
          happens.
        </p>
        <HeroButton />
        <figure className="flex max-md:flex-col">
          <Image
            src="/hero-light.webp"
            alt="Hero Image"
            width={2000}
            height={2000}
            className="dark:hidden w-2xs xl:w-md"
            loading="eager"
          />
          <Image
            src="/hero-light-2.webp"
            alt="Hero Image"
            width={2000}
            height={2000}
            className="dark:hidden w-2xs xl:w-md"
            loading="eager"
          />
          <Image
            src="/hero-dark.webp"
            alt="Hero Image"
            width={2000}
            height={2000}
            className="hidden dark:block w-2xs xl:w-md"
          />
          <Image
            src="/hero-dark-2.webp"
            alt="Hero Image"
            width={2000}
            height={2000}
            className="hidden dark:block w-2xs xl:w-md"
          />
        </figure>
      </div>
    </section>
  );
}
export default LandingPage;
