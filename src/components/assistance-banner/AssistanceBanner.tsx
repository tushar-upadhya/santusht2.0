import React, { memo } from "react";
import DialogForm from "../forms/dialog-form/DialogForm";
import FeedbackForm from "../forms/feedback-form/FeedbackForm";
import RaiseGrievanceForm from "../forms/raise-grievance-form/RaiseGrievanceForm";
import Logo from "../header/logo/Logo";

const DIALOG_PROPS = {
    title: "SANTUSHT",
    description: "Your well-being is our priority.",
    logo: <Logo />,
    location: "All India Institute Of Medical Sciences, Ansari Nagar New Delhi",
    buttonClassName:
        "border border-gray-300 hover:border-[#FA7275] text-green-500 hover:text-[#FA7275] transition-colors duration-300 font-semibold w-full sm:w-fit px-6 py-3 sm:px-14 sm:py-5",
};

const AssistanceBanner: React.FC = () => {
    return (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Heading */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-green-500 capitalize">
                    We are here to assist you
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
                    Urgent Assistance 24x7: Facing an emergency? Reach out for
                    immediate support and expert help. We’re here around the
                    clock to provide the assistance you need in critical
                    situations. Your well-being is our top priority.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                    <DialogForm
                        {...DIALOG_PROPS}
                        formComponent={<RaiseGrievanceForm />}
                        buttonLabel="Raise Grievance"
                    />
                    <DialogForm
                        {...DIALOG_PROPS}
                        formComponent={<FeedbackForm />}
                        buttonLabel="Give Feedback"
                    />
                </div>
            </div>
        </section>
    );
};

export default memo(AssistanceBanner);
