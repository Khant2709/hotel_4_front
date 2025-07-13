// export const filterBookingsFromApartment = ({
//                                               allBookings,
//                                               apartment,
//                                             }) => {
//   if (!allBookings.length || !apartment) return [];
//
//   // Получаем какой это номер/дом
//   const numberRoom = apartment.apartment_number.split('_');
//
//
//   if (!numberRoom[1] || numberRoom[1] === 'all') {
//     //Отфильтруем все брони относящиеся к этому коттеджу
//     return allBookings.filter((booking) => booking.hotel_id === apartment.hotel_id && booking.apartment_number.split('_')[0] === numberRoom[0]);
//   } else {
//     //Отфильтруем все брони относящиеся к этому номеру
//     return allBookings.filter((booking) => booking.hotel_id === apartment.hotel_id && booking.apartment_number.split('_')[0] === numberRoom[0] && booking.apartment_number.split('_')[1] === numberRoom[1]);
//   }
// };

export const filterBookingsFromApartment = ({
                                              allBookings,
                                              allApartments,
                                              apartment,
                                            }) => {
  if (!allBookings.length || !apartment) return [];

  // Проверяем, относится ли бронирование к текущему номеру
  const isBookingForCurrentApartment = (booking) =>
      booking.hotel_id === apartment.hotel_id &&
      booking.apartment_id === apartment.id;

  // Проверяем, можно ли арендовать весь дом
  const isRentAllHouse = apartment.rent_all_house === 1;

  // Находим все номера в этом доме
  const getAllRoomsInHouse = () => {
    const [houseName] = apartment.apartment_number.split("_");
    const isEntireHouse = apartment.apartment_number.endsWith("_all");

    return allApartments.filter((room) => {
      if (room.hotel_id === apartment.hotel_id) {
        const [roomHouseName, roomSuffix] = room.apartment_number.split("_");

        if (houseName === roomHouseName) {
          // Если текущий номер — это дом, находим все этажи
          if (isEntireHouse && roomSuffix !== "all") return true;
          // Если текущий номер — это этаж, находим весь дом
          if (!isEntireHouse && roomSuffix === "all") return true;
        }
      }
      return false;
    });
  };

  // Проверяем, относится ли бронирование к дому
  const isBookingForHouse = (booking, roomsInHouse) =>
      roomsInHouse.some((room) => room.id === booking.apartment_id);

  return allBookings.filter((booking) => {
    if (isBookingForCurrentApartment(booking)) return true;

    if (isRentAllHouse) {
      const roomsInHouse = getAllRoomsInHouse();
      if (isBookingForHouse(booking, roomsInHouse)) return true;
    }

    return false;
  });
};