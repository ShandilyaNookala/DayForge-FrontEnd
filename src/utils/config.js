export const baseUrl = import.meta.env.VITE_API_URL;

export const starsCount = 100;

export const bubbleCount = 30;

export const currentDate = `${new Date().getFullYear()}-${`${
  new Date().getMonth() + 1
}`.padStart(2, 0)}-${`${new Date().getDate()}`.padStart(2, 0)}`;
