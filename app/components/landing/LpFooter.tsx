export default function LpFooter({ dark }: { dark?: boolean }) {
  return (
    <footer
      className={`px-4 sm:px-6 py-8 text-[10px] sm:text-xs leading-relaxed text-center max-w-3xl mx-auto ${
        dark ? "text-zinc-500 bg-[#0a0a0a]" : "text-zinc-500 bg-[#f8fafc]"
      }`}
    >
      <p className="mb-3">
        These statements have not been evaluated by the Food and Drug Administration. This product is not intended to
        diagnose, treat, cure, or prevent any disease.
      </p>
      <p>
        Consult your healthcare provider before starting any supplement. Individual results vary. Testimonials reflect
        reported user experiences and are not guaranteed.
      </p>
      <p className="mt-4">
        <a href="/disclaimer" className="underline hover:opacity-80">
          Disclaimer
        </a>
        {" · "}
        <a href="/privacy" className="underline hover:opacity-80">
          Privacy
        </a>
      </p>
    </footer>
  );
}
