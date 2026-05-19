import { create } from 'zustand'
import {
  Model,
  OptionItem,
  allOptionCategories,
  getOptionItemById,
  calculateTotalPrice,
} from '@/lib/customize/config'

export interface CustomizeStore {
  selectedModel: Model | null
  selectedOptions: Record<string, string[]>
  totalPrice: number
  setModel: (model: Model) => void
  toggleOption: (categoryId: string, optionId: string) => void
  resetOptions: () => void
}

const defaultSelectedOptions: Record<string, string[]> = {
  exterior: ['steel-white'],
  flooring: ['spc-white-oak'],
  interior: ['wallpaper-standard'],
  kitchen: ['kitchen-basic'],
  bathroom: ['bathroom-basic'],
  utilities: [],
}

const MANDATORY_OPTIONS = ['kitchen-basic', 'bathroom-basic']

function getCategoryType(categoryId: string): 'single' | 'multiple' {
  const category = allOptionCategories.find((c) => c.id === categoryId)
  return category?.type ?? 'single'
}

function computeTotalPrice(
  model: Model | null,
  selectedOptions: Record<string, string[]>
): number {
  if (!model) return 0

  const selectedItems: OptionItem[] = []
  for (const [catId, optionIds] of Object.entries(selectedOptions)) {
    for (const optionId of optionIds) {
      const item = getOptionItemById(catId, optionId)
      if (item) {
        selectedItems.push(item)
      }
    }
  }

  return calculateTotalPrice(model, selectedItems)
}

export const useCustomizeStore = create<CustomizeStore>((set) => ({
  selectedModel: null,
  selectedOptions: { ...defaultSelectedOptions },
  totalPrice: 0,

  setModel: (model) =>
    set((state) => {
      const newTotalPrice = computeTotalPrice(model, state.selectedOptions)
      return {
        selectedModel: model,
        selectedOptions: { ...defaultSelectedOptions },
        totalPrice: newTotalPrice,
      }
    }),

  toggleOption: (categoryId, optionId) =>
    set((state) => {
      if (
        MANDATORY_OPTIONS.includes(optionId) &&
        state.selectedOptions[categoryId]?.includes(optionId)
      ) {
        return state
      }

      const categoryType = getCategoryType(categoryId)
      const currentSelections = state.selectedOptions[categoryId] ?? []

      let newSelections: string[]

      if (categoryType === 'single') {
        newSelections = [optionId]
      } else {
        if (currentSelections.includes(optionId)) {
          newSelections = currentSelections.filter((id) => id !== optionId)
        } else {
          newSelections = [...currentSelections, optionId]
        }
      }

      const newSelectedOptions = {
        ...state.selectedOptions,
        [categoryId]: newSelections,
      }

      const newTotalPrice = computeTotalPrice(state.selectedModel, newSelectedOptions)

      return {
        selectedOptions: newSelectedOptions,
        totalPrice: newTotalPrice,
      }
    }),

  resetOptions: () =>
    set((state) => {
      const newSelectedOptions = { ...defaultSelectedOptions }
      const newTotalPrice = computeTotalPrice(state.selectedModel, newSelectedOptions)
      return {
        selectedOptions: newSelectedOptions,
        totalPrice: newTotalPrice,
      }
    }),
}))
