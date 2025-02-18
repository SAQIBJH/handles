"use client";
import { memo, useState } from "react";
const FormField = memo(({ label, type, name, value, onChange, disabled }) => {
    return (
        <div className="grid grid-cols-3 gap-12 items-center mb-6">
            {/* Label */}
            <label className="text-teal-700 font-medium text-start text-lg">{label}:</label>

            {/* Input or Textarea */}
            <div className="col-span-2">
                {type === "textarea" ? (
                    <textarea
                        name={name}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 disabled:bg-gray-200"
                        rows="4"
                    ></textarea>
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 disabled:bg-gray-200"
                    />
                )}
            </div>
        </div>
    );
});


export const ContactForm = memo(({ fields }) => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
    );
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const uniqueKey = Math.floor(100000 + Math.random() * 900000).toString();
        // Transform formData to match required payload structure
        const payload = {
            formslug: "contact-us",
            uniquekey: uniqueKey, // You might want to generate this dynamically
            data : formData
            
        };

        try {
            console.log("Sending payload:", JSON.stringify(payload, null, 2));
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dynamicformsubmission/SaveForm`, {
                method: "POST",
                // mode: "no-cors", // Bypass CORS check
                // headers: {
                //     "Content-Type": "application/json",
                // },
                body: JSON.stringify(payload)
            });
            console.log("Response:", response);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Success:", data);

            // Reset form after submission
            setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));
            alert("Form submitted successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit form: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="lg:p-6 p-2 bg-white shadow-md rounded-md">
            {fields?.map((field, index) => (
                <FormField
                    key={index}
                    label={field.label}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    disabled={loading}
                />
            ))}

            <div className="grid grid-cols-3">
                <div></div>
                <button
                    type="submit"
                    className="px-6 py-2 bg-teal-700 text-white rounded-md col-span-2 flex items-center justify-center disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                            Submitting...
                        </>
                    ) : (
                        "Submit"
                    )}
                </button>
            </div>
        </form>
    );
});