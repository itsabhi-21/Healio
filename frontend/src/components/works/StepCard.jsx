export function StepCard({ number, title, desc, points, active }) {
return (
        <div
        className={`bg-white rounded-2xl p-8 border transition ${
        active
        ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
        : "border-gray-200 hover:shadow-md"
        }`}>
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${active ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"}`}>
                {number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            </div>


            <p className="mt-4 text-gray-600">{desc}</p>

            <ul className="mt-6 space-y-3">
            {points.map((p, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-blue-600">✔</span> {p}
                </li>
            ))}
            </ul>
        </div>
    );
}


export default StepCard;

