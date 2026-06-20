// a few warm-toned ambient glows sitting behind the page's content (not on
// top of it, unlike GrainOverlay) so the cream background reads with real
// depth instead of flat color — still soft-edged (heavy blur) but bigger
// and more saturated than a barely-there vignette
export default function BackgroundGlow() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -top-36 -left-28 w-[520px] h-[520px] rounded-full bg-orange-300/40 blur-[100px]" />
      <div className="absolute -bottom-44 -right-24 w-[560px] h-[560px] rounded-full bg-orange-500/35 blur-[110px]" />
      <div className="absolute top-1/4 -right-32 w-[420px] h-[420px] rounded-full bg-rose-300/28 blur-[95px]" />
      <div className="absolute top-10 right-1/4 w-[320px] h-[320px] rounded-full bg-red-300/25 blur-[90px]" />
    </div>
  )
}
