'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    className?: string;
}

export default function Pagination({
    totalItems,
    itemsPerPage,
    currentPage,
    className = ""
}: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const handlePageChange = (page: number) => {
        router.push(createPageURL(page));
    };

    // Calculate visible page range (simple logic)
    // Show 5 pages max: [Current-2, Current-1, Current, Current+1, Current+2]
    // Constrained by 1 and totalPages
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-[9px] border border-admin-line-2 bg-white hover:bg-[#f4f4f5] disabled:opacity-50 disabled:hover:bg-white text-[#52525b] transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>

            {startPage > 1 && (
                <>
                    <button
                        onClick={() => handlePageChange(1)}
                        className={`w-9 h-9 flex items-center justify-center rounded-[9px] text-sm font-medium transition-colors ${currentPage === 1
                                ? 'bg-admin-accent text-white'
                                : 'text-admin-muted hover:bg-[#f4f4f5]'
                            }`}
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="text-[#a1a1aa]">...</span>}
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 flex items-center justify-center rounded-[9px] text-sm font-medium transition-colors ${currentPage === page
                            ? 'bg-admin-accent text-white'
                            : 'text-admin-muted hover:bg-[#f4f4f5]'
                        }`}
                >
                    {page}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="text-[#a1a1aa]">...</span>}
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        className={`w-9 h-9 flex items-center justify-center rounded-[9px] text-sm font-medium transition-colors ${currentPage === totalPages
                                ? 'bg-admin-accent text-white'
                                : 'text-admin-muted hover:bg-[#f4f4f5]'
                            }`}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-[9px] border border-admin-line-2 bg-white hover:bg-[#f4f4f5] disabled:opacity-50 disabled:hover:bg-white text-[#52525b] transition-colors"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}
