import { getDate_wwwddmmyyyy } from "./date-utils";

// export const todaysMatchDate = new Date(2024, 3, 9);
export const todaysMatchDate = new Date();
export const currentMatchDay = getDate_wwwddmmyyyy(todaysMatchDate);
