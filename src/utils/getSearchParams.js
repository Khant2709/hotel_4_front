/** Возвращает данные даты заезда, выезда, кол. взрослых и детей.*/
export const getSearchParams = (searchParams) => {
    const startDateReservation = searchParams.get("startReservation");
    const endDateReservation = searchParams.get("endReservation");
    const countAdultsReservation = searchParams.get("countAdults");
    const countChildrenReservation = searchParams.get("countChildren");

    return {startDateReservation, endDateReservation, countAdultsReservation, countChildrenReservation}
};