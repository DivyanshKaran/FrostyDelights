import { CardsCarousel } from "@/components/ui/CardsCarousel";
import { Hero } from "@/components/ui/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eisfabrik",
  description:
    "Discover a World of Sweet Possibilities with Eisfabrik. Our Ice Cream Parlor Offers a Variety of Flavors and Styles to Delight Every Palate.",
};

export default function Home() {
  return (
    <main className="mx-[5vw]">
      <Hero />
      <CardsCarousel />
    </main>
  );
}
