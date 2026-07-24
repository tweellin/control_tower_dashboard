import Image from "next/image";

export function BrandLogo() {
  return (
    <div className="flex items-center rounded-xl bg-white px-3 py-2 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]">
      <Image
        src="/rvi-logo.png"
        alt="X5 Import"
        width={1786}
        height={500}
        priority
        className="h-[32px] w-auto sm:h-[37px]"
      />
    </div>
  );
}
