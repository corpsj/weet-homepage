"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Package, Truck, Wrench, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const mockOrder = {
  id: 'WEET-2024-001',
  product: '이동식주택 M형 (3×9m)',
  customer: '홍길동',
  status: '시공 중',
  steps: [
    { label: '계약 완료', done: true, date: '2024.01.15' },
    { label: '설계 확정', done: true, date: '2024.01.22' },
    { label: '공장 제작', done: true, date: '2024.02.10' },
    { label: '현장 시공', done: false, date: '진행 중' },
    { label: '준공 완료', done: false, date: '예정' },
  ],
};

export default function TrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [result, setResult] = useState<typeof mockOrder | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    if (orderId.trim().toUpperCase() === 'WEET-2024-001' || orderId.trim() === '') {
      setResult(mockOrder);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="w-full">
      <section className="relative min-h-[45vh] bg-[#2D2D2A] flex flex-col items-center justify-center text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <nav className="flex items-center justify-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/home" className="hover:text-white/70 transition-colors">홈</Link>
              <span>/</span>
              <span className="text-white/70">시공 추적</span>
            </nav>
            <h1 className="text-h1 text-white mb-6">시공 진행 현황</h1>
            <p className="text-body-lg text-white/70 max-w-xl mx-auto">
              주문 번호로 시공 진행 상황을 확인하세요
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <form onSubmit={handleSearch} className="flex gap-3 mb-12">
              <Input
                placeholder="주문 번호를 입력하세요 (예: WEET-2024-001)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="h-14 text-base"
              />
              <Button type="submit" size="lg" className="bg-primary text-[#2D2D2A] hover:bg-primary/90 rounded-xl h-14 px-6 flex-shrink-0">
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </ScrollReveal>

          {searched && result && (
            <ScrollReveal>
              <Card className="border-border">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">주문 번호</p>
                      <CardTitle className="text-lg">{result.id}</CardTitle>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20">{result.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{result.product}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.steps.map((step, i) => (
                      <div key={step.label} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? 'bg-primary' : 'bg-muted border-2 border-border'}`}>
                          {step.done
                            ? <CheckCircle className="h-4 w-4 text-[#2D2D2A]" />
                            : <Clock className="h-4 w-4 text-muted-foreground" />
                          }
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${step.done ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{step.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          )}

          {searched && !result && (
            <ScrollReveal>
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">해당 주문 번호를 찾을 수 없습니다.</p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/support-v2">고객지원 문의</Link>
                </Button>
              </div>
            </ScrollReveal>
          )}

          {!searched && (
            <ScrollReveal>
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="text-sm">주문 번호를 입력하면 시공 진행 현황을 확인할 수 있습니다</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}
