type Props = {
  productName: string;
  brandName?: string;
  count?: number;
  labelColor: string;
  capColor: string;
  size?: "sm" | "md" | "lg";
};

const SIZE = {
  sm: { wrap: "w-12 sm:w-14 md:w-16", cap: "w-7 h-3 sm:w-8 sm:h-3.5", body: "min-h-[72px] sm:min-h-[88px]", brand: "text-[5px] sm:text-[6px]", name: "text-[7px] sm:text-[8px]", caps: "text-[5px] sm:text-[6px]" },
  md: { wrap: "w-14 sm:w-16 md:w-[4.5rem]", cap: "w-8 h-3.5 sm:w-9 sm:h-4", body: "min-h-[88px] sm:min-h-[104px]", brand: "text-[6px] sm:text-[7px]", name: "text-[8px] sm:text-[9px]", caps: "text-[6px] sm:text-[7px]" },
  lg: { wrap: "w-16 sm:w-20 md:w-24", cap: "w-10 h-4 sm:w-12 sm:h-5", body: "min-h-[104px] sm:min-h-[128px]", brand: "text-[7px] sm:text-[8px]", name: "text-[9px] sm:text-[11px]", caps: "text-[7px] sm:text-[8px]" },
} as const;

export default function LpProductBottle({ productName, brandName, count = 1, labelColor, capColor, size = "sm" }: Props) {
  const n = Math.min(Math.max(count, 1), 6);
  const s = SIZE[size];
  return (
    <div className="flex justify-center items-end gap-1.5 sm:gap-2 py-2">
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className={`relative flex flex-col items-center ${s.wrap}`}
          style={{ marginBottom: i % 2 === 1 ? "4px" : "0" }}
        >
          <div className={`${s.cap} rounded-t-sm bg-neutral-300 border border-neutral-400 border-b-0`} />
          <div className={`w-full rounded-b-lg rounded-t-sm bg-white border-2 border-neutral-200 shadow-md overflow-hidden flex flex-col ${s.body}`}>
            <div className="h-8 sm:h-10 w-full shrink-0" style={{ backgroundColor: capColor }} />
            <div className="flex-1 flex flex-col items-center justify-center px-1 py-2 gap-0.5">
              {brandName ? (
                <span className={`${s.brand} font-bold uppercase tracking-wider text-neutral-500 leading-none`}>
                  {brandName}
                </span>
              ) : null}
              <span
                className={`${s.name} font-black text-center leading-tight uppercase`}
                style={{ color: labelColor }}
              >
                {productName}
              </span>
              <span className={`${s.caps} text-neutral-500 font-semibold`}>60 CAPS</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
