import { Style } from "@/types";
import { create } from "zustand";

type StylesStore = {
  styles: Style[];
  selectedStyleId: string;
  setStyles: (styles: Style[]) => void;
  setSelectedStyle: (id: string) => void;
};

const useStylesStore = create<StylesStore>((set) => ({
  styles: [],
  selectedStyleId: "",
  setStyles: (styles) => set({ styles }),
  setSelectedStyle: (id) => set({ selectedStyleId: id }),
}));

export default useStylesStore;
