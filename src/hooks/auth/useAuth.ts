export const useAuth = () => {
  const token = localStorage.getItem("authToken"); 
  const isLoggedIn = !!token; 
  return { isLoggedIn, token };
};