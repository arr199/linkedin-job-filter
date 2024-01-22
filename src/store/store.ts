import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface exactFilter {
  value: string
  id: string
}

interface FilterStorage {
  title: string
  location: string
  date: 'any_time' | 'r86400' | 'r604800' | 'r2592000'
  exactTitle: exactFilter[]
  exactDescription: exactFilter[]
  exactLocation: exactFilter[]
  setTitle: (value: string) => void
  setLocation: (value: string) => void
  setDatePosted: (value: 'any_time' | 'r86400' | 'r604800' | 'r2592000') => void
  setExactTitle: (value: string) => void
  removeExactTitle: (id: string) => void
  setExactDescription: (value: string) => void
  removeExactDescription: (id: string) => void
  setExactLocation: (value: string) => void
  removeExactLocation: (id: string) => void
}

export const useFilterStore = create<FilterStorage>()(persist((set) => ({
  title: '',
  location: '',
  date: 'any_time',
  exactTitle: [],
  exactDescription: [],
  exactLocation: [],
  setTitle: (value) => { set(() => ({ title: value })) },
  setLocation: (value) => { set(() => ({ location: value })) },
  setDatePosted: (value) => { set(() => ({ date: value })) },

  //   EXACT MATCH FILTERS
  setExactTitle: (value) => {
    set((state) => {
      const id = crypto.randomUUID()

      const newFilter = { value, id }
      return { exactTitle: [...state.exactTitle, newFilter] }
    })
  },
  removeExactTitle: (id) => {
    set((state) => {
      return { ...state, exactTitle: state.exactTitle.filter((e) => e.id !== id) }
    })
  },
  setExactDescription: (value) => {
    set((state) => {
      const id = crypto.randomUUID()
      const newFilter = { value, id }
      return { ...state, exactDescription: [...state.exactDescription, newFilter] }
    })
  },
  removeExactDescription: (id) => {
    set((state) => {
      return { ...state, exactDescription: state.exactDescription.filter((e) => e.id !== id) }
    })
  },
  setExactLocation: (value) => {
    set((state) => {
      const id = crypto.randomUUID()
      const newFilter = { value, id }
      return { ...state, exactLocation: [...state.exactLocation, newFilter] }
    })
  },
  removeExactLocation: (id) => {
    set((state) => {
      return { ...state, exactLocation: state.exactLocation.filter((e) => e.id !== id) }
    })
  }

}), { name: 'filter-storage', storage: createJSONStorage(() => window.localStorage) }

))
