export default function AIAssessment() {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">

            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">AI assessment</h3>
                <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">● Live preview</span>
            </div>

            <div className="space-y-4">
                <h4 className="font-semibold text-gray-700">Most likely conditions</h4>

                <ConditionCard
                title="Viral upper respiratory infection"
                percent="45%"
                desc="Based on fever, sore throat, and fatigue over 2–4 days."
                />
                <ConditionCard
                title="Seasonal influenza"
                percent="30%"
                desc="Consider if symptoms appeared suddenly with body aches or chills."
                />
                <ConditionCard
                title="Allergic reaction (mild)"
                percent="15%"
                desc="More likely if symptoms worsen outdoors or around triggers."
                />
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">Red-flag symptoms</h4>
                <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc ml-5">
                <li>Difficulty breathing or chest pain</li>
                <li>Confusion, bluish lips, or severe dizziness</li>
                <li>Fever above 40°C that does not improve</li>
                </ul>
            </div>

            <div>
                <h4 className="font-semibold text-gray-700">Suggested next steps</h4>
                <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc ml-5">
                <li>Monitor symptoms closely for the next 24–48 hours</li>
                <li>Stay hydrated and rest</li>
                <li>Contact a doctor if symptoms worsen</li>
                </ul>
            </div>

            <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm">Download summary</button>
                <button className="px-4 py-2 bg-slate-100 rounded-full text-sm">Copy to clipboard</button>
                <button className="px-4 py-2 bg-slate-100 rounded-full text-sm">Send to email</button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between">
                <p className="text-sm text-gray-600 max-w-sm">
                Not feeling well? It’s always safest to speak with a healthcare professional.
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm">Find nearby care</button>
            </div>
        </div>
);
}

function ConditionCard({ title, percent, desc }) {
    return (
        <div className="border rounded-xl p-4 flex justify-between items-start">
            <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-gray-600 mt-1">{desc}</p>
            </div>
            <span className="text-sm bg-slate-100 px-3 py-1 rounded-full">Likelihood ~{percent}</span>
        </div>
    );
}