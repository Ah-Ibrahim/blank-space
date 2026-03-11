"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { SingleImageDropzone } from "../upload/single-image";
import { useUploader } from "../upload/uploader-provider";

function CoverImageModal() {
  const isOpen = useCoverImage((state) => state.isOpen);
  const onClose = useCoverImage((state) => state.onClose);

  const { uploadFiles, isUploading, fileStates, removeFile } = useUploader();
  const hasPendingFiles = fileStates.some((fs) => fs.status === "PENDING");

  const handleUpload = async () => {
    await uploadFiles();

    const [fileState] = fileStates;

    removeFile(fileState.key);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Cover Image</DialogTitle>
          <DialogDescription>
            Add a cover image to your document to make it more visually
            appealing.
          </DialogDescription>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full h-[300px]"
          dropzoneOptions={{
            maxSize: 1024 * 1024 * 5, // 5MB
          }}
        />
        <Button
          onClick={handleUpload}
          disabled={isUploading || !hasPendingFiles}
        >
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  );
}
export default CoverImageModal;
