import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RichTextEditor from "@/components/RichTextEditor";
import { newsletterApi, subscribersApi } from "@/lib/api";
import {
  FaPaperPlane,
  FaEye,
  FaEnvelope,
  FaCheck,
  FaTimes,
  FaLayerGroup,
} from "react-icons/fa";
import { emailTemplates, getAllCategories } from "@/data/emailTemplates";

const schema = z.object({
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject is too long"),
  htmlContent: z.string().min(50, "Content must be at least 50 characters"),
  recipientType: z.enum(["all", "test"]),
  testEmail: z.string().email("Invalid email").optional(),
});

type NewsletterFormData = z.infer<typeof schema>;

const SendNewsletterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState<number>(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sendResult, setSendResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    defaultValues: {
      subject: "",
      htmlContent: "",
      recipientType: "test",
      testEmail: "",
    },
    resolver: zodResolver(schema),
  });

  const recipientType = watch("recipientType");
  const htmlContent = watch("htmlContent");
  const subject = watch("subject");

  useState(() => {
    subscribersApi.getCount(true).then((response) => {
      if (response.data) {
        setSubscriberCount(response.data.count);
      }
    });
  });

  const onSubmit = async (data: NewsletterFormData) => {
    if (data.recipientType === "test" && !data.testEmail) {
      alert("Please provide a test email address");
      return;
    }

    if (data.recipientType === "all") {
      const confirm = window.confirm(
        `Are you sure you want to send this newsletter to ${subscriberCount} subscribers? This action cannot be undone.`
      );
      if (!confirm) return;
    }

    setIsSubmitting(true);
    setSendResult(null);

    try {
      const response = await newsletterApi.send({
        subject: data.subject,
        htmlContent: data.htmlContent,
        recipientType: data.recipientType,
        testEmail: data.testEmail,
      });

      if (response.success) {
        setSendResult({
          success: true,
          message:
            data.recipientType === "test"
              ? "Test email sent successfully!"
              : `Newsletter sent to ${
                  response.data?.successfullySent || subscriberCount
                } subscribers!`,
        });
      } else {
        setSendResult({
          success: false,
          message: response.message || "Failed to send newsletter",
        });
      }
    } catch (error: any) {
      setSendResult({
        success: false,
        message: error.message || "An error occurred while sending",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoadTemplate = (templateId: string) => {
    const template = emailTemplates.find((t) => t.id === templateId);
    if (template) {
      setValue("subject", template.subject);
      setValue("htmlContent", template.content);
      setShowTemplates(false);
      setSendResult({
        success: true,
        message: `Template "${template.name}" loaded successfully!`,
      });
      setTimeout(() => setSendResult(null), 3000);
    }
  };

  const categories = ["All", ...getAllCategories()];
  const filteredTemplates =
    selectedCategory === "All"
      ? emailTemplates
      : emailTemplates.filter((t) => t.category === selectedCategory);

  return (
    <div className="pb-28 px-4 lg:pb-10 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="font-semibold text-2xl sm:text-3xl text-green-950 mb-2">
          Send Newsletter
        </h1>
        <p className="text-gray-600">
          Create and send professional newsletters to your subscribers. Current
          subscribers:{" "}
          <span className="font-semibold text-green-700">
            {subscriberCount}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Newsletter Details
          </h2>

          {}
          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-semibold text-gray-800"
              htmlFor="subject"
            >
              Subject Line *
            </label>
            <input
              {...register("subject")}
              type="text"
              id="subject"
              className="rounded-md border shadow-sm py-2 px-3 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter a compelling subject line"
            />
            {errors.subject && (
              <p className="text-xs text-red-700 mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          {}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-semibold text-gray-800">
              Newsletter Content *
            </label>
            <Controller
              name="htmlContent"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value || ""}
                  onChange={field.onChange}
                  placeholder="Write your newsletter content here. Use the toolbar to format your text, add images, links, and more..."
                  height="500px"
                  showImageButton={true}
                />
              )}
            />
            {errors.htmlContent && (
              <p className="text-xs text-red-700 mt-1">
                {errors.htmlContent.message}
              </p>
            )}
          </div>

          {}
          <button
            type="button"
            onClick={() => setShowTemplates(!showTemplates)}
            className="flex items-center gap-2 text-sm text-green-700 hover:text-green-900 font-medium transition-colors"
          >
            <FaLayerGroup />
            {showTemplates ? "Hide Templates" : "Browse Professional Templates"}
          </button>
        </div>

        {}
        {showTemplates && (
          <div className="bg-white rounded-lg shadow border p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Professional Email Templates
              </h2>
              <button
                type="button"
                onClick={() => setShowTemplates(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            {}
            <div className="flex gap-2 mb-6 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-green-700 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => handleLoadTemplate(template.id)}
                >
                  <div className="bg-linear-to-br from-green-50 to-green-100 p-8 text-center border-b border-gray-200 group-hover:from-green-100 group-hover:to-green-200 transition-all">
                    <span className="text-5xl">{template.thumbnail}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                        {template.name}
                      </h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        {template.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Click to load
                      </span>
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaCheck size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No templates found in this category.
              </div>
            )}
          </div>
        )}

        {}
        <div className="bg-white rounded-lg shadow border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recipients
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                {...register("recipientType")}
                type="radio"
                value="test"
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <div>
                <div className="font-medium text-gray-800">Send Test Email</div>
                <div className="text-sm text-gray-600">
                  Send to a test email address first
                </div>
              </div>
            </label>

            {recipientType === "test" && (
              <div className="ml-7">
                <input
                  {...register("testEmail")}
                  type="email"
                  className="rounded-md border shadow-sm py-2 px-3 w-full max-w-md focus:ring-2 focus:ring-green-500"
                  placeholder="test@example.com"
                />
                {errors.testEmail && (
                  <p className="text-xs text-red-700 mt-1">
                    {errors.testEmail.message}
                  </p>
                )}
              </div>
            )}

            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                {...register("recipientType")}
                type="radio"
                value="all"
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <div>
                <div className="font-medium text-gray-800">
                  Send to All Subscribers
                </div>
                <div className="text-sm text-gray-600">
                  Send to {subscriberCount} active subscribers
                </div>
              </div>
            </label>
          </div>
        </div>

        {}
        <div className="flex gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors"
          >
            <FaEye />
            {showPreview ? "Hide Preview" : "Preview Email"}
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 rounded-md bg-green-700 hover:bg-green-800 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane />
            {isSubmitting
              ? "Sending..."
              : recipientType === "test"
              ? "Send Test"
              : "Send Newsletter"}
          </button>
        </div>

        {}
        {sendResult && (
          <div
            className={`p-4 rounded-lg border animate-in fade-in slide-in-from-bottom-4 duration-300 ${
              sendResult.success
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {sendResult.success ? (
                <FaCheck className="text-green-600 shrink-0" />
              ) : (
                <FaEnvelope className="text-red-600 shrink-0" />
              )}
              <p
                className={`${
                  sendResult.success ? "text-green-800" : "text-red-800"
                } font-medium`}
              >
                {sendResult.message}
              </p>
            </div>
          </div>
        )}
      </form>

      {}
      {showPreview && (
        <div className="mt-8 bg-white rounded-lg shadow border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Email Preview
            </h2>
            <span className="text-sm text-gray-500">
              Gmail-optimized layout
            </span>
          </div>
          <div className="border rounded-lg p-4 bg-gray-50 overflow-auto">
            <div
              className="bg-white max-w-2xl mx-auto"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              {}
              <div
                className="bg-green-800 p-8 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
                }}
              >
                <h1 className="text-white text-2xl font-semibold m-0">
                  LPRES Administration
                </h1>
                <p className="text-green-100 text-sm mt-2 mb-0">
                  Local Planning Research and Statistics
                </p>
              </div>

              {}
              {subject && (
                <div className="p-6 border-b bg-gray-50">
                  <p className="text-sm text-gray-600 mb-1">Subject:</p>
                  <p className="font-semibold text-gray-900 m-0">{subject}</p>
                </div>
              )}

              {}
              <div
                className="p-8"
                style={{
                  color: "#333333",
                  lineHeight: "1.6",
                  fontSize: "16px",
                }}
                dangerouslySetInnerHTML={{
                  __html: htmlContent.replace(
                    /<img([^>]*)>/gi,
                    '<img$1 style="display:block;margin:15px auto;max-width:100%;height:auto;">'
                  ),
                }}
              />

              {}
              <div className="bg-gray-100 p-6 text-center text-sm text-gray-600 border-t">
                <p className="my-1">
                  &copy; {new Date().getFullYear()} LPRES Administration. All
                  rights reserved.
                </p>
                <p className="my-1">
                  This is an official communication from the Local Planning
                  Research and Statistics Office.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendNewsletterPage;
