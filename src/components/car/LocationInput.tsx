
const LocationInput = () => {
  return (
    <div>
      <h3 className="mb-2 font-medium">Location</h3>
      <input
        type="text"
        disabled
        value="200-298 Clipper St San Francisco"
        className="w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm"
      />
    </div>
  );
};

export default LocationInput;