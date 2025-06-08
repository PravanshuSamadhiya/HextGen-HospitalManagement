import { TabsDemo } from "@/components/TabsDemo";
import { CardBody, CardContainer } from "@/components/ui/3d-card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/moving-border";


const solutions = [
  {
    title: "Multi-Speciality Hospital Management Software",
    points: [
      "AI-powered Pharmacy & Stock Management",
      "Digital Case-Taking & Appointments",
      "Integrated Lab Reports & Revenue Insights",
      "Inpatient Billing & Insurance Management",
      "Role-based Dashboards",
    ],
  },
  {
    title: "Poly Clinic Management Software",
    points: [
      "Digital Case Sheets & Follow-ups",
      "Pharmacy & Lab with AI Insights",
      "Admin, Doctor, Lab & Reception Dashboards",
      "Secure Record Storage",
    ],
  },
  {
    title: "Clinic Management Software",
    points: [
      "Simple Appointment Booking",
      "Pharmacy Stock Tracking",
      "Doctor & Reception Dashboards",
      "Optimized for Solo Practitioners",
    ],
  },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-4 py-16">
      <section className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent"
        >
          Smarter, Faster, and Inclusive Healthcare with AI
        </motion.h1>
        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
          At HextGen, we’re redefining healthcare by integrating AI into hospital management, diagnostics, and rural services to build a more connected and efficient healthcare ecosystem.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button className="text-base px-6 py-2 bg-black border-gray-500 text-white shadow-lg">
            Explore Solutions
          </Button>
          <Button
            onClick={() => navigate("/contact")}
            variant="outline"
            className="text-base px-6 py-2 border-gray-500 text-white"
          >
            Get a Demo
          </Button>
        </div>
      </section >


      <section className="mt-28 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-10 text-cyan-400">Vision & Mission</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Our Vision",
              content: `To revolutionize healthcare by integrating advanced AI and digital solutions — enabling better decision-making, improving patient outcomes, and transforming delivery systems globally.`,
              quote: "A world where healthcare is smarter, faster, and accessible to everyone, everywhere.",
            },
            {
              title: "Our Mission",
              points: [
                "Digital Transformation: Empower clinics, hospitals, and labs with advanced tools.",
                "AI-Driven Insights: Enhance diagnostics and enable predictive healthcare.",
                "Data Integration: Build robust data systems to train and improve AI.",
                "Accessible & Scalable: Ensure adaptability across diverse systems.",
              ],
            },
          ].map((item, i) => (
            <div key={i} className="bg-[#121826] p-6 rounded-2xl shadow-lg border border-[#1F2937] transition-all hover:scale-[1.015]">
              <h3 className="text-xl font-bold mb-2 text-cyan-300">{item.title}</h3>
              {item.content ? (
                <>
                  <p className="text-gray-300">{item.content}</p>
                  <p className="mt-2 italic text-purple-400">“{item.quote}”</p>
                </>
              ) : (
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  {item.points?.map((point, idx) => (
                    <li key={idx}>
                      <span className="font-semibold text-white">{point.split(":")[0]}:</span>
                      {point.split(":")[1]}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>


      <section className="mt-28 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-10 text-cyan-400">Explore More Features</h2>
        <TabsDemo />
      </section>


      <section className="mt-28 max-w-6xl mx-auto py-12">
        <h2 className="text-3xl font-semibold text-center mb-4 text-purple-400">
          Why Choose HextGen?
        </h2>
        <p className="text-center text-gray-300 max-w-3xl mx-auto mb-10">
          Struggling with <strong>operational efficiency</strong>,{' '}
          <strong>patient engagement</strong>, or{' '}
          <strong>staff productivity</strong>?<br />
          It’s time to <strong>streamline your workflow</strong> with{' '}
          <span className="text-cyan-400 font-semibold">HextGen</span> — the
          AI-powered <strong>Hospital Management System</strong> built for
          healthcare professionals.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: '🤖',
              title: 'AI-Powered Automation',
              desc: 'Reduce operational costs and enhance efficiency with smart automation.',
            },
            {
              icon: '✅',
              title: 'User-Friendly Interface',
              desc: 'No steep learning curve—intuitive design for seamless adoption.',
            },
            {
              icon: '🔒',
              title: 'Advanced Security',
              desc: 'Protected with AWS, MongoDB, and Azure for HIPAA-compliant security.',
            },
            {
              icon: '🎧',
              title: '24/7 Dedicated Support',
              desc: 'Personalized onboarding, staff training, and round-the-clock assistance.',
            },
            {
              icon: '💰',
              title: 'Affordable Pricing',
              desc: 'Plans start at just ₹1,200/month—no hidden fees for clinics.',
            },
            {
              icon: '🔗',
              title: 'Powered By Leading Tech',
              desc: (
                <div className="flex flex-col items-center">
                  <div className="flex flex-wrap gap-2 mt-2">
                    <img src="/aws.svg" className="h-8" alt="AWS logo" />
                    <img src="/azure.svg" className="h-8" alt="Azure logo" />
                    <img src="/mongodb.svg" className="h-8" alt="MongoDB logo" />
                    <img src="/sms.svg" className="h-8" alt="SMS logo" />
                    <img src="/whatsapp.svg" className="h-8" alt="WhatsApp logo" />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    AWS, Azure, MongoDB, SMS, WhatsApp integrations
                  </p>
                </div>
              ),
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#121826] border border-[#2A2F45] shadow-lg rounded-xl flex flex-col items-center text-center hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl text-[#3f85a9]">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-bold text-cyan-300">
                {feature.title}
              </h3>
              <div className="mt-2 text-gray-400 text-sm">
                {typeof feature.desc === 'string' ? (
                  feature.desc
                ) : (
                  feature.desc
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mt-28 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10 text-purple-400">Healthcare Management Solutions</h2>
        <div className="grid md:grid-cols-3 gap-30">
          {solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <CardContainer className="inter-var hover:scale-[1.02] transition-transform duration-300">
                <CardBody className="p-6 bg-[#121826] rounded-xl shadow-lg border border-[#2A2F45] text-white">
                  <h3 className="text-xl font-semibold mb-3 text-cyan-300 text-center">{solution.title}</h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    {solution.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </section>
    </div >
  );
};

export default Home;
