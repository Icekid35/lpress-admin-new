import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { Link } from 'react-router';

const complaints = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Broken project link',
    date: '2025-11-29',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Unable to login',
    date: '2025-11-28',
  },
  {
    id: 3,
    name: 'Mary Smith',
    email: 'mary@example.com',
    subject: 'Unable to login',
    date: '2025-11-26',
  },
];

const UserComplaintsPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-4">
      <div className="mb-6">
        <h1 className="font-semibold text-2xl sm:text-3xl text-green-950">
          User Complaints
        </h1>
        <p className="text-gray-600">
          Review and manage all submitted complaints in one place.
        </p>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The record will be permanently
              deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                setOpen(false);
              }}
              type="submit"
              variant="destructive"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>

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
            {complaints.map(({ name, id, subject, date, email }) => (
              <TableRow key={id}>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{subject}</TableCell>
                <TableCell className="text-right">{date}</TableCell>
                <TableCell className="text-right">
                  <Link to={`/complaints/${id}`} className="mr-2">
                    <button className="py-2 px-3 rounded-md bg-green-700 hover:bg-green-900 transition-colors text-white cursor-pointer">
                      expand
                    </button>
                  </Link>
                  <DialogTrigger asChild>
                    <button className="bg-red-700 text-white rounded-md py-2 px-3 hover:bg-red-900 transition-colors cursor-pointer">
                      Delete complaint
                    </button>
                  </DialogTrigger>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Dialog>
    </div>
  );
};

export default UserComplaintsPage;
