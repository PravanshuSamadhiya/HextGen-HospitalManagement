import { useState } from "react";

type DemoForm = {
    fullName: string;
    email: string;
    mobile: string;
    hospitalType: string;
    hospitalName: string;
    heardFrom: string;
    preferredDateTime: string;
};

export const GetADemoForm = () => {
    const [form, setForm] = useState<DemoForm>({
        fullName: "",
        email: "",
        mobile: "",
        hospitalType: "",
        hospitalName: "",
        heardFrom: "",
        preferredDateTime: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", form);
        alert("Form submitted!");
    };

    return (
        <div className="min-h-screen w-full bg-[#121826] flex items-center justify-center px-4">
            <div className="max-w-xl w-full bg-[#121826] p-8 shadow-xl rounded-2xl border border-[#2c3346] text-white">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-cyan-400">
                    📅 Get a Demo
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-cyan-300">Full Name</label>
                        <input
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                            className="w-full bg-[#1B2131] border border-[#2c3346] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-cyan-300">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full bg-[#1B2131] border border-[#2c3346] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-cyan-300">Mobile Number</label>
                        <input
                            name="mobile"
                            type="tel"
                            value={form.mobile}
                            onChange={handleChange}
                            placeholder="Enter your mobile number"
                            className="w-full bg-[#1B2131] border border-[#2c3346] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-cyan-300">Hospital Type</label>
                        <select
                            name="hospitalType"
                            value={form.hospitalType}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#1B2131] border border-[#2c3346] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <option value="">Select Hospital Type</option>
                            <option value="Clinic">Clinic</option>
                            <option value="Nursing Home">Nursing Home</option>
                            <option value="Multi-specialty">Multi-specialty</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-cyan-300">Hospital Name</label>
                        <input
                            name="hospitalName"
                            value={form.hospitalName}
                            onChange={handleChange}
                            placeholder="Enter hospital name"
                            className="w-full bg-[#1B2131] border border-[#2c3346] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-cyan-300">How did you hear about us?</label>
                        <select
                            name="heardFrom"
                            value={form.heardFrom}
                            onChange={handleChange}
                            className="w-full bg-[#1B2131] border border-[#2c3346] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <option value="">select an Option</option>
                            <option value="Google">Google</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Referral">Referral</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-cyan-300">Preferred Demo Date & Time</label>
                        <input
                            name="preferredDateTime"
                            type="datetime-local"
                            value={form.preferredDateTime}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#1B2131] border border-[#2c3346] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-md hover:opacity-90 transition font-medium"
                    >
                        Contact HextGen
                    </button>
                </form>
            </div>
        </div>
    );
};
