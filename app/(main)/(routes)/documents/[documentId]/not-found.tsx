import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function DocumentNotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-6">
      <Image
        src="/404-light.svg"
        alt="Document not found"
        width={350}
        height={350}
        className="dark:hidden"
      />
      <Image
        src="/404-dark.svg"
        alt="Document not found"
        width={350}
        height={350}
        className="hidden dark:block"
      />
      <p className="text-xl">Document not found</p>

      <Button asChild>
        <Link href="/documents">
          Return home <House />
        </Link>
      </Button>
    </div>
  );
}
export default DocumentNotFound;
