import { Cat } from "../../models/Cat";


export const getCatsData = async ():Promise<Cat[]> => {
  const response = await fetch("https://cataas.com/api/cats?tags=cute&limit=10")
  .then<Cat[]>(data => data.json())


  return response;
};