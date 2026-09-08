"use client";

import { useState } from "react";
import IntroExperience from "@/components/intro/IntroExperience";
import CursorGlow from "@/components/CursorGlow";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Cocktails from "@/components/Cocktails";
import Gallery from "@/components/Gallery";
import Nights from "@/components/Nights";
import Testimonials from "@/components/Testimonials";
import Reservation from "@/components/Reservation";
import Spielzeug from "@/components/Spielzeug";
import Footer from "@/components/Footer";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroExperience onFinish={() => setIntroDone(true)} />}
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Cocktails />
        <Gallery />
        <Nights />
        <Testimonials />
        <Reservation />
        <Spielzeug />
      </main>
      <Footer />
    </>
  );
}
