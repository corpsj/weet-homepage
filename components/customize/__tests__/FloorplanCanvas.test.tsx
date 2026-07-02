import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import type { CustomizeModel, CustomizeOption } from '@/lib/customize/types';
import { FloorplanCanvas, geomFor } from '../parts/FloorplanCanvas';

function makeModel(over: Partial<CustomizeModel> = {}): CustomizeModel {
  return {
    id: 'compact-3x6',
    code: '3x6',
    nameKo: 'Compact 3x6',
    nameEn: null,
    widthM: 3,
    lengthM: 6,
    areaSqm: 18,
    basePrice: 27900000,
    floorplanImagePath: null,
    floorplanOverlayPath: null,
    displayOrder: 10,
    isActive: true,
    ...over,
  };
}

function makeOption(over: Partial<CustomizeOption>): CustomizeOption {
  return {
    id: over.key ?? 'opt',
    categoryId: 'cat',
    categoryKey: 'exterior',
    key: 'opt',
    nameKo: '',
    nameEn: null,
    shortDescriptionKo: '',
    shortDescriptionEn: null,
    detailDescriptionKo: null,
    detailDescriptionEn: null,
    priceType: 'included',
    price: 0,
    isDefault: false,
    availableModelIds: [],
    imagePath: null,
    overlayImagePath: null,
    overlayLabelKo: null,
    overlayLabelEn: null,
    displayOrder: 0,
    isActive: true,
    ...over,
  };
}

const footprint = (c: HTMLElement) => c.querySelector('[data-testid="model-footprint"]');
const skin = (c: HTMLElement) => Array.from(c.querySelectorAll('rect')).find((r) => r.getAttribute('fill') === 'none');

describe('geomFor (시안 좌표: 우변 x=830 고정, 동일 스케일)', () => {
  it('3×6 → x=326, w=504, 우변 830', () => {
    expect(geomFor(6)).toEqual({ x: 326, w: 504 });
    expect(geomFor(6).x + geomFor(6).w).toBe(830);
  });

  it('3×9 → x=74, w=756, 우변 830', () => {
    expect(geomFor(9)).toEqual({ x: 74, w: 756 });
    expect(geomFor(9).x + geomFor(9).w).toBe(830);
  });

  it('9.8m 초과 모델은 좌측 여백 40px에서 clamp된다', () => {
    expect(geomFor(12)).toEqual({ x: 40, w: 790 });
  });
});

describe('FloorplanCanvas geometry', () => {
  it('인라인 SVG(viewBox 0 0 1000 460)로 렌더되고 이미지 도면은 없다', () => {
    const { container } = render(<FloorplanCanvas model={makeModel()} selectedOptions={[]} testId="t" />);
    const svg = container.querySelector('[data-testid="t"]');
    expect(svg?.getAttribute('viewBox')).toBe('0 0 1000 460');
    expect(container.querySelector('image')).toBeNull();
  });

  it('3×6 → 평면 폭 504, 레일 6m', () => {
    const { container } = render(<FloorplanCanvas model={makeModel()} selectedOptions={[]} testId="t" />);
    expect(footprint(container)?.getAttribute('data-plan-width')).toBe('504');
    expect(container.querySelector('[data-testid="floorplan-length-rail"]')?.textContent).toContain('6m');
  });

  it('3×9 → 평면 폭 756, 레일 9m', () => {
    const { container } = render(
      <FloorplanCanvas model={makeModel({ id: 'standard-3x9', lengthM: 9, areaSqm: 27 })} selectedOptions={[]} testId="t" />
    );
    expect(footprint(container)?.getAttribute('data-plan-width')).toBe('756');
    expect(container.querySelector('[data-testid="floorplan-length-rail"]')?.textContent).toContain('9m');
  });
});

describe('FloorplanCanvas 색 반영 (시안 swatch)', () => {
  it('기본값: 바닥 fill=#f1ece1, 벽 stroke=#2f3432', () => {
    const { container } = render(<FloorplanCanvas model={makeModel()} selectedOptions={[]} testId="t" />);
    expect(footprint(container)?.getAttribute('fill')).toBe('#f1ece1');
    expect(footprint(container)?.getAttribute('stroke')).toBe('#2f3432');
  });

  it('선택한 바닥재 색이 바닥 fill에 반영된다 (내추럴오크 → #B58E5E)', () => {
    const { container } = render(
      <FloorplanCanvas
        model={makeModel()}
        selectedOptions={[makeOption({ categoryKey: 'flooring', key: 'spc-natural-oak' })]}
        testId="t"
      />
    );
    expect(footprint(container)?.getAttribute('fill')).toBe('#B58E5E');
  });

  it('선택한 외장 색이 벽 스킨 stroke에 반영된다 (적삼목 → #9B6A42)', () => {
    const { container } = render(
      <FloorplanCanvas
        model={makeModel()}
        selectedOptions={[makeOption({ categoryKey: 'exterior', key: 'cedar-point' })]}
        testId="t"
      />
    );
    expect(skin(container)?.getAttribute('stroke')).toBe('#9B6A42');
  });
});

describe('FloorplanCanvas 스마트락 표시', () => {
  it('스마트락 선택 시 도어 액센트 점이 표시된다', () => {
    const { container } = render(
      <FloorplanCanvas
        model={makeModel()}
        selectedOptions={[makeOption({ categoryKey: 'door', key: 'smart-lock' })]}
        testId="t"
      />
    );
    expect(container.querySelector('[data-testid="smart-lock-dot"]')?.getAttribute('fill')).toBe('#2E4A3F');
  });

  it('기본 도어락이면 점이 없다', () => {
    const { container } = render(
      <FloorplanCanvas
        model={makeModel()}
        selectedOptions={[makeOption({ categoryKey: 'door', key: 'standard-lock' })]}
        testId="t"
      />
    );
    expect(container.querySelector('[data-testid="smart-lock-dot"]')).toBeNull();
  });
});
