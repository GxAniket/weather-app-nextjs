import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#10172f] via-[#202b5b] to-[#713c8f]">
      <div className="flex min-h-screen items-center justify-center">
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#192650] via-[#4a3f99] to-[#a743a5] sm:min-h-0 sm:h-[850px] sm:max-w-[430px] sm:rounded-[32px] sm:shadow-[0_25px_80px_rgba(0,0,0,0.45)]">

          {/* Background Rain */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="rain rain-1" />
            <div className="rain rain-2" />
            <div className="rain rain-3" />
            <div className="rain rain-4" />
            <div className="rain rain-5" />
            <div className="rain rain-6" />
            <div className="rain rain-7" />
            <div className="rain rain-8" />
            <div className="rain rain-9" />
            <div className="rain rain-10" />
          </div>

          {/* Main Content */}
          <section className="relative z-10 flex min-h-screen flex-col items-center px-5 pt-12 sm:h-full sm:min-h-0">

            {/* Weather Illustration */}
            <div className="relative mt-10 h-[270px] w-[300px]">

              {/* Sun */}
              <div className="absolute left-[35px] top-[45px] h-[76px] w-[76px] rounded-full bg-gradient-to-br from-[#ffe65c] via-[#ffd329] to-[#eab900] shadow-[0_5px_25px_rgba(255,211,41,0.35)]" />

              {/* Sun Rays */}
              <span className="absolute left-[23px] top-[29px] h-2 w-2 rounded-full bg-[#ffd52e]" />
              <span className="absolute left-[69px] top-[12px] h-2 w-2 rounded-full bg-[#ffd52e]" />
              <span className="absolute left-[116px] top-[31px] h-2 w-2 rounded-full bg-[#ffd52e]" />
              <span className="absolute left-[13px] top-[105px] h-2 w-2 rounded-full bg-[#ffd52e]" />

              {/* Main Cloud */}
              <div className="absolute bottom-[63px] left-[40px] h-[105px] w-[220px] rounded-[65px] bg-gradient-to-b from-white via-[#eef1f3] to-[#d7dde2] shadow-[0_18px_30px_rgba(20,20,50,0.15)]" />

              <div className="absolute bottom-[88px] left-[53px] h-[88px] w-[88px] rounded-full bg-gradient-to-b from-white to-[#dfe4e8]" />

              <div className="absolute bottom-[112px] left-[108px] h-[105px] w-[105px] rounded-full bg-gradient-to-b from-white to-[#e3e7ea]" />

              <div className="absolute bottom-[92px] right-[38px] h-[78px] w-[78px] rounded-full bg-gradient-to-b from-white to-[#d9dfe4]" />

              {/* Rain */}
              <div className="absolute bottom-[18px] left-[82px] h-[30px] w-[11px] rotate-[42deg] rounded-full bg-gradient-to-b from-[#2fd8f5] to-[#147ce5]" />

              <div className="absolute bottom-[5px] left-[124px] h-[30px] w-[11px] rotate-[42deg] rounded-full bg-gradient-to-b from-[#2fd8f5] to-[#147ce5]" />

              <div className="absolute bottom-[19px] left-[166px] h-[30px] w-[11px] rotate-[42deg] rounded-full bg-gradient-to-b from-[#2fd8f5] to-[#147ce5]" />

              <div className="absolute bottom-[3px] left-[207px] h-[30px] w-[11px] rotate-[42deg] rounded-full bg-gradient-to-b from-[#2fd8f5] to-[#147ce5]" />
            </div>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-[43px] font-bold leading-none tracking-[-1px] text-white">
                Weather
              </h1>

              <h2 className="mt-1 text-[43px] font-medium leading-none tracking-[-1px] text-[#ffd21f]">
                Forecasts
              </h2>
            </div>

            {/* Get Started */}
            <Link
              href="/weather"
              className="mt-8 flex h-[52px] w-[190px] items-center justify-center gap-2 rounded-full bg-[#facc15] text-[15px] font-bold text-[#172554] shadow-[0_8px_25px_rgba(250,204,21,0.25)] transition hover:scale-105 hover:bg-[#fde047] active:scale-95"
            >
              Get Started
              <span className="text-xl">→</span>
            </Link>

            {/* GitHub */}
            <a
              href="https://github.com/GxAniket/weather-app-nextjs"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 text-sm font-medium text-white/65 transition hover:text-white"
            >
              <span>◉</span>
              <span>View on GitHub</span>
            </a>

          </section>
        </div>
      </div>
    </main>
  );
}