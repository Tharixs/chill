"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-gray-400 py-12 px-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-around items-center md:items-start">
          <div className="mb-6 md:mb-0">
            <Image src="/Logo.svg" alt="Logo" width={100} height={100} />
            <span className="block text-sm">
              © 2023 Chill All Rights Reserved.
            </span>
          </div>

          <div className="flex flex-col">
            <h3 className="text-white font-semibold mb-2">Perusahaan</h3>
            <a href="#" className="hover:text-white">
              Tentang Kami
            </a>
            <a href="#" className="hover:text-white">
              Karir
            </a>
            <a href="#" className="hover:text-white">
              Blog
            </a>
          </div>
          <div className="flex flex-col">
            <h3 className="text-white font-semibold mb-2">Bantuan</h3>
            <a href="#" className="hover:text-white">
              FAQ
            </a>
            <a href="#" className="hover:text-white">
              Kontak
            </a>
            <a href="#" className="hover:text-white">
              Panduan
            </a>
          </div>
          <div className="flex flex-col">
            <h3 className="text-white font-semibold mb-2">Ikuti Kami</h3>
            <a href="#" className="hover:text-white">
              Facebook
            </a>
            <a href="#" className="hover:text-white">
              Twitter
            </a>
            <a href="#" className="hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
