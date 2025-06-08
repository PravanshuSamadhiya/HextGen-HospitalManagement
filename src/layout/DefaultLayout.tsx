import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer/>
    </>
  );
};

export default DefaultLayout;