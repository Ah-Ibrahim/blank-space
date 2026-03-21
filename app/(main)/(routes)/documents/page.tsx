import Image from "next/image";
import Welcome from "../../_components/welcome";

function DocumentsPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/empty.svg"
        width={1036}
        height={760}
        alt="Empty page"
        className="dark:hidden w-full md:w-xl"
      />
      <Image
        src="/empty-dark.svg"
        width={1036}
        height={760}
        alt="Empty page dark"
        className="hidden dark:block w-full md:w-xl"
      />
      <Welcome />
    </div>
  );
}
export default DocumentsPage;
