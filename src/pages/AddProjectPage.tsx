import MDEditor from '@uiw/react-md-editor';
import { Controller, useForm } from 'react-hook-form';
import { FaFileArrowUp } from 'react-icons/fa6';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

interface FormField {
  id: 'title' | 'location' | 'description' | 'images' | 'status';
  label: string;
  type?: string;
  placeholder?: string;
  options?: {
    id: string;
    membership: 'status';
    label: string;
  }[];
}

const schema = z.object({
  title: z
    .string()
    .min(10, 'Title is too short.')
    .max(100, 'Title is too long.'),
  location: z
    .string()
    .min(10, 'Event name must contain at least 10 characters.')
    .max(30, 'Event name is too long.'),
  status: z.enum(['in progress', 'completed'], {
    error: 'Please select a status.',
  }),
  description: z
    .string()
    .min(20, 'Description is too short.')
    .max(2000, 'Description is too long.'),
  images: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'At least one image is required.')
    .refine(
      (files) => files?.length <= 6,
      'You can only upload a maximum of 6 images.'
    ),
});
type NewsFormData = z.infer<typeof schema>;

const AddProjectPage = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<NewsFormData>({
    defaultValues: {
      title: '',
      location: '',
      status: undefined,
      description: '',
      images: undefined,
    },
    resolver: zodResolver(schema),
  });
  const selectedImages = watch('images') || [];

  const formFields: FormField[] = [
    {
      id: 'title',
      label: 'project title',
      type: 'text',
      placeholder: 'enter a catchy headline',
    },
    {
      id: 'location',
      label: 'project location',
      type: 'text',
      placeholder: 'e.g., minna, niger state',
    },
    {
      id: 'description',
      label: 'project description',
    },
    {
      id: 'status',
      label: 'project status',
      options: [
        {
          id: 'projectComplete',
          membership: 'status',
          label: 'completed',
        },
        {
          id: 'projectInProgress',
          membership: 'status',
          label: 'in progress',
        },
      ],
    },
    {
      id: 'images',
      label: 'click to upload images',
    },
  ];

  return (
    <div className="pb-28 px-4 lg:pb-10">
      <div className="mb-6">
        <h1 className="font-semibold text-2xl sm:text-3xl text-green-950">
          Add Project
        </h1>
        <p className="text-gray-600">
          Create a new project by filling out the form below. Include details,
          status, location, and images to keep your team informed
        </p>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          const loggedData = {
            ...data,
            uploadImages: { ...data.images },
          };
          console.log(loggedData);
          reset();
        })}
        className="rounded-lg shadow border p-4 max-w-3xl"
      >
        {formFields.map((field) =>
          field.id === 'description' ? (
            <div key={field.id} className="container mb-5">
              <label className="block mb-1 text-md font-semibold text-gray-800">
                {field.label}
              </label>
              <Controller
                control={control}
                name={field.id}
                render={({ field }) => (
                  <MDEditor {...field} className="rounded-full" />
                )}
              />
              {errors[field.id] && (
                <p className="text-xs text-red-700 sm:text-sm">
                  {errors[field.id]?.message}
                </p>
              )}
            </div>
          ) : field.id === 'images' ? (
            <div key={field.id} className="mb-5">
              <label
                htmlFor="fileUpload"
                className="text-md text-gray-800 py-5 px-2 rounded-md border-[1.5px] border-dashed flex flex-col items-center"
              >
                <span className="inline-block text-3xl text-green-950 mb-3">
                  <FaFileArrowUp />
                </span>
                <div className="text-sm text-center">
                  <p className="text-green-800 cursor-pointer hover:underline">
                    {field.label}
                  </p>
                  <p className="text-gray-500">PNG, JPG, JPEG</p>
                </div>
              </label>
              {errors[field.id] && (
                <p className="text-xs text-red-700 sm:text-sm">
                  {errors[field.id]?.message}
                </p>
              )}
              <input
                {...register(field.id)}
                id="fileUpload"
                className="hidden"
                type="file"
                multiple
                accept="image/*"
              />
              {Array.from(selectedImages).length !== 0 && (
                <div className="grid grid-cols-3 gap-2 items-center lg:grid-cols-4 mt-2 shadow p-2 rounded-md">
                  {Array.from(selectedImages).map((image, index) => (
                    <img
                      key={index}
                      className="rounded-lg ring-2 ring-gray-200"
                      src={URL.createObjectURL(image)}
                      alt=""
                    />
                  ))}
                </div>
              )}
            </div>
          ) : field.id === 'status' ? (
            <div className="mb-5" key={field.id}>
              <div className="grid md:grid-cols-2 gap-2">
                {field.options?.map((option) => (
                  <div className="md:mb-none" key={option.id}>
                    <label
                      htmlFor={option.id}
                      className="inline-block w-full p-2 rounded-sm ring-1 ring-gray-400 has-checked:ring-1 has-checked:ring-green-800 transition-all duration-200 has-checked:bg-linear-30 from-green-50/65 to-green-50/50"
                    >
                      <div className="flex items-center">
                        <div className="mr-2 rounded-full flex justify-center items-center w-5 h-5 border-[1.5px] border-gray-400 has-checked:border-green-800 transition-all duration-200">
                          <div className="w-3 h-3 rounded-full bg-gray-200 has-checked:bg-green-800 transition-all duration-200">
                            <input
                              {...register(option.membership)}
                              type="radio"
                              id={option.id}
                              className="hidden"
                              name={option.membership}
                              value={option.label}
                            />
                          </div>
                        </div>
                        <p className="font-semibold text-sm">{option.label}</p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              {errors[field.id] && (
                <p className="text-xs text-red-700 sm:text-sm">
                  {errors[field.id]?.message}
                </p>
              )}
            </div>
          ) : (
            <div key={field.id} className="mb-5">
              <label
                className="block mb-1 capitalize text-md font-semibold text-gray-800"
                htmlFor={field.id}
              >
                {field.label}
              </label>
              <input
                {...register(field.id)}
                className="rounded-sm border shadow py-1 px-3 placeholder:text-sm w-full"
                type="text"
                id={field.id}
                placeholder={field.placeholder}
              />
              {errors[field.id] && (
                <p className="text-xs text-red-700 sm:text-sm">
                  {errors[field.id]?.message}
                </p>
              )}
            </div>
          )
        )}

        <button
          type="submit"
          className="px-2.5 py-1.5 rounded-sm bg-green-700 font-semibold hover:bg-green-900 transition-colors text-white"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default AddProjectPage;
