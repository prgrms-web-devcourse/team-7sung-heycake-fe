import { useState } from 'react';

type FileWithPreview = File & {
  preview: string;
};

type ImageUploadReturn = {
  previewUrls: string[];
  files: File[];
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetImages: () => void;
};

const useImageUpload = (maxFileLength = 3): ImageUploadReturn => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const dragEvent = { ...event };
    dragEvent.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const newFiles: FileWithPreview[] = Array.from(
      event.dataTransfer.files
    ).map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    if (files.length + newFiles.length > maxFileLength) {
      const numFilesToKeep = maxFileLength - files.length;
      setFiles((prevState) => [
        ...prevState,
        ...newFiles.slice(0, numFilesToKeep),
      ]);
      setPreviewUrls((prevState) => [
        ...prevState,
        ...newFiles.slice(0, numFilesToKeep).map((file) => file.preview),
      ]);
    } else {
      setFiles((prevState) => [...prevState, ...newFiles]);
      setPreviewUrls((prevState) => [
        ...prevState,
        ...newFiles.map((file) => file.preview),
      ]);
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFiles: FileWithPreview[] = Array.from(
      event.target.files as FileList
    ).map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    if (files.length + newFiles.length > maxFileLength) {
      const numFilesToKeep = maxFileLength - files.length;
      setFiles((prevState) => [
        ...prevState,
        ...newFiles.slice(0, numFilesToKeep),
      ]);
      setPreviewUrls((prevState) => [
        ...prevState,
        ...newFiles.slice(0, numFilesToKeep).map((file) => file.preview),
      ]);
    } else {
      setFiles((prevState) => [...prevState, ...newFiles]);
      setPreviewUrls((prevState) => [
        ...prevState,
        ...newFiles.map((file) => file.preview),
      ]);
    }
  };

  const resetImages = () => {
    setPreviewUrls([]);
    setFiles([]);
  };

  return {
    previewUrls,
    files,
    handleDragOver,
    handleDrop,
    handleFileInputChange,
    resetImages,
  };
};

export default useImageUpload;
