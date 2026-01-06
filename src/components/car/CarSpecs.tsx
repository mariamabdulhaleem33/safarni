const Spec = ({ title, value }: { title: string; value: string }) => (
  <div className="rounded-xl border bg-white p-4 text-center">
    <p className="text-xl font-medium text-black">{title}</p>
    <p className="font-medium text-sm">{value}</p>
  </div>
);

const CarSpecs = () => {
  return (
    <div>
      <h3 className="mb-3 font-semibold">Popular Cars</h3>

      <div className="grid grid-cols-3 gap-4">
        <Spec title="Power" value="429 hp @ 6,100 rpm" />
        <Spec title="Max Speed" value="280 km/h" />
        <Spec title="Acceleration" value="4.9 sec 0-60 mph" />
      </div>
    </div>
  );
};

export default CarSpecs;