import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface VideoProgressFormProps {
    onClose: (submitted?: boolean) => void;
    videoUrl: string;
}

const VideoProgressForm = ({ onClose, videoUrl }: VideoProgressFormProps) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        consent: false
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        consent: ""
    });

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        phone: false,
        consent: false
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    };

    const validateField = (field: string, value: string | boolean) => {
        let error = "";

        switch (field) {
            case "name":
                if (!value || (typeof value === "string" && value.trim().length < 2)) {
                    error = "Name must be at least 2 characters";
                }
                break;
            case "email":
                if (!value) {
                    error = "Email is required";
                } else if (typeof value === "string" && !validateEmail(value)) {
                    error = "Please enter a valid email address";
                }
                break;
            case "phone":
                if (!value) {
                    error = "Phone number is required";
                } else if (typeof value === "string" && !validatePhone(value)) {
                    error = "Please enter a valid phone number (at least 10 digits)";
                }
                break;
            case "consent":
                if (!value) {
                    error = "You must consent to continue";
                }
                break;
        }

        setErrors(prev => ({ ...prev, [field]: error }));
        return error === "";
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field, formData[field as keyof typeof formData]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all fields as touched
        setTouched({
            name: true,
            email: true,
            phone: true,
            consent: true
        });

        // Validate all fields
        const nameValid = validateField("name", formData.name);
        const emailValid = validateField("email", formData.email);
        const phoneValid = validateField("phone", formData.phone);
        const consentValid = validateField("consent", formData.consent);

        if (!nameValid || !emailValid || !phoneValid || !consentValid) {
            toast({
                title: "Error",
                description: "Please fill in all fields correctly",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json",
                },
                mode: "no-cors",
                body: new URLSearchParams({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    consent: formData.consent.toString(),
                    timestamp: new Date().toISOString(),
                    source: "Video Progress Form"
                }).toString(),
            });

            // Store submission status in localStorage
            const storageKey = `video_form_submitted_${btoa(videoUrl)}`;
            localStorage.setItem(storageKey, 'true');

            setIsSubmitted(true);
            setFormData({ name: '', email: '', phone: '', consent: false });

            toast({
                title: "Success!",
                description: "Thank you! You can now continue watching.",
            });

            // Close the modal with submitted flag after a short delay
            setTimeout(() => {
                onClose(true);
            }, 2000);

        } catch (error) {
            console.error("Error submitting form:", error);
            toast({
                title: "Error",
                description: "Failed to submit form. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = formData.name.trim().length >= 2 &&
        validateEmail(formData.email) &&
        validatePhone(formData.phone) &&
        formData.consent;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[10000] p-2">
            <div className="bg-white rounded-xl p-4 max-w-sm w-full mx-2 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={() => onClose(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {!isSubmitted ? (
                    <>
                        <div className="text-center mb-3">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                Continue Watching
                            </h3>
                            <p className="text-xs text-gray-600">
                                Enter your information to unlock the rest of this content
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-2">
                            <div>
                                <Input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    onBlur={() => handleBlur("name")}
                                    placeholder="Full Name *"
                                    className={`text-sm ${touched.name && errors.name ? "border-red-500" : ""}`}
                                />
                                {touched.name && errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    onBlur={() => handleBlur("email")}
                                    placeholder="Email Address *"
                                    className={`text-sm ${touched.email && errors.email ? "border-red-500" : ""}`}
                                />
                                {touched.email && errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <Input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    onBlur={() => handleBlur("phone")}
                                    placeholder="Phone Number *"
                                    className={`text-sm ${touched.phone && errors.phone ? "border-red-500" : ""}`}
                                />
                                {touched.phone && errors.phone && (
                                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                )}
                            </div>

                            <div>
                                <div className="flex items-start space-x-2 pt-1">
                                    <Checkbox
                                        id="consent"
                                        checked={formData.consent}
                                        onCheckedChange={(checked) => {
                                            setFormData({ ...formData, consent: !!checked });
                                            if (touched.consent) {
                                                validateField("consent", !!checked);
                                            }
                                        }}
                                        className="mt-0.5 flex-shrink-0"
                                    />
                                    <Label
                                        htmlFor="consent"
                                        className={`text-xs leading-tight cursor-pointer ${touched.consent && errors.consent ? "text-red-500" : "text-gray-600"
                                            }`}
                                        onClick={() => handleBlur("consent")}
                                    >
                                        I consent to receive SMS and communications about real estate opportunities *
                                    </Label>
                                </div>
                                {touched.consent && errors.consent && (
                                    <p className="text-red-500 text-xs mt-1">{errors.consent}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={!isFormValid || isLoading}
                                className="w-full bg-primary hover:bg-primary/90 text-white py-2 text-sm font-semibold mt-3"
                            >
                                {isLoading ? "Submitting..." : "Continue Watching"}
                            </Button>
                        </form>

                        <p className="text-xs text-gray-500 text-center mt-2">
                            Your information is secure and never shared
                        </p>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Thank You!</h3>
                        <p className="text-sm text-gray-600">
                            Your information has been submitted successfully. You can now continue watching.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoProgressForm;