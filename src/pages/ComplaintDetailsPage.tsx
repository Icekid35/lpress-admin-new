import { useNavigate } from 'react-router';

const complaint = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Broken project link',
  date: 'Sunday, Nov 30, 2025',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo alias beatae delectus, commodi repellendus blanditiis porro sunt quibusdam aperiam eos? Sunt quis asperiores placeat soluta eveniet nostrum vel saepe officia odit dolore tenetur sed, alias, veniam nihil recusandae obcaecati quas nisi nemo ducimus vitae molestiae praesentium. Delectus, debitis? Fugit, magnam.',
};

const ComplaintDetailsPage = () => {
  return (
    <div className="px-4 mb-28 lg:mb-3">
      <div className="max-w-sm shadow border rounded-2xl">
        <div className="p-3">
          <h1 className="font-semibold text-2xl text-green-950 mb-2 lg:text-3xl">
            {complaint.subject}
          </h1>
          <p className="text-gray-600">
            <span className="font-semibold">Submitted on:</span>{' '}
            {complaint.date}
          </p>
          <div className="my-5">
            <h2 className="font-semibold mb-2 text-xl">
              Complaint Description
            </h2>
            <p className="text-gray-800 tracking-wide">
              {complaint.description}
            </p>
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
