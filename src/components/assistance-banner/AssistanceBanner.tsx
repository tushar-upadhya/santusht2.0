import DialogForm from "../forms/dialog-form/DialogForm";
import FeedbackForm from "../forms/feedback-form/FeedbackForm";
import RaiseGrievanceForm from "../forms/raise-grievance-form/RaiseGrievanceForm";
import Logo from "../header/logo/Logo";

const AssistanceBanner: React.FC = () => {
    return (
        <section className="py-12">
            <div className="container mx-auto text-center px-4">
                <h2 className="text-[min(6vw,1.5rem)] font-bold mb-4 capitalize text-green-500">
                    We are here to assist you
                </h2>
                <p className="text-[min(4vw,1rem)]  max-w-3xl mx-auto mb-6 leading-relaxed">
                    Urgent Assistance 24x7 : Facing an emergency? Reach out for
                    immediate support and expert help. We&#39;re here around the
                    clock to provide the assistance you need in critical
                    situations. Your well-being is our top priority.
                </p>
                <div className="flex flex-col sm:flex-row justify-center  dark:text-gray-300   text-primary items-center gap-4">
                    {/* Raise Grievance  */}
                   
                    <DialogForm
                        title="SANTUSHT"
                        description="Your well-being is our priority."
                        formComponent={<RaiseGrievanceForm />}
                        buttonLabel="Raise Grievance"
                        logo={<Logo />}
                        location="All India Institute Of Medical Sciences, Ansari Nagar New Delhi"
                    />

                    <DialogForm
                        title="SANTUSHT"
                        description="Your well-being is our priority."
                        formComponent={<FeedbackForm />}
                        buttonLabel="Give Feedback"
                        logo={<Logo />}
                        location="All India Institute Of Medical Sciences, Ansari Nagar New Delhi"
                    />
                </div>
            </div>
        </section>
    );
};

export default AssistanceBanner;
