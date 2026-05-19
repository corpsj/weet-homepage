'use client';

import {
  Document,
  Page,
  Text,
  View,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';
import { Model, OptionItem, formatPrice, calculateTotalPrice } from '@/lib/customize/config';

const fontSrc = typeof window === 'undefined'
  ? require('path').join(process.cwd(), 'public/fonts/NotoSansKR.woff')
  : '/fonts/NotoSansKR.woff';

Font.register({
  family: 'Noto Sans KR',
  src: fontSrc,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Noto Sans KR',
  },
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#FDB813',
    borderBottomStyle: 'solid',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FDB813',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    borderBottomStyle: 'solid',
  },
  modelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 4,
  },
  modelName: {
    fontSize: 13,
    color: '#333333',
  },
  modelPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    borderBottomStyle: 'solid',
  },
  optionName: {
    fontSize: 12,
    color: '#444444',
  },
  optionPrice: {
    fontSize: 12,
    color: '#666666',
  },
  totalSection: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#FDB813',
    borderTopStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FDB813',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    borderTopStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 10,
    color: '#999999',
  },
  emptyText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    paddingVertical: 12,
  },
});

interface QuotationPDFProps {
  model: Model;
  selectedOptions: OptionItem[];
}

export default function QuotationPDF({ model, selectedOptions }: QuotationPDFProps) {
  const totalPrice = calculateTotalPrice(model, selectedOptions);
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logo}>weet:)</Text>
          <Text style={styles.subtitle}>모듈러 건축 전문 기업 위트</Text>
        </View>

        <Text style={styles.title}>견적서</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>선택 모델</Text>
          <View style={styles.modelRow}>
            <Text style={styles.modelName}>
              {model.name} 모델 ({model.size} / {model.area}평)
            </Text>
            <Text style={styles.modelPrice}>₩{formatPrice(model.basePrice)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>선택 옵션</Text>
          {selectedOptions.length === 0 ? (
            <Text style={styles.emptyText}>선택된 추가 옵션이 없습니다.</Text>
          ) : (
            selectedOptions.map((option) => (
              <View key={option.id} style={styles.optionRow}>
                <Text style={styles.optionName}>{option.name}</Text>
                <Text style={styles.optionPrice}>
                  {option.price === 0 ? '기본 포함' : `+₩${formatPrice(option.price)}`}
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>총 견적 금액</Text>
          <Text style={styles.totalPrice}>₩{formatPrice(totalPrice)}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>견적 일자: {today}</Text>
          <Text style={styles.footerText}>본 견적은 참고용이며 실제 계약과 다를 수 있습니다.</Text>
        </View>
      </Page>
    </Document>
  );
}
