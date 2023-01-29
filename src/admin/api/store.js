import { create } from "zustand";

const _useStore = create((set) => ({
  value: null,

  update: (value) =>
    set((state) => {
      let _value = state.user;
      if (!_value) _value = {};

      return {
        value: {
          ..._value,
          ...value,
        },
      };
    }),

  reset: () =>
    set(() => {
      return {
        value: null,
      };
    }),
}));

export const useStore = () => _useStore((state) => state.value);
export const useUpdateStore = () => _useStore((state) => state.update);
export const useResetStore = () => _useStore((state) => state.reset);
