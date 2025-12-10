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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { complaintsApi } from "@/lib/api";

interface Complaint {
  id: string;
  name: string;
  email: string;
  subject: string;
  description: string;
  created_at: string;
}

const UserComplaintsPage = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await complaintsApi.getAll(50, 0);
        if (response.success && response.data) {
          setComplaints(response.data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await complaintsApi.delete(deletingId);
      setComplaints((prev) => prev.filter((c) => c.id !== deletingId));
    } catch (err: any) {
      alert(err.message || "Failed to delete complaint");
    } finally {
      setOpen(false);
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="px-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="mb-6">
        <h1 className="font-semibold text-2xl sm:text-3xl text-green-950">
          User Complaints
        </h1>
        <p className="text-gray-600">
          Review and manage all submitted complaints in one place (
          {complaints.length} total)
        </p>
      </div>
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
            <Button onClick={handleDelete} type="submit" variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>

        {complaints.length === 0 ? (
          <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 text-lg">No complaints yet</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
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
                    <Link to={`/complaints/${complaint.id}`} className="mr-2">
                      <button className="py-2 px-3 rounded-md bg-green-700 hover:bg-green-900 transition-colors text-white cursor-pointer">
                        expand
                      </button>
                    </Link>
                    <DialogTrigger asChild>
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
  );
};

export default UserComplaintsPage;
