import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RichTextEditor from "@/components/RichTextEditor";
import ImageUploadManager from "@/components/ImageUploadManager";
import { newsApi } from "@/lib/api";

interface FormField {
  id: "title" | "event" | "location" | "eventDescription";
  label: string;
  type?: string;
  placeholder?: string;
}

const schema = z.object({
  title: z.string().min(10, "Title is too short").max(200, "Title is too long"),
  event: z
    .string()
    .min(10, "Event name must contain at least 10 characters.")
    .max(200, "Event name is too long"),
  location: z
    .string()
    .min(5, "Location must be at least 5 characters")
    .max(200, "Location is too long"),
  eventDescription: z
    .string()
    .min(50, "Description must be at least 50 characters"),
});

type NewsFormData = z.infer<typeof schema>;

const AddNewsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setFocus,
  } = useForm<NewsFormData>({
    defaultValues: {
      title: "",
      event: "",
      location: "",
      eventDescription: "",
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof NewsFormData;
    if (firstError) {
      setFocus(firstError);
    }
  }, [errors, setFocus]);

  const formFields: FormField[] = [
    {
      id: "title",
      label: "news title",
      type: "text",
      placeholder: "enter a catchy headline",
    },
    {
      id: "event",
      label: "event name",
      type: "text",
      placeholder: "e.g., Annual Tech Conference",
    },
    {
      id: "location",
      label: "location",
      type: "text",
      placeholder: "e.g., City Hall, Downtown",
    },
    {
      id: "eventDescription",
      label: "event description",
    },
  ];

  const onSubmit = async (data: NewsFormData) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      let imageUrls: string[] = [];

      if (uploadedImages.length > 0) {
        const uploadResponse = await newsApi.uploadImages(uploadedImages);
        if (uploadResponse.success && uploadResponse.data) {
          imageUrls = uploadResponse.data;
        }
      }

      const jsonData = {
        title: data.title,
        event: data.event,
        location: data.location,
        details: data.eventDescription,
        published_at: new Date().toISOString(),
        images: imageUrls,
      };

      const response = await newsApi.create(jsonData);

      if (response.success) {
        setSubmitResult({
          success: true,
          message: "News article created successfully!",
        });
        reset();
        setUploadedImages([]);
      } else {
        setSubmitResult({
          success: false,
          message: response.message || "Failed to create news article",
        });
      }
    } catch (error: any) {
      setSubmitResult({
        success: false,
        message: error.message || "An error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-28 px-4 lg:pb-10">
      <div className="mb-6">
        <h1 className="font-semibold text-2xl sm:text-3xl text-green-950">
          Add News
        </h1>
        <p className="text-gray-600">
          Share the latest updates with your community. Fill out the form below
          to create a new news item.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg shadow border p-4 max-w-5xl"
      >
        {formFields.map((field) =>
          field.id === "eventDescription" ? (
            <div key={field.id} className="mb-5">
              <label className="block mb-2 text-md font-semibold text-gray-800">
                {field.label} *
              </label>
              <Controller
                control={control}
                name={field.id}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Write detailed information about the event. This will be displayed as HTML on your main website."
                  />
                )}
              />
              {errors[field.id] && (
                <p className="text-xs text-red-700 sm:text-sm mt-1">
                  {errors[field.id]?.message}
                </p>
              )}
            </div>
          ) : (
            <div key={field.id} className="mb-5">
              <label
                className="block mb-2 capitalize text-md font-semibold text-gray-800"
                htmlFor={field.id}
              >
                {field.label} *
              </label>
              <input
                {...register(field.id as any)}
                className="rounded-md border shadow-sm py-2 px-3 placeholder:text-sm w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                type="text"
                id={field.id}
                placeholder={field.placeholder}
              />
              {errors[field.id as keyof typeof errors] && (
                <p className="text-xs text-red-700 sm:text-sm mt-1">
                  {errors[field.id as keyof typeof errors]?.message}
                </p>
              )}
            </div>
          )
        )}

        <div className="mb-5">
          <label className="block mb-2 capitalize text-md font-semibold text-gray-800">
            Upload Images (Optional)
          </label>
          <ImageUploadManager
            images={uploadedImages}
            onChange={setUploadedImages}
            maxImages={6}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-md bg-green-700 font-semibold hover:bg-green-800 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating..." : "Create News Article"}
        </button>

        {submitResult && (
          <div
            className={`mt-6 p-4 rounded-lg border ${
              submitResult.success
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {submitResult.success && <FaCheck className="text-green-600" />}
              <p
                className={
                  submitResult.success ? "text-green-800" : "text-red-800"
                }
              >
                {submitResult.message}
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddNewsPage;
