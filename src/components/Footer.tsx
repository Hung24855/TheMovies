import React from 'react'
import MaxWithContainer from './MaxWithContainer';
import {FaGithub, FaFacebook} from "@/icons"
import Link from 'next/link';



export default function Footer() {
  return (
    <MaxWithContainer>
      <div className="mt-10 flex h-20 w-full items-center justify-between border-t-[1px] border-gray-700 px-2 text-sm ">
        <div className="flex gap-x-6">
          <span>
            © {new Date().getFullYear()}. All Rights Reserved By :{" "}
            <span className="text-primary"> Nghiêm Hồng</span>
          </span>
          <span>Trung tâm trợ giúp</span>
          <span>Điều khoản</span>
          <span>Chính sách</span>
        </div>
        <div className="flex items-center gap-x-4 ">
          <Link href="https://github.com/Hung24855">
            <FaGithub size={20} className="cursor-pointer" />
          </Link>
          <Link href="https://www.facebook.com/hong.nghiem.2002/?locale=vi_VN">
            <FaFacebook size={20} className="cursor-pointer" />
          </Link>
        </div>
      </div>
    </MaxWithContainer>
  );
}
