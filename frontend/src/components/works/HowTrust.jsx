import { CiLock, } from "react-icons/ci";
import { FaExclamation } from "react-icons/fa6";

export default function HowTrust() {
  return (
    <section className="bg-linear-to-b from-slate-50 to-white py-28 border-t">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-start">


        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-12">
            Your data & privacy
          </h3>

          <div className="space-y-10">
            <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800 text-2xl">
                    <CiLock/>
                </div>
                <div>
                    <p className="text-lg font-semibold text-gray-900">
                    You control your health data
                    </p>

                    <p className="mt-2 text-gray-600 max-w-md leading-relaxed">
                    We use your symptom description only to generate a response. We never sell your data.
                    </p>
                </div>
            </div>


            <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800 text-2xl">
                    <CiLock/>
                </div>
                <div>
                    <p className="text-lg font-semibold text-gray-900">
                    Secure by design
                    </p>

                    <p className="mt-2 text-gray-600 max-w-md leading-relaxed">
                    All data is encrypted in transit. Our systems are monitored 24/7 to protect your privacy.
                    </p>
                </div>
            </div>


            <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800 text-2xl">
                    <CiLock/>
                </div>
                <div>
                    <p className="text-lg font-semibold text-gray-900">
                    No account required
                    </p>

                    <p className="mt-2 text-gray-600 max-w-md leading-relaxed">
                    Use Healio completely anonymously. Create an account only if you want to save history.
                    </p>
                </div>
            </div>
          </div>
        </div>

        <div>
            <div className="flex ">
                <div className=""><FaExclamation/></div>
                <h3 className="text-3xl font-bold text-gray-900 mb-12">
                    Important limitations
                </h3>
            </div>


          <div className="bg-white rounded-xl border-2 border-gray-200 p-4 space-y-5">
            <LimitItem text="Healio does not provide medical diagnoses." />
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-4 space-y-5 mt-4">
            <LimitItem text="We do not replace professional in-person care." />
          </div>
          
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4 space-y-5 mt-4">
            <LimitItem text="Information may be incomplete; always consult a doctor." />
          </div>

          {/* Emergency alert */}
          <div className="mt-10 bg-red-50 border border-red-200 rounded-2xl p-8">
            <p className="font-semibold text-red-700 mb-3 flex items-center gap-2">
              🚨 In an emergency
            </p>

            <p className="text-sm text-red-600 leading-relaxed">
              If you have severe chest pain, trouble breathing, sudden confusion, or feel something is seriously wrong, contact your local emergency number immediately.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}


/* --------- LEFT TRUST ITEM ---------- */

function TrustItem({ title, desc }) {
  return (
    <div className="flex gap-6 items-start">

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800 text-2xl">
        <CiLock/>
      </div>

      {/* Text */}
      <div>
        <p className="text-lg font-semibold text-gray-900">
          {title}
        </p>

        <p className="mt-2 text-gray-600 max-w-md leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}


/* --------- RIGHT LIMIT ITEM ---------- */

function LimitItem({ text }) {
  return (
    <div className="flex items-center gap-4 text-gray-700">

      <span className="text-xl text-gray-500">✕</span>

      <p className="text-base">{text}</p>
    </div>
  );
}
