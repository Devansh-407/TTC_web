import Link from "next/link";

export function AnimatedLogo() {
  return (
    <>
      <Link href="/" className="flex items-center gap-2">
        <div className="gift-logo">

          {/* LID + BOW (ATTACHED, MICRO GAP FIXED) */}
          <div className="lid-bow">
            <div className="bow">
              <div className="loop left" />
              <div className="heart" />
              <div className="loop right" />
            </div>

            <div className="lid">
              <span className="lid-ribbon" />
            </div>
          </div>

          {/* BOX */}
          <div className="box">
            <span className="ribbon-vertical" />
            <span className="ribbon-horizontal" />
          </div>

          {/* ✨ SPARKLES (OUTER SIDE, CLEARLY VISIBLE) */}
          <i className="sparkle s1" />
          <i className="sparkle s2" />
          <i className="sparkle s3" />
        </div>

        <span className="hidden md:block text-base font-semibold text-gray-900">
          The <span className="text-[#A36EE0] font-bold">T</span>ohfa Creation
        </span>
        <span className="md:hidden text-sm font-bold">TTC</span>
      </Link>

      <style jsx global>{`
        /* ===== SIZE ===== */
        .gift-logo {
          position: relative;
          width: 28px;
          height: 26px;
        }

        /* ===== BOX ===== */
        .box {
          position: absolute;
          bottom: 0;
          width: 28px;
          height: 18px;
          background: #A36EE0;
          border-radius: 3px;
          z-index: 1;
        }

        .ribbon-vertical {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 100%;
          background: #2D3748;
        }

        .ribbon-horizontal {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          height: 3px;
          background: #2D3748;
        }

        /* ===== LID + BOW ===== */
        .lid-bow {
          position: absolute;
          top: -1px; /* 🔧 GAP REDUCED (was -6px) */
          width: 28px;
          z-index: 2;
          animation: softBounce 2s ease-in-out infinite;
        }

        .lid {
          height: 5px;
          background: #A36EE0;
          border-radius: 3px;
          position: relative;
        }

        .lid-ribbon {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 100%;
          background: #2D3748;
        }

        /* ===== 🎀 BOW ===== */
        .bow {
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
        }

        .loop {
          width: 8px;
          height: 4px;
          border: 2px solid #2D3748;
          border-bottom: none;
          border-radius: 10px 10px 0 0;
        }

        .loop.left {
          transform: rotate(-20deg);
        }

        .loop.right {
          transform: rotate(20deg);
        }

        .heart {
          width: 6px;
          height: 6px;
          background: #2D3748;
          transform: rotate(45deg);
          margin: 0 1px;
          position: relative;
        }

        .heart::before,
        .heart::after {
          content: "";
          position: absolute;
          width: 6px;
          height: 6px;
          background: #2D3748;
          border-radius: 50%;
        }

        .heart::before {
          left: -3px;
        }

        .heart::after {
          top: -3px;
        }

        /* ===== ✨ SPARKLES (VISIBLE + OUTSIDE) ===== */
        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255,255,255,1);
          opacity: 0;
          z-index: 3;
          animation: sparkle 2.4s ease-in-out infinite;
          pointer-events: none;
        }

        .s1 { top: -10px; left: -12px; }
        .s2 { top: -12px; right: -10px; animation-delay: .8s; }
        .s3 { bottom: 3px; right: -14px; animation-delay: 1.6s; }

        /* ===== ANIMATIONS ===== */
        @keyframes softBounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        @keyframes sparkle {
          0%,100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
