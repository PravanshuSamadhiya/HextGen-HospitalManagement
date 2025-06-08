import FollowUpModal from "@/components/polyclinic/FollowUpModal";
import LabReportModal from "@/components/polyclinic/LabReportModal";
import { motion } from "framer-motion";

const PolyClinic = () => {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-4 py-16">
      <section className="max-w-6xl mx-auto space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent mb-6"
        >
          Poly Clinic Dashboard
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 max-w-2xl mx-auto text-lg"
        >
          Manage follow-up reminders and lab reports efficiently with streamlined, role-specific tools.
        </motion.p>

        <div className="space-y-12 mt-12">
          <section className="bg-[#121826] p-6 rounded-2xl shadow-lg border border-[#1F2937]">
            <FollowUpModal />
          </section>

          <section className="bg-[#121826] p-6 rounded-2xl shadow-lg border border-[#1F2937]">
            <LabReportModal />
          </section>
        </div>
      </section>
    </div>
  );
};

export default PolyClinic;



