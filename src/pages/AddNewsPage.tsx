import MDEditor from '@uiw/react-md-editor';
import { Controller, useForm } from 'react-hook-form';
import { FaFileArrowUp } from 'react-icons/fa6';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

interface FormField {
  id: 'title' | 'event' | 'eventDescription' | 'uploadImages';
  label: string;
  type?: string;
  placeholder?: string;
}

type NewsFormData = z.infer<typeof schema>;

const schema = z.object({
  title: z.string().min(10, 'Title is too short').max(100, 'Title is too long'),
  event: z
    .string()
    .min(10, 'Event name must contain at least 10 characters.')
    .max(30, 'Event name is too long'),
  eventDescription: z
    .string()
    .min(20, 'Description is too short')
    .max(2000, 'Description is too long'),
  uploadImages: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'At least one image is required.')
    .refine(
      (files) => files?.length <= 6,
      'You can upload a maximum of 6 images'
    ),
});

const AddNewsPage = () => {
  const date = new Date();
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
      event: '',
      eventDescription: '',
      uploadImages: undefined,
    },
    resolver: zodResolver(schema),
  });
  const selectedImages = watch('uploadImages') || [];

  const formFields: FormField[] = [
    {
      id: 'title',
      label: 'news title',
      type: 'text',
      placeholder: 'enter a catchy headline',
    },
    {
      id: 'event',
      label: 'event name',
      type: 'text',
      placeholder: 'e.g., Annual Tech Conference',
    },
    {
      id: 'eventDescription',
      label: 'event description',
    },
    {
      id: 'uploadImages',
      label: 'click to upload images',
    },
  ];

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
        onSubmit={handleSubmit((data) => {
          const loggedData = {
            ...data,
            uploadImages: { ...data.uploadImages },
            publishDate: date.toLocaleDateString(navigator.language, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }),
          };
          console.log(loggedData);
          reset();
        })}
        className="rounded-lg shadow border p-4 max-w-3xl"
      >
        {formFields.map((field) =>
          field.id === 'eventDescription' ? (
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
          ) : field.id === 'uploadImages' ? (
            <div key={field.id} className="mb-5">
              <label
                htmlFor="fileUpload"
                className="mb-1 text-md text-gray-800 py-5 px-2 rounded-md border-[1.5px] border-dashed flex flex-col items-center"
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

export default AddNewsPage;
