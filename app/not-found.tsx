'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full flex flex-col items-center"
      >
        <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
          <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
          >
            <motion.path
              d="M 10 50 L 50 15 L 90 50 M 20 40 L 20 90 L 80 90 L 80 40 M 40 90 L 40 60 L 60 60 L 60 90"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 2, ease: "easeInOut" }
                }
              }}
            />
            <motion.path
              d="M 5 90 L 95 90 M 15 20 L 15 90 M 85 20 L 85 90 M 15 40 L 85 40 M 15 65 L 85 65"
              stroke="#FEBD16"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.5,
                  transition: { duration: 2, delay: 0.5, ease: "easeInOut" }
                }
              }}
            />
          </motion.svg>
        </div>

        <motion.h1 
          className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          이 집은 아직 지어지지 않았어요 🏗️
        </motion.h1>
        
        <motion.p 
          className="text-gray-500 text-lg md:text-xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          주소가 잘못되었거나, 아직 준비 중인 페이지예요
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#FEBD16] text-black text-base font-bold rounded-full hover:bg-[#E5A410] transition-colors duration-200"
          >
            홈으로 돌아가기
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-900 text-base font-bold rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            제품 보러가기
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
