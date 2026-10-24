const BackgroundDecoration = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[8%] top-[15%] size-80 rounded-full bg-primary/8 blur-3xl sm:size-[420px]" />

      <div className="absolute bottom-[5%] right-[5%] size-72 rounded-full bg-chart-2/6 blur-3xl sm:size-[380px]" />

      <div className="absolute -left-32 -top-32 size-80 rounded-full border border-primary/10" />

      <div className="absolute -left-20 -top-20 size-56 rounded-full border border-primary/10" />

      <div className="absolute -bottom-40 -right-40 size-96 rounded-full border border-primary/10" />

      <div className="absolute -bottom-24 -right-24 size-64 rounded-full border border-primary/10" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <span className="absolute left-[12%] top-[30%] size-2 rounded-full bg-primary/30" />
      <span className="absolute left-[28%] top-[16%] size-1.5 rounded-full bg-primary/20" />
      <span className="absolute right-[16%] top-[24%] size-2 rounded-full bg-primary/25" />
      <span className="absolute bottom-[20%] right-[27%] size-1.5 rounded-full bg-primary/30" />
      <span className="absolute bottom-[32%] left-[18%] size-1.5 rounded-full bg-primary/20" />
    </div>
  );
};

export default BackgroundDecoration;
