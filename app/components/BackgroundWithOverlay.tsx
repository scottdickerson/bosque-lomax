interface BackgroundWithOverlayProps {
  showLogo?: boolean;
}

export function BackgroundWithOverlay({
  showLogo = false,
}: BackgroundWithOverlayProps) {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      <div className="fixed inset-0 z-0 bg-woodgrain" aria-hidden />
      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{
          opacity: 0.75,
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.00) 10.37%, rgba(0, 0, 0, 0.35) 46.67%, rgba(0, 0, 0, 0.80) 100%)",
        }}
        aria-hidden
      />
      {showLogo && (
        <div
          className="fixed top-0 left-0 right-0 z-2 flex justify-center pt-[116px] px-[155px] pointer-events-none"
          aria-hidden
        >
          <img
            src="/images/title-banner.png"
            alt="The Lomax Legacy"
            className="max-w-full h-auto"
          />
        </div>
      )}
      <div
        className="fixed inset-0 z-5 pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/overlay-pebbled.jpg')",
          mixBlendMode: "color-burn",
        }}
        aria-hidden
      />
    </div>
  );
}
