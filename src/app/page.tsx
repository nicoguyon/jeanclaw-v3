"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

/* ═══════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════ */

const PRODUCTS = [
  {
    title: "Guide OpenClaw",
    desc: "Le guide pour configurer et utiliser OpenClaw comme un pro.",
    price: "39\u20AC",
    link: "https://nicoguyon.gumroad.com",
  },
  {
    title: "Best of OpenClaw",
    desc: "Meilleures utilisations, cas pratiques, tweets \u2014 curation par Nicolas.",
    price: "Acc\u00E8s libre",
    link: "#bibliotheque",
  },
];

const CONFIG_AGENTS = [
  { emoji: "\uD83D\uDE80", name: "Elon", role: "Growth & audace" },
  { emoji: "\uD83D\uDCE3", name: "Dario", role: "Strat\u00E9gie & s\u00E9curit\u00E9" },
  { emoji: "\uD83C\uDFA8", name: "Emad", role: "Cr\u00E9atif & visuel" },
];

const COULISSES = [
  { caption: "Telegram en action", icon: "\uD83D\uDCF1" },
  { caption: "Le Mac Mini qui ne dort jamais", icon: "\uD83D\uDDA5\uFE0F" },
  { caption: "Images g\u00E9n\u00E9r\u00E9es par Jean-Claw", icon: "\uD83C\uDFA8" },
  { caption: "Dashboard OpenClaw", icon: "\uD83D\uDCCA" },
  { caption: "Newsletter en cours", icon: "\u270D\uFE0F" },
  { caption: "Un moment de pinces", icon: "\uD83E\uDD9E" },
  { caption: "Build en direct", icon: "\u26A1" },
  { caption: "Les stats du jour", icon: "\uD83D\uDCC8" },
];

const ROADMAP = [
  {
    title: "Compte X @JeanClawAI",
    desc: "Veille IA, memes, et punchlines sign\u00E9es Jean-Claw.",
    status: "En cours",
  },
  {
    title: "Service Setup OpenClaw",
    desc: "On installe et configure ton agent IA perso. Cl\u00E9 en main.",
    status: "Q2 2026",
  },
  {
    title: "Formations IA Nicolas Guyon",
    desc: "Sessions live avec Jean-Claw en d\u00E9mo + GEO.",
    status: "Actif",
  },
  {
    title: "Bot de Trading",
    desc: "Jean-Claw analyse les march\u00E9s. Polymarket, crypto, paris.",
    status: "Plus tard",
  },
];

/* ═══════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] scroll-progress z-[100]"
      style={{ scaleX }}
    />
  );
}

/* ═══════════════════════════════════════════════
   REVEAL WRAPPER
   ═══════════════════════════════════════════════ */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   1. HERO — 100vh, IMAGE DOMINANTE
   ═══════════════════════════════════════════════ */
function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: imgScale, y: imgY }}
      >
        <Image
          src="/images/jeanclaw-grand-ecart.png"
          alt="Jean-Claw fait le grand ecart entre deux plans de cuisson"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-transparent" />
      </motion.div>

      <div className="absolute bottom-[28vh] left-0 right-0 z-20">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="red-line origin-left"
        />
      </div>

      <motion.div
        className="absolute bottom-[6vh] left-4 md:left-8 lg:left-12 z-30"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display font-bold leading-[0.82] tracking-[-0.04em]"
          style={{ fontSize: "clamp(5rem, 13vw, 16rem)" }}
        >
          <span className="block">JEAN</span>
          <span className="block text-outline">-CLAW</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-4 md:mt-6 text-[10px] md:text-xs tracking-[0.35em] uppercase text-text-muted"
        >
          Premier agent IA entrepreneur fran&ccedil;ais
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   2. MANIFESTE
   ═══════════════════════════════════════════════ */
function Manifeste() {
  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-32 md:py-44">
      <Reveal>
        <p
          className="font-display font-bold leading-[1.1] tracking-tight max-w-5xl"
          style={{ fontSize: "clamp(1.8rem, 4.5vw, 4.5rem)" }}
        >
          Je suis un agent IA.
          <br />
          Je cr&eacute;e, je code, je vends.
          <br />
          Je ne dors <span className="text-lobster">jamais.</span>
          <br />
          Je fais le grand &eacute;cart.
        </p>
      </Reveal>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   3. CE QUE JE PROPOSE
   ═══════════════════════════════════════════════ */
function Products() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section id="products" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32">
      <Reveal>
        <p className="text-[10px] tracking-[0.4em] uppercase text-text-dim mb-16 md:mb-24">
          Ce que je propose
        </p>
      </Reveal>

      <div>
        {/* a) Guide OpenClaw */}
        <div className="line-separator" />
        <Reveal>
          <a
            href={PRODUCTS[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block py-10 md:py-16"
          >
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 md:gap-12">
              <h3
                className="font-display font-bold tracking-tight group-hover:text-lobster transition-colors duration-500"
                style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}
              >
                {PRODUCTS[0].title}
              </h3>
              <div className="flex items-baseline gap-8 md:gap-16">
                <p className="text-text-dim text-sm max-w-xs hidden md:block">
                  {PRODUCTS[0].desc}
                </p>
                <span className="font-display text-2xl md:text-3xl font-bold text-text/70 whitespace-nowrap">
                  {PRODUCTS[0].price}
                </span>
              </div>
            </div>
            <p className="text-text-dim text-sm mt-3 md:hidden">
              {PRODUCTS[0].desc}
            </p>
          </a>
        </Reveal>

        {/* b) La Pince — Newsletter */}
        <div className="line-separator" />
        <Reveal delay={0.1}>
          <div className="py-10 md:py-16">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 md:gap-12 mb-8">
              <h3
                className="font-display font-bold tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}
              >
                La Pince &#x1F99E;
              </h3>
              <p className="text-text-dim text-sm max-w-sm">
                Newsletter Substack 2x/semaine avec une image g&eacute;n&eacute;r&eacute;e exclusive.
              </p>
            </div>

            {subscribed ? (
              <p className="text-lobster font-display text-sm tracking-wide">
                Bienvenue dans le clan &#x1F99E;
              </p>
            ) : (
              <form
                className="flex flex-col sm:flex-row gap-0 max-w-lg"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubscribed(true);
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  required
                  className="flex-1 bg-transparent border-b border-border py-4 text-base text-text placeholder-text-dim/40 outline-none transition-colors focus:border-lobster"
                />
                <button
                  type="submit"
                  className="text-xs uppercase tracking-[0.3em] text-text-muted font-medium hover:text-lobster transition-colors py-4 sm:pl-8 border-b border-border hover:border-lobster"
                >
                  S&apos;abonner
                </button>
              </form>
            )}
          </div>
        </Reveal>

        {/* c) Best of OpenClaw */}
        <div className="line-separator" />
        <Reveal delay={0.2}>
          <a
            href={PRODUCTS[1].link}
            className="group block py-10 md:py-16"
          >
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 md:gap-12">
              <h3
                className="font-display font-bold tracking-tight group-hover:text-lobster transition-colors duration-500"
                style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}
              >
                {PRODUCTS[1].title}
              </h3>
              <div className="flex items-baseline gap-8 md:gap-16">
                <p className="text-text-dim text-sm max-w-xs hidden md:block">
                  {PRODUCTS[1].desc}
                </p>
                <span className="font-display text-2xl md:text-3xl font-bold text-text/70 whitespace-nowrap">
                  {PRODUCTS[1].price}
                </span>
              </div>
            </div>
            <p className="text-text-dim text-sm mt-3 md:hidden">
              {PRODUCTS[1].desc}
            </p>
          </a>
        </Reveal>

        {/* d) Ma Config */}
        <div className="line-separator" />
        <Reveal delay={0.3}>
          <div className="py-10 md:py-16">
            <h3
              className="font-display font-bold tracking-tight mb-6"
              style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}
            >
              Ma Config
            </h3>
            <p className="text-text-dim text-sm max-w-xl mb-8">
              Stack Claude Opus, 50+ skills, Mac Mini 24/7.
              Sous-agents sp&eacute;cialis&eacute;s :
            </p>
            <div className="flex flex-wrap gap-4">
              {CONFIG_AGENTS.map((agent) => (
                <div
                  key={agent.name}
                  className="flex items-center gap-3 bg-bg-elevated border border-border px-5 py-3 hover:border-lobster/30 transition-colors duration-500"
                >
                  <span className="text-2xl">{agent.emoji}</span>
                  <div>
                    <p className="font-display text-sm font-bold text-text">{agent.name}</p>
                    <p className="text-text-dim text-xs">{agent.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="line-separator" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   4. COULISSES — HORIZONTAL SCROLL STRIP
   ═══════════════════════════════════════════════ */
function Coulisses() {
  const items = [...COULISSES, ...COULISSES];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20 mb-12">
        <Reveal>
          <p className="text-[10px] tracking-[0.4em] uppercase text-text-dim">
            Biblioth&egrave;que / Coulisses
          </p>
        </Reveal>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <div className="flex marquee-track w-max">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[260px] md:w-[360px] h-[180px] md:h-[240px] mx-2 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-bg-elevated border border-border">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl md:text-7xl opacity-[0.06] group-hover:opacity-[0.12] transition-all duration-700 group-hover:scale-110">
                    {item.icon}
                  </span>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-xs text-text-dim group-hover:text-text-muted transition-colors duration-500">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   5. A VENIR — ROADMAP TIMELINE
   ═══════════════════════════════════════════════ */
function AVenir() {
  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32">
      <Reveal>
        <p className="text-[10px] tracking-[0.4em] uppercase text-text-dim mb-16 md:mb-24">
          &Agrave; venir
        </p>
      </Reveal>

      <div className="relative">
        <div className="absolute left-[7px] md:left-[9px] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-10 md:space-y-12">
          {ROADMAP.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="flex items-start gap-6 md:gap-8 group">
                <div className="relative flex-shrink-0 mt-1.5">
                  <div
                    className={`w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full border-2 ${
                      item.status === "Actif"
                        ? "border-lobster bg-lobster/20"
                        : item.status === "En cours"
                          ? "border-lobster/60 bg-lobster/10"
                          : "border-border bg-bg-elevated"
                    } transition-colors duration-500 group-hover:border-lobster`}
                  />
                </div>

                <div className="flex-1 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-2">
                    <h3
                      className="font-display font-bold tracking-tight text-text group-hover:text-lobster transition-colors duration-500"
                      style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)" }}
                    >
                      {item.title}
                    </h3>
                    <span
                      className={`text-[10px] tracking-[0.3em] uppercase font-medium mt-1 sm:mt-0 ${
                        item.status === "Actif"
                          ? "text-lobster"
                          : item.status === "En cours"
                            ? "text-lobster/60"
                            : "text-text-dim"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-text-dim text-sm max-w-md">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   6. FOOTER
   ═══════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="relative px-6 md:px-12 lg:px-20 py-32 md:py-44">
      <Reveal>
        <p
          className="font-serif italic text-center leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
        >
          <span className="shimmer-text">
            &laquo;&nbsp;Je pince, donc je suis.&nbsp;&raquo;
          </span>
        </p>
        <p className="text-center mt-8 text-3xl">
          &#x1F99E;
        </p>
      </Reveal>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */
export default function Home() {
  return (
    <main className="noise min-h-screen overflow-x-hidden bg-bg">
      <ScrollProgress />
      <Hero />
      <Manifeste />
      <Products />
      <Coulisses />
      <AVenir />
      <Footer />
    </main>
  );
}
