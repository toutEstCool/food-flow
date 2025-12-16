import { CategorySlider } from "@/widgets";
import { CategoryNav } from "@/widgets";
import { PromoBanner } from "@/widgets";

export const HomePage = () => {
    return (
        <main className="">
            <PromoBanner />
            <CategoryNav />
            <CategorySlider />
        </main>
    )
}