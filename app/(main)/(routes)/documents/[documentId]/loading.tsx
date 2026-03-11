import Spinner from "@/components/ui/spinner";

function Loading() {
  return (
    <div className="h-full w-full grid place-content-center">
      <Spinner size={"icon"} />
    </div>
  );
}
export default Loading;
