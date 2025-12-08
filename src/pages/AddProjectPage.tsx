import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RichTextEditor from "@/components/RichTextEditor";
import ImageUploadManager from "@/components/ImageUploadManager";
import { FaCheck } from "react-icons/fa";
import { projectsApi } from "@/lib/api";

const schema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(200, "Title is too long"),
  location: z
    .string()
    .min(3, "State must be at least 3 characters")
    .max(200, "State is too long"),
  lga: z
    .string()
    .min(3, "LGA must be at least 3 characters")
    .max(200, "LGA is too long"),
  ward: z
    .string()
    .min(3, "Ward must be at least 3 characters")
    .max(200, "Ward is too long"),
  status: z.enum(["in progress", "completed"], {
    message: "Please select a status",
  }),
  description: z.string().min(50, "Description must be at least 50 characters"),
});

type ProjectFormData = z.infer<typeof schema>;

const AddProjectPage = () => {
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
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: "",
      location: "",
      lga: "",
      ward: "",
      status: undefined,
      description: "",
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof ProjectFormData;
    if (firstError) {
      setFocus(firstError);
    }
  }, [errors, setFocus]);

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      let imageUrls: string[] = [];

      if (uploadedImages.length > 0) {
        const uploadResponse = await projectsApi.uploadImages(uploadedImages);
        if (uploadResponse.success && uploadResponse.data) {
          imageUrls = uploadResponse.data;
        }
      }

      const jsonData = {
        title: data.title,
        location: data.location,
        lga: data.lga,
        ward: data.ward,
        status: data.status,
        description: data.description,
        images: imageUrls,
      };

      const response = await projectsApi.create(jsonData);

      if (response.success) {
        setSubmitResult({
          success: true,
          message: "Project created successfully!",
        });
        reset();
        setUploadedImages([]);
      } else {
        setSubmitResult({
          success: false,
          message: response.message || "Failed to create project",
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
          Add Project
        </h1>
        <p className="text-gray-600">
          Create a new project by filling out the form below. Include details,
          status, and location to keep your team informed.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg shadow border p-6 max-w-5xl bg-white"
      >
        {}
        <div className="mb-5">
          <label
            className="block mb-2 text-md font-semibold text-gray-800"
            htmlFor="title"
          >
            Project Title *
          </label>
          <input
            {...register("title")}
            type="text"
            id="title"
            className="rounded-md border shadow-sm py-2 px-3 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter project title"
          />
          {errors.title && (
            <p className="text-xs text-red-700 mt-1">{errors.title.message}</p>
          )}
        </div>

        {}
        <div className="mb-5">
          <label
            className="block mb-2 text-md font-semibold text-gray-800"
            htmlFor="location"
          >
            State *
          </label>
          <input
            {...register("location")}
            type="text"
            id="location"
            className="rounded-md border shadow-sm py-2 px-3 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., Niger State"
          />
          {errors.location && (
            <p className="text-xs text-red-700 mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {}
        <div className="mb-5">
          <label
            className="block mb-2 text-md font-semibold text-gray-800"
            htmlFor="lga"
          >
            Local Government Area (LGA) *
          </label>
          <input
            {...register("lga")}
            type="text"
            id="lga"
            className="rounded-md border shadow-sm py-2 px-3 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., Bosso"
          />
          {errors.lga && (
            <p className="text-xs text-red-700 mt-1">{errors.lga.message}</p>
          )}
        </div>

        {}
        <div className="mb-5">
          <label
            className="block mb-2 text-md font-semibold text-gray-800"
            htmlFor="ward"
          >
            Ward *
          </label>
          <input
            {...register("ward")}
            type="text"
            id="ward"
            className="rounded-md border shadow-sm py-2 px-3 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., Maikunkele"
          />
          {errors.ward && (
            <p className="text-xs text-red-700 mt-1">{errors.ward.message}</p>
          )}
        </div>

        {}
        <div className="mb-5">
          <label className="block mb-2 text-md font-semibold text-gray-800">
            Project Status *
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register("status")}
                type="radio"
                value="in progress"
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">In Progress</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register("status")}
                type="radio"
                value="completed"
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">Completed</span>
            </label>
          </div>
          {errors.status && (
            <p className="text-xs text-red-700 mt-1">{errors.status.message}</p>
          )}
        </div>

        {}
        <div className="mb-5">
          <label className="block mb-2 text-md font-semibold text-gray-800">
            Project Description *
          </label>
          <p className="text-sm text-gray-600 mb-2">
            Write detailed information about the project.
          </p>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <RichTextEditor
                value={field.value || ""}
                onChange={field.onChange}
                placeholder="Describe the project in detail. Use the toolbar to format text, add links, and more..."
              />
            )}
          />
          {errors.description && (
            <p className="text-xs text-red-700 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {}
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
          className="px-6 py-3 rounded-md bg-green-700 font-semibold hover:bg-green-800 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating Project..." : "Create Project"}
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

export default AddProjectPage;
