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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import {
  MdArticle,
  MdConstruction,
  MdEmail,
  MdReportProblem,
} from 'react-icons/md';
import { Link } from 'react-router';

const HomePage = () => {
  const [open, setOpen] = useState(false);

  const analytics = [
    {
      id: 'subscribers',
      header: 'Newsletter Subscribers',
      value: 0,
      icon: <MdEmail />,
      shade: 'bg-green-100/80',
      text: 'text-green-800',
      iconColor: 'text-green-900',
    },
    {
      id: 'projects',
      header: 'Projects in Progress',
      value: 0,
      icon: <MdConstruction />,
      shade: 'bg-purple-100',
      text: 'text-purple-800',
      iconColor: 'text-purple-900',
    },
    {
      id: 'news',
      header: 'Published News',
      value: 0,
      icon: <MdArticle />,
      shade: 'bg-indigo-100',
      text: 'text-indigo-800',
      iconColor: 'text-indigo-900',
    },
    {
      id: 'complaints',
      header: 'User Complaints',
      value: 0,
      icon: <MdReportProblem />,
      shade: 'bg-amber-100',
      text: 'text-amber-800',
      iconColor: 'text-amber-900',
    },
  ];

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
  ];

  return (
    <div className="px-4">
      <div className="grid mb-10 gap-7 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {analytics.map(
          ({ header, icon, shade, text, iconColor, value, id }) => (
            <div
              key={id}
              className={`shadow ${shade} p-3 rounded-xl flex flex-col items-center justify-center`}
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
          )
        )}
      </div>
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-green-900">
          User Complaints
        </h2>
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
                variant="destructive"
                onClick={() => {
                  setOpen(false);
                }}
                type="submit"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>

          <Table>
            <TableCaption>
              Recent complaints.{' '}
              <Link className="text-green-700 hover:underline" to="/complaints">
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
              {complaints.map(({ name, id, subject, date, email }) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{subject}</TableCell>
                  <TableCell className="text-right">{date}</TableCell>
                  <TableCell className="text-right">
                    <Link to={`/complaints/${id}`} className="mr-1">
                      <button className="py-2 px-3 rounded-md bg-green-700 hover:bg-green-900 transition-colors text-white cursor-pointer">
                        expand
                      </button>
                    </Link>
                    <DialogTrigger>
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
    </div>
  );
};

export default HomePage;
