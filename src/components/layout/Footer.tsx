import React from "react";
import { FaFacebook, FaHeart } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-20 w-full bg-[#050505] border-t border-white/10 overflow-hidden">
      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_20px_rgba(229,9,20,0.8)]"></div>
      
      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/5 blur-[120px] pointer-events-none"></div>

      <div className="w-full px-4 md:px-12 lg:px-20 py-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          
          {/* Left section: Logo & Links */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <Link href="/" className="inline-block relative group flex items-center gap-2 w-max">
              <div className='w-11 h-11 rounded-full bg-gradient-to-br from-primary/80 to-primary/20 flex items-center justify-center border border-primary/50 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(229,9,20,0.6)] transition-all duration-300'>
                <span className='font-black text-lg text-white drop-shadow-md tracking-tighter'>NH</span>
              </div>
              <span className='text-2xl font-black tracking-widest text-white transition-all duration-300 group-hover:text-primary'>
                HONG<span className='text-primary'>MOVIE</span>
              </span>
            </Link>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium text-white/50">
              <span className="hover:text-primary transition-colors cursor-pointer">Trung tâm trợ giúp</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Điều khoản sử dụng</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Chính sách bảo mật</span>
            </div>
          </div>

          {/* Right section: Developer Mark */}
          <div className="flex flex-col items-center md:items-end gap-5">
            {/* The Developer Mark */}
            <div className="group relative bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-md hover:bg-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(229,9,20,0.15)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="relative z-10 flex flex-col items-center md:items-end">
                <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Designed & Developed by</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 group-hover:from-primary group-hover:via-red-400 group-hover:to-primary transition-all duration-300 text-glow">
                    Nghiêm Hồng
                  </span>
                  <FaHeart className="text-primary animate-pulse ml-1 drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]" size={16} />
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              <Link href="https://www.facebook.com/hong.nghiem.2002/?locale=vi_VN" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all duration-300 hover:-translate-y-1">
                <FaFacebook size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs font-medium text-white/30 tracking-wider">
          © {new Date().getFullYear()} HONGMOVIE. Sản phẩm được tạo ra nhằm mục đích học tập!.
        </div>
      </div>
    </footer>
  );
}
