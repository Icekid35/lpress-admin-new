import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { complaintsApi } from "@/lib/api";

interface Complaint {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const ComplaintDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      if (!id) return;
      try {
        const response = await complaintsApi.getById(id);
        if (response.success && response.data) {
          setComplaint(response.data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load complaint");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  if (loading) {
    return (
      <div className="px-4 mb-28 lg:mb-3">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="px-4 mb-28 lg:mb-3">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error || "Complaint not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mb-28 lg:mb-3">
      <div className="max-w-sm shadow border rounded-2xl">
        <div className="p-3">
          <h1 className="font-semibold text-2xl text-green-950 mb-2 lg:text-3xl">
            {complaint.subject}
          </h1>
          <p className="text-gray-600">
            <span className="font-semibold">Submitted on:</span>{" "}
            {new Date(complaint.created_at).toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <div className="my-5">
            <h2 className="font-semibold mb-2 text-xl">
              Complaint Description
            </h2>
            <p className="text-gray-800 tracking-wide">{complaint.message}</p>
          </div>
          <div className="py-3 border-t-2">
            <div className="mb-2">
              <h3 className="text-[16px] text-gray-700 font-semibold">Name</h3>
              <p className="text-sm text-gray-700">{complaint.name}</p>
            </div>
            <div>
              <h3 className="text-[16px] text-gray-700 font-semibold">Email</h3>
              <p className="text-sm text-gray-700">{complaint.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsPage;
