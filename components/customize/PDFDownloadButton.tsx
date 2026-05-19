'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import { Model, OptionItem } from '@/lib/customize/config';
import QuotationPDF from './QuotationPDF';

interface PDFDownloadButtonProps {
  model: Model;
  selectedOptions: OptionItem[];
  className?: string;
}

function getFileName(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `weet-quotation-${year}${month}${day}.pdf`;
}

export default function PDFDownloadButton({
  model,
  selectedOptions,
  className = '',
}: PDFDownloadButtonProps) {
  const fileName = getFileName();

  return (
    <PDFDownloadLink
      document={<QuotationPDF model={model} selectedOptions={selectedOptions} />}
      fileName={fileName}
      className={`inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {({ loading }) => (
        <>
          <Download className="w-5 h-5" />
          <span>{loading ? 'PDF 생성 중...' : '견적서 다운로드'}</span>
        </>
      )}
    </PDFDownloadLink>
  );
}
