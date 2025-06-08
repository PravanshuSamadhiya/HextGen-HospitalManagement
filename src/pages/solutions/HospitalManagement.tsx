import { PharmacyManagement } from "@/components/hospital/PharmacyManagement";
import { AppointmentScheduler } from "@/components/hospital/AppointmentScheduler";
import { LabReports } from "@/components/hospital/LabReports";
import { InpatientManagement } from "@/components/hospital/InpatientManagement";
import { RoleDashboards } from "@/components/hospital/RoleDashboards";
import { motion } from "framer-motion";

const HospitalManagement = () => {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-4 py-16">
      <section className="max-w-6xl mx-auto space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent mb-6"
        >
          Multi-Speciality Hospital Management
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 max-w-2xl mx-auto text-lg"
        >
          AI-powered tools designed to streamline hospital operations—enhancing efficiency, patient care, and staff coordination.
        </motion.p>

        <div className="space-y-12 mt-12">
          <section className="bg-[#121826] p-6 rounded-2xl shadow-lg border border-[#1F2937]">
            <RoleDashboards />
          </section>

          <section className="bg-[#121826] p-6 rounded-2xl shadow-lg border border-[#1F2937]">
            <AppointmentScheduler />
          </section>

          <section className="bg-[#121826] p-6 rounded-2xl shadow-lg border border-[#1F2937]">
            <PharmacyManagement />
          </section>

          <section className="bg-[#121826] p-6 rounded-2xl shadow-lg border border-[#1F2937]">
            <LabReports />
          </section>

          <section className="bg-[#121826] p-6 rounded-2xl shadow-lg border border-[#1F2937]">
            <InpatientManagement />
          </section>
        </div>
      </section>
    </div>
  );
};

export default HospitalManagement;
