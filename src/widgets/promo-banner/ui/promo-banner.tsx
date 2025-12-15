import { Img } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface PromoBannerProps {
    title?: string;
    description?: string;
    imageUrl?: string;
    className?: string;
    onClick?: () => void;
}

export const PromoBanner = ({
    title = "Предложение для вас",
    description = "Поможем выбрать еду для вас", // Adapted to FoodFlow context
    imageUrl = "https://i.pinimg.com/1200x/80/6c/a3/806ca3ed15a477b86e8f159ff5a281d5.jpg", // A nice food image or the car one if strictly following visual? I will use a placeholder car/dark image to match the visual "vibe" initially or a food one. Let's use a high quality dark food image to match the "FoodFlow" theme but keep the UI structure exact.
    className,
    onClick
}: PromoBannerProps) => {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-[10px] bg-[#1c1c1e] cursor-pointer active:scale-98 transition-transform",
                className
            )}
            onClick={onClick}
        >
            <div className="flex justify-between items-center">
                <div className="flex-1 min-w-0">
                    <h2 className="text-[16px] font-bold text-white leading-tight border-0">
                        {title}
                    </h2>
                    <p className="text-[12px] text-zinc-400 leading-snug m-0">
                        {description}
                    </p>
                </div>

                <div className="w-[100px] h-full shrink-0 rounded-[10px] overflow-hidden">
                    <Img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
};
