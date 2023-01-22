import { create } from "zustand";

const useStore = create((set) => ({
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
}));

export default {
  useStore: () => useStore((state) => state.value),
  useUpdateStore: () => useStore((state) => state.update),
};
