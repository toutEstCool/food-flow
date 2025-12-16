import { SearchOverlay } from "@/features";
import { Img } from "@/shared/ui"
import { SearchIcon } from 'lucide-react';
import { useState } from "react";

export const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    window.Telegram?.WebApp?.ready()


    const user = window.Telegram?.WebApp?.initDataUnsafe?.user


    return (
        <header className="w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[10px]">
                        <Img
                            // src="https://i.pinimg.com/736x/8e/30/7e/8e307e7a0b98d50e1b840484b762922a.jpg"
                            src={user?.photo_url}
                            alt={user?.first_name ? `Фото профиля ${user.first_name}` : "Фото профиля"}
                            loading="eager"
                            decoding="async"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-[15px] font-semibold">{user?.first_name}</h1>
                    </div>
                </div>
                {/* Right side semantic placeholder (e.g., for navigation or actions) */}
                <button
                    type="button"
                    className="relative flex-1 text-left"
                    onClick={() => setIsSearchOpen(true)}
                    aria-label="Поиск еды"
                >
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <SearchIcon className="text-muted-foreground w-4 h-4" />
                    </div>
                    <div
                        className="pl-9 bg-muted/50 border-transparent transition-all rounded-xl h-10 flex items-center text-muted-foreground text-sm select-none"
                    >
                        Поиск еды...
                    </div>
                </button>
                <SearchOverlay
                    isOpen={isSearchOpen}
                    onClose={() => setIsSearchOpen(false)}
                />
            </div>
        </header>
    )
}