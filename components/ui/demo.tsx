import { BorderRotate } from "@/components/ui/animated-gradient-border";
import Loader from "@/components/ui/loader-4";
import RoundedTooltipDemo from "@/components/ui/rounded-tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Star, Zap, Shield, Heart, Download, Play, Settings, User, Mail, Phone } from "lucide-react";

function Default() {
  return (
    <BorderRotate className="w-96 h-65">
    </BorderRotate>
  );
}

function FastAnimation() {
  return (
    <BorderRotate
      animationSpeed={0.8}
      gradientColors={{
        primary: '#7f1d1d',
        secondary: '#dc2626',
        accent: '#f87171'
      }}
      backgroundColor="#410d0dff"
      className="p-6"
    >
      <div className="text-white text-center space-y-4">
        <div className="flex justify-center mb-4">
          <Shield className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Security First</h3>
        <p className="text-gray-300 mb-4">0.5s rotation speed with vivid red theme</p>
        <div className="grid grid-cols-2 gap-3">
          <button className="px-3 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors text-sm">
            <Shield className="w-4 h-4 inline mr-1" />
            Secure
          </button>
          <button className="px-3 py-2 border border-red-400 hover:border-red-300 rounded-lg transition-colors text-sm">
            <Download className="w-4 h-4 inline mr-1" />
            Download
          </button>
        </div>
      </div>
    </BorderRotate>
  );
}

function StopOnHover() {
  return (
    <BorderRotate
      animationMode="stop-rotate-on-hover"
      gradientColors={{
        primary: '#581c87',
        secondary: '#7c3aed',
        accent: '#a855f7'
      }}
      backgroundColor="#271832ff"
      className="p-6"
    >
      <div className="text-white text-center space-y-4">
        <div className="flex justify-center mb-4">
          <User className="w-8 h-8 text-purple-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">User Profile</h3>
        <p className="text-gray-300 mb-4">Animation pauses on hover - purple theme</p>
        <div className="space-y-3">
          <div className="flex gap-2 justify-center">
            <button className="px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors">
              <Mail className="w-4 h-4 inline mr-1" />
              Message
            </button>
            <button className="px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors">
              <Phone className="w-4 h-4 inline mr-1" />
              Call
            </button>
          </div>
          <div className="text-sm text-purple-300">
            Premium Member Since 2024
          </div>
        </div>
      </div>
    </BorderRotate>
  );
}

function LoaderDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-zinc-950 rounded-xl">
      <Loader />
    </div>
  );
}

function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex items-center justify-center p-8 bg-zinc-950 rounded-xl">
        <RoundedTooltipDemo />
      </div>
    </TooltipProvider>
  );
}

export {
  Default,
  FastAnimation,
  StopOnHover,
  LoaderDemo,
  TooltipDemo,
};
