import { useState } from "react";
import { Link } from "react-router-dom";
import DesktopBar from "./DesktopBar";
import MobileBar from "./MobileBar";

export default function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                S
              </span>
            </div>
            <span className="font-bold text-xl text-foreground">
              Snap Store
            </span>
          </Link>

          <DesktopBar />

          <MobileBar />
        </div>
      </div>
    </header>
  );
}
