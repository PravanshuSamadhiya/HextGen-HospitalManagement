import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
const Navbar = () => {
  const navigate = useNavigate()
  return (
    <header className="w-full border-b bg-[#0B0F19] sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex text-2xl font-bold text-[#3f85a9] gap-2 items-center">
          <img src="/logo.png" className="h-10 w-10 object-contain" />
          HextGen
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-100 hover:text-cyan-300">Home</Link>
          <NavigationMenu className="flex gap-6">
            <NavigationMenuList className="flex gap-6">
              <NavigationMenuItem className="">
                <div className="relative group">
                  <span className="text-gray-100 hover:text-cyan-300 cursor-pointer">Solutions</span>
                  <div className="absolute top-6 left-0 hidden group-hover:block bg-[#0B0F19] border rounded shadow p-2 w-56">
                    <Link to="/solutions/hospital" className="block px-3 py-2  text-white hover:text-cyan-300">Hospital Management</Link>
                    <Link to="/solutions/polyclinic" className="block px-3 py-2 text-white hover:text-cyan-300">Polyclinic</Link>
                    <Link to="/solutions/clinic" className="block px-3 py-2 text-white hover:text-cyan-300">Clinic</Link>
                  </div>
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
            <Button
              onClick={() => navigate('/contact')}
              className="bg-[#3f85a9] text-white px-4 py-2 rounded-lg hover:bg-[#357292]"
            >Get a Demo</Button>
          </NavigationMenu>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="bg-white">
                <Menu className="h-12 w-12" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-[#0B0F19]">
              <div className="flex flex-col gap-4 mt-6">
                <Link to="/" className="text-lg font-medium text-gray-100">Home</Link>
                <div>
                  <p className="text-lg font-medium text-gray-100">Solutions</p>
                  <div className="ml-4 mt-2 space-y-1">
                    <Link to="/solutions/hospital" className="block text-gray-100 hover:text-blue-600">Hospital</Link>
                    <Link to="/solutions/polyclinic" className="block text-gray-100 hover:text-blue-600">Polyclinic</Link>
                    <Link to="/solutions/clinic" className="block text-gray-100 hover:text-blue-600">Clinic</Link>
                  </div>
                </div>
                <Button
                  onClick={() => navigate('/contact')}
                  className="bg-[#3f85a9] text-white px-4 py-2 rounded-lg hover:bg-[#357292]"
                >Get a Demo</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

