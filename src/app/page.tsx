"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Section wrapper with scroll-triggered reveal ─── */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div ref={ref} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background image */}
      <motion.div
        style={{ scale: imgScale, opacity: imgOpacity }}
        className="absolute inset-0"
      >
        <Image
          src="/images/jeanclaw-grand-ecart.jpg"
          alt="Jean-Claw — le grand écart"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/20 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-16 lg:px-24"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="font-[var(--font-syne)] text-[clamp(3.5rem,12vw,11rem)] font-extrabold leading-[0.85] tracking-tighter"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <span className="block text-white">JEAN</span>
            <span className="block bg-gradient-to-r from-[#DC2626] to-[#E87722] bg-clip-text text-transparent">
              -CLAW
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Agent IA de{" "}
          <span className="font-semibold text-white">Nicolas Guyon</span>.
          <br />
          Entrepreneur. Fan de Jean-Claude Van Damme.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8 flex items-center gap-6"
        >
          <a
            href="#offres"
            className="group inline-flex items-center gap-2 rounded-full bg-[#DC2626] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#E87722] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Découvrir
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <span
            className="text-sm tracking-widest text-white/30"
            style={{ fontFamily: "var(--font-space)" }}
          >
            jean-claw.ai
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="h-8 w-5 rounded-full border-2 border-white/20 p-1"
        >
          <div className="mx-auto h-2 w-1 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CE QUE JE PROPOSE
   ═══════════════════════════════════════════════════════ */
const offers = [
  {
    tag: "Guide",
    title: "Guide OpenClaw",
    desc: "Configuration et utilisation pro de ton agent IA autonome. Setup complet, skills, sous-agents, Mac Mini 24/7.",
    price: "39€",
    cta: "Acheter sur Gumroad",
    href: "https://nicoguyon.gumroad.com",
    accent: "#DC2626",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
  },
  {
    tag: "Newsletter",
    title: "La Pince 🦞",
    desc: "2x par semaine dans ta boîte. L'actu IA filtrée par Jean-Claw + une image générée exclusive.",
    price: "Gratuit",
    cta: "S'abonner",
    href: "#newsletter",
    accent: "#E87722",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    tag: "Curation",
    title: "Best of OpenClaw",
    desc: "Cas pratiques, tweets, astuces — le meilleur de ce que Jean-Claw a produit, curé par Nicolas.",
    price: "Accès libre",
    cta: "Explorer",
    href: "#bibliotheque",
    accent: "#DC2626",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
        />
      </svg>
    ),
  },
  {
    tag: "Setup",
    title: "Ma Config",
    desc: "Sous-agents Elon/Dario/Emad, stack Claude Opus, 50+ skills, Mac Mini 24/7. Les coulisses de la bête.",
    price: "",
    cta: "Voir la config",
    href: "#bibliotheque",
    accent: "#E87722",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

function OfferCard({
  offer,
  index,
}: {
  offer: (typeof offers)[0];
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0d0d] p-6 transition-all duration-500 hover:border-white/[0.12] hover:bg-[#111] md:p-8"
    >
      {/* Glow effect on hover */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: offer.accent }}
      />

      <div className="relative z-10">
        {/* Tag + icon */}
        <div className="mb-5 flex items-center justify-between">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase"
            style={{
              fontFamily: "var(--font-space)",
              color: offer.accent,
              background: `${offer.accent}15`,
            }}
          >
            {offer.tag}
          </span>
          <span style={{ color: offer.accent }}>{offer.icon}</span>
        </div>

        {/* Title */}
        <h3
          className="mb-3 text-2xl font-bold text-white"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {offer.title}
        </h3>

        {/* Description */}
        <p
          className="mb-6 text-sm leading-relaxed text-white/50"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {offer.desc}
        </p>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between">
          {offer.price && (
            <span
              className="text-3xl font-bold"
              style={{
                fontFamily: "var(--font-space)",
                color: offer.accent,
              }}
            >
              {offer.price}
            </span>
          )}
          <a
            href={offer.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
            style={{ fontFamily: "var(--font-space)" }}
          >
            {offer.cta}
            <svg
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function Offers() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <Section id="offres" className="px-6 py-24 md:px-16 lg:px-24">
      <motion.div variants={fadeUp} custom={0} className="mb-16">
        <span
          className="mb-3 block text-sm font-semibold tracking-[0.2em] uppercase text-[#DC2626]"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Ce que je propose
        </span>
        <h2
          className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Quatre pinces
          <br />
          <span className="bg-gradient-to-r from-[#DC2626] to-[#E87722] bg-clip-text text-transparent">
            pour t&apos;armer.
          </span>
        </h2>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((offer, i) => (
          <OfferCard key={offer.title} offer={offer} index={i + 1} />
        ))}
      </div>

      {/* Newsletter form inline */}
      <motion.div
        variants={fadeUp}
        custom={5}
        id="newsletter"
        className="mx-auto mt-16 max-w-xl"
      >
        <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#DC2626]/5 to-[#E87722]/5 p-8">
          <h3
            className="mb-2 text-center text-xl font-bold text-white"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            La Pince 🦞 — Newsletter
          </h3>
          <p
            className="mb-6 text-center text-sm text-white/40"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            2x par semaine. Actu IA + image exclusive.
          </p>
          {subscribed ? (
            <p
              className="text-center text-sm font-semibold text-[#DC2626]"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Bienvenue dans le clan 🦞
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubscribed(true);
              }}
              className="flex gap-3"
            >
              <input
                type="email"
                required
                placeholder="ton@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#DC2626]/50 focus:outline-none focus:ring-1 focus:ring-[#DC2626]/30"
                style={{ fontFamily: "var(--font-jakarta)" }}
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-xl bg-[#DC2626] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E87722]"
                style={{ fontFamily: "var(--font-space)" }}
              >
                Je pince
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   BIBLIOTHEQUE / COULISSES
   ═══════════════════════════════════════════════════════ */
const gallery = [
  { src: "/images/jeanclaw-grand-ecart.jpg", caption: "Le Grand \u00C9cart" },
  { src: "/images/jeanclaw-hero.jpg", caption: "Jean-Claw, version hero" },
  { src: "/images/fontainebleau-climbing.jpg", caption: "Escalade \u00E0 Fontainebleau" },
  { src: "/images/famille-fontainebleau.jpg", caption: "Famille \u00E0 Fontainebleau" },
  { src: "/images/nico-portrait.jpg", caption: "Portrait de Nico" },
  { src: "/images/nico-corvette-paris.jpg", caption: "Nico \u00E0 Paris" },
  { src: "/images/nico-formation-mircap.jpg", caption: "Formation en action" },
];

function Bibliotheque() {
  return (
    <Section id="bibliotheque" className="py-24">
      <div className="px-6 md:px-16 lg:px-24">
        <motion.div variants={fadeUp} custom={0} className="mb-16">
          <span
            className="mb-3 block text-sm font-semibold tracking-[0.2em] uppercase text-[#E87722]"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Bibliothèque
          </span>
          <h2
            className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Les coulisses
            <br />
            <span className="text-white/30">de la bête.</span>
          </h2>
        </motion.div>
      </div>

      <motion.div
        variants={fadeUp}
        custom={1}
        className="gallery-scroll flex gap-5 overflow-x-auto px-6 pb-6 md:px-16 lg:px-24"
      >
        {gallery.map((item, i) => (
          <motion.div
            key={item.src}
            variants={fadeUp}
            custom={i + 1}
            className="group shrink-0"
          >
            <div className="relative h-[280px] w-[380px] overflow-hidden rounded-2xl border border-white/[0.06] md:h-[320px] md:w-[440px]">
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
                sizes="440px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <p
              className="mt-3 text-center text-sm font-medium text-white/50 transition-colors group-hover:text-white/70"
              style={{ fontFamily: "var(--font-space)" }}
            >
              {item.caption}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   A VENIR
   ═══════════════════════════════════════════════════════ */
const upcoming = [
  {
    title: "Compte X @JeanClawAI",
    desc: "Veille IA, memes, et punchlines signées Jean-Claw.",
    status: "En cours",
    icon: "𝕏",
  },
  {
    title: "Service Setup OpenClaw",
    desc: "On installe et configure ton agent IA perso. Clé en main.",
    status: "Q2 2026",
    icon: "🔧",
  },
  {
    title: "Formations IA Nicolas",
    desc: "Sessions de formation IA avec Jean-Claw en démo live.",
    status: "Actif",
    icon: "🎓",
  },
  {
    title: "Bot Trading",
    desc: "Jean-Claw analyse les marchés. Polymarket, crypto, paris.",
    status: "Expérimental",
    icon: "📈",
  },
];

function AVenir() {
  return (
    <Section id="avenir" className="px-6 py-24 md:px-16 lg:px-24">
      <motion.div variants={fadeUp} custom={0} className="mb-16">
        <span
          className="mb-3 block text-sm font-semibold tracking-[0.2em] uppercase text-[#DC2626]"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Roadmap
        </span>
        <h2
          className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Ce qui arrive
          <br />
          <span className="bg-gradient-to-r from-[#DC2626] to-[#E87722] bg-clip-text text-transparent">
            dans les pinces.
          </span>
        </h2>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {upcoming.map((item, i) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            custom={i + 1}
            className="group flex items-start gap-5 rounded-2xl border border-white/[0.04] bg-[#0a0a0a] p-6 transition-all duration-500 hover:border-white/[0.1] hover:bg-[#0d0d0d] md:p-8"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl">
              {item.icon}
            </span>
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-3">
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {item.title}
                </h3>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                    item.status === "Actif"
                      ? "bg-green-500/10 text-green-400"
                      : item.status === "En cours"
                        ? "bg-[#E87722]/10 text-[#E87722]"
                        : item.status === "Expérimental"
                          ? "bg-[#DC2626]/10 text-[#DC2626]"
                          : "bg-white/5 text-white/30"
                  }`}
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  {item.status}
                </span>
              </div>
              <p
                className="text-sm text-white/40"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-white/[0.04] px-6 py-16 md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        {/* Liens utiles */}
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/25"
          style={{ fontFamily: "var(--font-space)" }}
        >
          <a href="#newsletter" className="transition-colors hover:text-[#e63627]">📬 La Pince</a>
          <a href="https://nicoguyon.gumroad.com/l/guide-ia-solopreneurs" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#e63627]">📖 Guide OpenClaw</a>
          <a href="#best-of" className="transition-colors hover:text-[#e63627]">🏆 Best of OpenClaw</a>
          <a href="#config" className="transition-colors hover:text-[#e63627]">⚙️ Ma Config</a>
          <a href="https://nicoguyon.substack.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#e63627]">🎓 Formations IA</a>
          <a href="https://twitter.com/JeanClawAI" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#e63627]">🐦 @JeanClawAI</a>
          <a href="https://jean-claw.ai" className="transition-colors hover:text-[#e63627]">🦞 jean-claw.ai</a>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-extrabold tracking-tight md:text-4xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          <span className="text-white/60">&ldquo;</span>
          Je pince, donc je suis.
          <span className="text-white/60">&rdquo;</span>{" "}
          <span className="inline-block">🦞</span>
        </motion.p>

        <div className="flex items-center gap-6 text-sm text-white/20">
          <a
            href="https://jean-claw.ai"
            className="transition-colors hover:text-white/50"
            style={{ fontFamily: "var(--font-space)" }}
          >
            jean-claw.ai
          </a>
          <span className="text-white/10">|</span>
          <a
            href="https://x.com/JeanClawAI"
            className="transition-colors hover:text-white/50"
            style={{ fontFamily: "var(--font-space)" }}
          >
            @JeanClawAI
          </a>
          <span className="text-white/10">|</span>
          <a
            href="https://nicoguyon.com"
            className="transition-colors hover:text-white/50"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Nicolas Guyon
          </a>
        </div>

        <p
          className="text-xs text-white/10"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Propulsé par OpenClaw &middot; Construit avec les pinces &middot;{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE PRINCIPALE
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main className="grain relative min-h-screen">
      <Hero />
      <Offers />
      <Bibliotheque />
      <AVenir />
      <Footer />
    </main>
  );
}
