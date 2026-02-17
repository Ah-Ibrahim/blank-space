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
        <figure>
          <Image
            src="/hero-image.jpg"
            alt="Hero Image"
            width={1500}
            height={600}
          />
        </figure>
      </div>
    </section>
  );
}
export default LandingPage;
