export function BrandMark({ className = '', size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path
        d="M38.5 14.2a18.5 18.5 0 1 0 0 35.6 14.2 14.2 0 1 1 0-35.6z"
        fill="currentColor"
      />
    </svg>
  )
}

export function BrandLockup({ className = '', markSize = 40, showTagline = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="grid place-items-center rounded-xl bg-moon-300/15 text-moon-300 ring-1 ring-moon-300/25" style={{ width: markSize + 8, height: markSize + 8 }}>
        <BrandMark size={markSize * 0.72} />
      </span>
      <div>
        <p className="font-display text-lg font-semibold leading-none tracking-tight text-white">Sleep Oracle</p>
        {showTagline && (
          <p className="mt-1.5 text-[11px] font-medium text-white/45">Clarity after dark</p>
        )}
      </div>
    </div>
  )
}
