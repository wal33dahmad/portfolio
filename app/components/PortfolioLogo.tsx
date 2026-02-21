export function PortfolioLogo() {
  return (
    <div className="relative size-9">
      <div
        className="absolute inset-0 rounded-lg rotate-6 transition-transform hover:rotate-12"
        style={{
          background: "linear-gradient(to bottom right, #0071e3, #7c3aed)",
        }}
      />
      <div
        className="absolute inset-0 rounded-lg -rotate-6 transition-transform hover:-rotate-12 flex items-center justify-center"
        style={{
          background: "linear-gradient(to bottom right, #7c3aed, #0071e3)",
        }}
      >
        <span className="text-white text-lg font-bold -tracking-wider">
          WA
        </span>
      </div>
    </div>
  );
}
