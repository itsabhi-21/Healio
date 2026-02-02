export default function SeveritySelector() {
    return (
        <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map(level => (
            <button key={level}
            className={`w-12 h-12 rounded-xl font-semibold ${level === 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-blue-100'}`}>
            {level}
            </button>
            ))}
        </div>
    );
}