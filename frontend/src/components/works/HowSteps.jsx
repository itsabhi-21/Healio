import StepCard from "./StepCard";


export function HowSteps() {
    return (
        <section className="pb-28">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">


                <StepCard
                number="1"
                title="Describe your symptoms"
                active
                points={[
                "Mention where it hurts or feels wrong",
                "Include when it started",
                "Add context like travel or medication",
                ]}
                desc="Tell us how you're feeling in your own words. Be as specific as possible about timing, location, and severity."
                />


                <StepCard
                number="2"
                title="AI Analysis"
                points={[
                "See possible conditions and likelihoods",
                "Identifies red-flag warning signs",
                "Simple explanations for each result",
                ]}
                desc="Healio compares your input against clinical patterns and medical literature to identify potential matches."
                />


                <StepCard
                number="3"
                title="Get Guidance"
                points={[
                "Actionable triage advice",
                "Downloadable summary for your doctor",
                "Educational resources",
                ]}
                desc="Receive clear next steps on whether to self-care, see a doctor, or seek urgent help based on your results."
                />


            </div>
        </section>
    );
}


export default HowSteps;