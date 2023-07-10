import { getDate_wwwddmmyyyy } from "./date-utils";

export const todaysMatchDate = new Date(2023, 3, 1);
export const currentMatchDay = getDate_wwwddmmyyyy(todaysMatchDate);
