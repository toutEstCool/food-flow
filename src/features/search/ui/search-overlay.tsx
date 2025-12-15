import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Input } from "@/shared/ui";
import { ChevronRight, Sparkles, Search as SearchIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const POPULAR_QUERIES = [
    "White Toyota Camry", // Keeping user's example style or adapting? User said "like the screenshot". I'll adapt to FoodFlow context to be helpful. 
    // "Пицца пепперони", "Суши филадельфия", "Бургер", "Шаурма"
    // But maybe they want generic? I will use Food items to match the app name "FoodFlow".
    "Пепперони пицца",
    "Калифорния роллы",
    "Том Ям с креветками",
    "Бургер с говядиной",
    "Цезарь с курицей"
];

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
    const [mounted, setMounted] = useState(isOpen);
    const [visible, setVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // State from props pattern: preserve mounted state during open
    if (isOpen && !mounted) {
        setMounted(true);
    }

    // State from props pattern: start exit animation immediately when closed
    if (!isOpen && visible) {
        setVisible(false);
    }

    useEffect(() => {
        if (isOpen) {
            // Slight delay to ensure DOM is ready for transition
            requestAnimationFrame(() => {
                setVisible(true);
            });
            document.body.style.overflow = "hidden";
            // Focus input after transition roughly starts
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            const timer = setTimeout(() => {
                setMounted(false);
                document.body.style.overflow = "";
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <div
            className={cn(
                "fixed inset-0 z-50 flex flex-col bg-background transition-all duration-300 ease-in-out",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )
            }
        >
            {/* Header / Top Bar */}
            <div className="flex items-center gap-3 p-4 border-b border-border/40">
                <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        ref={inputRef}
                        placeholder="Поиск еды..."
                        className="pl-9 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-0 focus-visible:border-transparent focus-visible:shadow-none transition-all rounded-xl h-10"
                    />
                </div>
                <button
                    onClick={onClose}
                    className="text-[15px] font-medium text-primary active:opacity-70 transition-opacity whitespace-nowrap"
                >
                    Отменить
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* AI / Promo Banner */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 active:bg-muted/50 transition-colors cursor-pointer border border-border/40">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-[15px] leading-tight">
                                Food Flow AI
                            </h3>
                            <p className="text-[13px] text-muted-foreground m-0">
                                Помогу выбрать блюдо для вас
                            </p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>

                {/* Popular Queries */}
                <div>
                    <h2 className="text-[19px] font-bold mb-4">
                        Популярные запросы
                    </h2>
                    <ul className="space-y-0">
                        {POPULAR_QUERIES.map((query, index) => (
                            <li key={index}>
                                <button
                                    className="w-full text-left py-3 text-[16px] text-foreground border-b border-border/40 last:border-0 active:opacity-60 transition-opacity"
                                    onClick={() => {
                                        // Handle selection if needed
                                        console.log(query);
                                    }}
                                >
                                    {query}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>,
        document.body
    );
};
