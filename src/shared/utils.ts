export const htmlToText = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent as string;
};

export const calculateCreatedTime = (timeCreated: number) => {
  const periods: {
    [key: string]: number
  } = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };
  const diff = Date.now() - timeCreated;

  for (const key in periods) {
    if (diff >= periods[key]) {
      const result = Math.floor(diff / periods[key]);
      return `${result} ${result === 1 ? key : key + "s"} ago`;
    }
  }

  return "Just now";
};
