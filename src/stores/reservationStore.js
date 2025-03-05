import {create} from "zustand";


const initialData = {
  idHotel: null,
  nameHotel: null,
  idApartment: null,
  nameApartment: null,
  startData: null,
  endData: null,
  countAdults: null,
  countChildren: null,
  priceOneNight: null,
  finishPrice: null,
}

export const useReservationStore = create((set) => ({
  isPopUpOpen: false,
  dataReservation: initialData,

  openClosePopUp: () => set((state) => ({isPopUpOpen: !state.isPopUpOpen})),
  updateReservation: (newData) =>
      set((state) => ({
        dataReservation: {
          ...state.dataReservation,
          ...newData,
        },
      })),
  clearReservation: () => set({ dataReservation: initialData }),
}));