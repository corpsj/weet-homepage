import { describe, it, expect, beforeEach } from 'vitest'
import { act } from '@testing-library/react'
import { useCustomizeStore } from '../customizeStore'
import { models } from '@/lib/customize/config'

describe('CustomizeStore', () => {
  beforeEach(() => {
    act(() => {
      useCustomizeStore.getState().resetOptions()
      useCustomizeStore.setState({ selectedModel: null, totalPrice: 0 })
    })
  })

  describe('초기 상태', () => {
    it('selectedModel은 null이어야 한다', () => {
      const state = useCustomizeStore.getState()
      expect(state.selectedModel).toBeNull()
    })

    it('selectedOptions는 기본 포함 옵션을 포함해야 한다', () => {
      const state = useCustomizeStore.getState()
      expect(state.selectedOptions['exterior']).toEqual(['steel-white'])
      expect(state.selectedOptions['kitchen']).toEqual(['kitchen-basic'])
    })

    it('totalPrice는 0이어야 한다', () => {
      const state = useCustomizeStore.getState()
      expect(state.totalPrice).toBe(0)
    })
  })

  describe('setModel', () => {
    it('모델을 선택하면 selectedModel이 설정되어야 한다', () => {
      act(() => {
        useCustomizeStore.getState().setModel(models[0])
      })

      const state = useCustomizeStore.getState()
      expect(state.selectedModel).toEqual(models[0])
    })

    it('모델 선택 시 totalPrice가 해당 모델의 basePrice로 초기화되어야 한다', () => {
      act(() => {
        useCustomizeStore.getState().setModel(models[0])
      })

      const state = useCustomizeStore.getState()
      expect(state.totalPrice).toBe(models[0].basePrice)
    })

    it('모델을 변경하면 selectedOptions가 기본값으로 초기화되어야 한다', () => {
      act(() => {
        useCustomizeStore.getState().setModel(models[0])
        useCustomizeStore.getState().toggleOption('exterior', 'wood-cedar')
      })

      expect(useCustomizeStore.getState().selectedOptions['exterior']).toEqual(['wood-cedar'])

      act(() => {
        useCustomizeStore.getState().setModel(models[1])
      })

      const state = useCustomizeStore.getState()
      expect(state.selectedOptions['exterior']).toEqual(['steel-white'])
      expect(state.selectedModel).toEqual(models[1])
    })
  })

  describe('toggleOption', () => {
    beforeEach(() => {
      act(() => {
        useCustomizeStore.getState().setModel(models[0])
      })
    })

    it('single 타입 옵션을 선택하면 기존 선택을 대체하고 가격이 반영된다', () => {
      act(() => {
        useCustomizeStore.getState().toggleOption('exterior', 'wood-cedar')
      })

      const state = useCustomizeStore.getState()
      expect(state.selectedOptions['exterior']).toEqual(['wood-cedar'])
      expect(state.totalPrice).toBe(models[0].basePrice + 15000000)
    })

    it('single 타입에서 이미 선택된 옵션을 재클릭하면 선택이 유지된다', () => {
      act(() => {
        useCustomizeStore.getState().toggleOption('exterior', 'steel-white')
      })

      const state = useCustomizeStore.getState()
      expect(state.selectedOptions['exterior']).toEqual(['steel-white'])
    })

    it('multiple 타입 카테고리에서는 여러 옵션을 선택할 수 있어야 한다', () => {
      act(() => {
        useCustomizeStore.getState().toggleOption('kitchen', 'refrigerator')
        useCustomizeStore.getState().toggleOption('kitchen', 'washer-9kg')
      })

      const state = useCustomizeStore.getState()
      expect(state.selectedOptions['kitchen']).toContain('refrigerator')
      expect(state.selectedOptions['kitchen']).toContain('washer-9kg')
      expect(state.selectedOptions['kitchen']).toContain('kitchen-basic')
    })

    it('multiple 타입에서 이미 선택된 옵션을 재클릭하면 해제되어야 한다', () => {
      act(() => {
        useCustomizeStore.getState().toggleOption('kitchen', 'refrigerator')
      })

      expect(useCustomizeStore.getState().selectedOptions['kitchen']).toContain('refrigerator')

      act(() => {
        useCustomizeStore.getState().toggleOption('kitchen', 'refrigerator')
      })

      const state = useCustomizeStore.getState()
      expect(state.selectedOptions['kitchen']).not.toContain('refrigerator')
      expect(state.selectedOptions['kitchen']).toContain('kitchen-basic')
    })

    it('기본 포함 옵션은 제거할 수 없다', () => {
      act(() => {
        useCustomizeStore.getState().toggleOption('kitchen', 'kitchen-basic')
      })

      const state = useCustomizeStore.getState()
      expect(state.selectedOptions['kitchen']).toContain('kitchen-basic')
      expect(state.totalPrice).toBe(models[0].basePrice)
    })
  })

  describe('resetOptions', () => {
    beforeEach(() => {
      act(() => {
        useCustomizeStore.getState().setModel(models[0])
        useCustomizeStore.getState().toggleOption('exterior', 'wood-cedar')
        useCustomizeStore.getState().toggleOption('kitchen', 'refrigerator')
      })
    })

    it('모든 옵션을 초기화하면 selectedOptions가 기본값으로 돌아가야 한다', () => {
      act(() => {
        useCustomizeStore.getState().resetOptions()
      })

      const state = useCustomizeStore.getState()
      expect(state.selectedOptions['exterior']).toEqual(['steel-white'])
      expect(state.selectedOptions['kitchen']).toEqual(['kitchen-basic'])
    })

    it('옵션 초기화 후 totalPrice가 모델의 basePrice로 돌아가야 한다', () => {
      act(() => {
        useCustomizeStore.getState().resetOptions()
      })

      const state = useCustomizeStore.getState()
      expect(state.totalPrice).toBe(models[0].basePrice)
    })
  })
})
