import nigerStateSeal from '../assets/niger-state-seal.jpg';

const MobileTopbar = () => {
  return (
    <div className="p-2 bg-white/65 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between">
        <img
          className="w-10 object-cover h-10 rounded-full"
          src={nigerStateSeal}
          alt="Niger State Seal"
        />
        <p className="font-semibold text-lg">
          <span className="text-white bg-green-700 rounded-md p-1">NG</span>
          -LPRES
        </p>
      </div>
    </div>
  );
};

export default MobileTopbar;
