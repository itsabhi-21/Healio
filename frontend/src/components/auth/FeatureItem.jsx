export default function FeatureItem({ title, desc }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-lg">
        🔒
      </div>

      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600 mt-1 max-w-sm">{desc}</p>
      </div>
    </div>
  );
}