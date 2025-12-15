import { SearchOverlay } from "@/features";
import { Img } from "@/shared/ui"
import { Search } from 'lucide-react';
import { useState } from "react";

export const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <header className="w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[10px]">
                        <Img
                            src="https://i.pinimg.com/736x/8e/30/7e/8e307e7a0b98d50e1b840484b762922a.jpg"
                            alt="Apollo Kratos restaurant logo"
                            loading="eager"
                            decoding="async"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-[15px] font-semibold">Apollo Kratos</h1>
                    </div>
                </div>
                {/* Right side semantic placeholder (e.g., for navigation or actions) */}
                <div>
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="p-2 -mr-2 text-foreground active:opacity-60 transition-opacity"
                        aria-label="Open search"
                    >
                        <Search width={21} height={21} strokeWidth={2} />
                    </button>
                    <SearchOverlay
                        isOpen={isSearchOpen}
                        onClose={() => setIsSearchOpen(false)}
                    />
                </div>
            </div>
        </header>
    )
}