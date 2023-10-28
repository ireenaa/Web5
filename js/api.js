const BASE_URL = 'http://localhost:5500/api';
const RESOURSE_URL = `${BASE_URL}/car`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
    try {
      const reqParams = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      if (body) {
        reqParams.body = JSON.stringify(body);
      }
  
      return await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
    } catch (error) {
      console.error("HTTP ERROR: ", error);
    }
  };

  export const getAllCars = async() => {
    const rawResponse = await baseRequest({ method: "GET" });

  return await rawResponse.json();
  }
  export const postCar = (body) => 
  baseRequest({ method: "POST", body });

  export const updateCar = (id, body) => 
  baseRequest({ urlPath: `/${id}`, method: "PUT", body });

  export const deleteCar = (id) =>
  baseRequest({ urlPath: `/${id}`, method: "DELETE" });