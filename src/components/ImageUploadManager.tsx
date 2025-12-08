import { useState, useEffect } from "react";
import { FaTimes, FaArrowUp, FaArrowDown, FaSync } from "react-icons/fa";
import { FaFileArrowUp } from "react-icons/fa6";

interface ImageUploadProps {
  images: File[];
  onChange: (images: File[]) => void;
  maxImages?: number;
}

interface ImagePreview {
  file: File;
  url: string;
  uploading: boolean;
  progress: number;
}

const ImageUploadManager = ({
  images,
  onChange,
  maxImages = 6,
}: ImageUploadProps) => {
  const [previews, setPreviews] = useState<ImagePreview[]>([]);

  useEffect(() => {
    if (images.length === 0 && previews.length > 0) {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
      setPreviews([]);
    }
  }, [images.length, previews]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = maxImages - (images.length + previews.length);
    const filesToAdd = files.slice(0, remainingSlots);

    if (filesToAdd.length > 0) {
      const newImages = [...images, ...filesToAdd];
      onChange(newImages);

      const newPreviews = filesToAdd.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        uploading: true,
        progress: 0,
      }));

      setPreviews((prev) => [...prev, ...newPreviews]);

      newPreviews.forEach((_, index) => {
        const startIndex = previews.length + index;
        simulateUpload(startIndex);
      });
    }

    e.target.value = "";
  };

  const simulateUpload = (index: number) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setPreviews((prev) =>
          prev.map((p, i) =>
            i === index ? { ...p, uploading: false, progress: 100 } : p
          )
        );
      } else {
        setPreviews((prev) =>
          prev.map((p, i) => (i === index ? { ...p, progress } : p))
        );
      }
    }, 200);
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    if (previews[index]) {
      URL.revokeObjectURL(previews[index].url);
    }

    onChange(newImages);
    setPreviews(newPreviews);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    const newPreviews = [...previews];

    [newImages[index], newImages[index - 1]] = [
      newImages[index - 1],
      newImages[index],
    ];
    [newPreviews[index], newPreviews[index - 1]] = [
      newPreviews[index - 1],
      newPreviews[index],
    ];

    onChange(newImages);
    setPreviews(newPreviews);
  };

  const handleMoveDown = (index: number) => {
    if (index === images.length - 1) return;
    const newImages = [...images];
    const newPreviews = [...previews];

    [newImages[index], newImages[index + 1]] = [
      newImages[index + 1],
      newImages[index],
    ];
    [newPreviews[index], newPreviews[index + 1]] = [
      newPreviews[index + 1],
      newPreviews[index],
    ];

    onChange(newImages);
    setPreviews(newPreviews);
  };

  const handleReplace = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = file;
    onChange(newImages);

    URL.revokeObjectURL(previews[index].url);
    const newPreviews = [...previews];
    newPreviews[index] = {
      file,
      url: URL.createObjectURL(file),
      uploading: true,
      progress: 0,
    };
    setPreviews(newPreviews);

    simulateUpload(index);

    e.target.value = "";
  };

  return (
    <div>
      {}
      {images.length < maxImages && (
        <label
          htmlFor="imageUpload"
          className="mb-4 text-md text-gray-800 py-5 px-2 rounded-md border-[1.5px] border-dashed flex flex-col items-center cursor-pointer hover:border-green-500 transition-colors"
        >
          <span className="inline-block text-3xl text-green-950 mb-3">
            <FaFileArrowUp />
          </span>
          <div className="text-sm text-center">
            <p className="text-green-800 cursor-pointer hover:underline">
              Click to upload images ({images.length}/{maxImages})
            </p>
            <p className="text-gray-500">
              PNG, JPG, JPEG (Max {maxImages} images)
            </p>
          </div>
          <input
            id="imageUpload"
            className="hidden"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
          />
        </label>
      )}

      {}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative border rounded-lg overflow-hidden shadow-md bg-white"
            >
              <img
                src={preview.url}
                alt={`Preview ${index + 1}`}
                className="w-full h-40 object-cover"
              />

              {}
              {preview.uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-full px-4">
                    <div className="bg-white rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-green-600 h-full transition-all duration-300"
                        style={{ width: `${preview.progress}%` }}
                      />
                    </div>
                    <p className="text-white text-xs text-center mt-2">
                      {Math.round(preview.progress)}%
                    </p>
                  </div>
                </div>
              )}

              {}
              {!preview.uploading && (
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg"
                    title="Remove"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              )}

              {!preview.uploading && (
                <div className="absolute bottom-2 left-2 right-2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="flex-1 p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-xs"
                    title="Move Up"
                  >
                    <FaArrowUp className="mx-auto" size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === images.length - 1}
                    className="flex-1 p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-xs"
                    title="Move Down"
                  >
                    <FaArrowDown className="mx-auto" size={12} />
                  </button>
                  <label className="flex-1 p-1.5 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer shadow-lg text-xs flex items-center justify-center">
                    <FaSync size={12} />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleReplace(index, e)}
                    />
                  </label>
                </div>
              )}

              {}
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploadManager;
