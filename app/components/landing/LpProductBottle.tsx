type Props = {
  productName: string;
  brandName?: string;
  count?: number;
  labelColor: string;
  capColor: string;
};

export default function LpProductBottle({ productName, brandName, count = 1, labelColor, capColor }: Props) {
  const n = Math.min(Math.max(count, 1), 6);
  return (
    <div className="flex justify-center items-end gap-1.5 sm:gap-2 py-2">
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className="relative flex flex-col items-center w-12 sm:w-14 md:w-16"
          style={{ marginBottom: i % 2 === 1 ? "4px" : "0" }}
        >
          <div className="w-7 h-3 sm:w-8 sm:h-3.5 rounded-t-sm bg-neutral-300 border border-neutral-400 border-b-0" />
          <div className="w-full rounded-b-lg rounded-t-sm bg-white border-2 border-neutral-200 shadow-md overflow-hidden flex flex-col min-h-[72px] sm:min-h-[88px]">
            <div className="h-8 sm:h-10 w-full shrink-0" style={{ backgroundColor: capColor }} />
            <div className="flex-1 flex flex-col items-center justify-center px-1 py-2 gap-0.5">
              {brandName ? (
                <span className="text-[5px] sm:text-[6px] font-bold uppercase tracking-wider text-neutral-500 leading-none">
                  {brandName}
                </span>
              ) : null}
              <span
                className="text-[7px] sm:text-[8px] font-black text-center leading-tight uppercase"
                style={{ color: labelColor }}
              >
                {productName}
              </span>
              <span className="text-[5px] sm:text-[6px] text-neutral-500 font-semibold">60 CAPS</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
