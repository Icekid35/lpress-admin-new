import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import {
  MdArticle,
  MdConstruction,
  MdEmail,
  MdReportProblem,
} from "react-icons/md";
import { Link } from "react-router";
import { complaintsApi, newsApi, projectsApi, subscribersApi } from "@/lib/api";

interface Complaint {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentComplaints, setRecentComplaints] = useState<Complaint[]>([]);
  const [stats, setStats] = useState({
    subscribers: 0,
    projects: 0,
    news: 0,
    complaints: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [complaintsRes, subscribersCountRes, newsRes, projectsRes] =
          await Promise.all([
            complaintsApi.getAll(5, 0),
            subscribersApi.getCount(true),
            newsApi.getAll(1, 0),
            projectsApi.getAll(undefined, 1, 0),
          ]);

        if (complaintsRes.success && complaintsRes.data) {
          setRecentComplaints(complaintsRes.data);
          setStats((prev) => ({
            ...prev,
            complaints: complaintsRes.count || 0,
          }));
        }

        if (subscribersCountRes.success && subscribersCountRes.count !== undefined) {
          setStats((prev) => ({
            ...prev,
            subscribers: subscribersCountRes.count || 0,
          }));
        }

        if (newsRes.success) {
          setStats((prev) => ({ ...prev, news: newsRes.count || 0 }));
        }

        if (projectsRes.success) {
          setStats((prev) => ({ ...prev, projects: projectsRes.count || 0 }));
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await complaintsApi.delete(deletingId);
      setRecentComplaints((prev) => prev.filter((c) => c.id !== deletingId));
      setStats((prev) => ({ ...prev, complaints: prev.complaints - 1 }));
    } catch (err: any) {
      alert(err.message || "Failed to delete complaint");
    } finally {
      setOpen(false);
      setDeletingId(null);
    }
  };

  const analytics = [
    {
      id: "subscribers",
      header: "Newsletter Subscribers",
      value: stats.subscribers,
      icon: <MdEmail />,
      shade: "bg-green-100/80",
      text: "text-green-800",
      iconColor: "text-green-900",
      path: "#",
    },
    {
      id: "projects",
      header: "Projects in Progress",
      value: stats.projects,
      icon: <MdConstruction />,
      shade: "bg-purple-100",
      text: "text-purple-800",
      iconColor: "text-purple-900",
      path: "/projects",
    },
    {
      id: "news",
      header: "Published News",
      value: stats.news,
      icon: <MdArticle />,
      shade: "bg-indigo-100",
      text: "text-indigo-800",
      iconColor: "text-indigo-900",
      path: "/news",
    },
    {
      id: "complaints",
      header: "User Complaints",
      value: stats.complaints,
      icon: <MdReportProblem />,
      shade: "bg-amber-100",
      text: "text-amber-800",
      iconColor: "text-amber-900",
      path: "/complaints",
    },
  ];

  if (loading) {
    return (
      <div className="px-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="grid mb-10 gap-7 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {analytics.map(
          ({ header, icon, shade, text, iconColor, value, id, path }) => (
            <Link to={path} key={id}>
              <div
                className={`shadow ${shade} p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:transform-[scale(1.05)] transition-transform`}
              >
                <div className="flex flex-col items-center justify-center">
                  <span
                    className={`inline-flex w-14 h-14 text-2xl mb-2 rounded-full justify-center ${iconColor} items-center bg-gray-50/70 backdrop-blur-md`}
                  >
                    {icon}
                  </span>
                  <h2 className={`font-semibold text-lg ${text}`}>{header}</h2>
                </div>
                <p className={`${text} font-semibold text-2xl`}>{value}</p>
              </div>
            </Link>
          )
        )}
      </div>
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-green-900">
          Recent User Complaints
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. The complaint will be permanently
                deleted.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={handleDelete}
                type="submit"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>

          {recentComplaints.length === 0 ? (
            <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-lg mt-4">
              <p className="text-gray-500 text-lg">No complaints yet</p>
            </div>
          ) : (
            <Table>
              <TableCaption>
                Recent complaints.{" "}
                <Link
                  className="text-green-700 hover:underline"
                  to="/complaints"
                >
                  see more
                </Link>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentComplaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">
                      {complaint.name}
                    </TableCell>
                    <TableCell>{complaint.email}</TableCell>
                    <TableCell>{complaint.subject}</TableCell>
                    <TableCell className="text-right">
                      {new Date(complaint.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/complaints/${complaint.id}`} className="mr-1">
                        <button className="py-2 px-3 rounded-md bg-green-700 hover:bg-green-900 transition-colors text-white cursor-pointer">
                          expand
                        </button>
                      </Link>
                      <DialogTrigger>
                        <button
                          onClick={() => setDeletingId(complaint.id)}
                          className="bg-red-700 text-white rounded-md py-2 px-3 hover:bg-red-900 transition-colors cursor-pointer"
                        >
                          Delete complaint
                        </button>
                      </DialogTrigger>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default HomePage;
