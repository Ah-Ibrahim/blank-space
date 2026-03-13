import Image from "next/image";
import Heading from "./_components/heading";
import HeroButton from "./_components/hero-button";

function LandingPage() {
  return (
    <section>
      <div className="md:w-2/3 flex flex-col items-center space-y-6 mt-30 mx-auto px-4">
        <Heading />
        <p className="text-center font-bold md:text-xl xs:w-sm">
          BlankSpace is the connected workspace where better, faster work
          happens.
        </p>
        <HeroButton />
        <figure className="flex">
          <Image
            src="/hero-light.png"
            alt="Hero Image"
            width={2000}
            height={2000}
            className="w-md dark:hidden"
            loading="eager"
          />
          <Image
            src="/hero-light-2.png"
            alt="Hero Image"
            width={2000}
            height={2000}
            className="w-md dark:hidden"
            loading="eager"
          />
          <Image
            src="/hero-dark.png"
            alt="Hero Image"
            width={2000}
            height={2000}
            className="w-md hidden dark:block"
            loading="eager"
          />
          <Image
            src="/hero-dark-2.png"
            alt="Hero Image"
            width={2000}
            height={2000}
            className="w-md hidden dark:block"
            loading="eager"
          />
        </figure>
      </div>
    </section>
  );
}
export default LandingPage;
