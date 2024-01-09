import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useUser = () => {
  const { username, setUsername } = useContext(UserContext);
  return { username, setUsername };
};
