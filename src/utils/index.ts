export const jsonParse = (data:any) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return "";
  }
};