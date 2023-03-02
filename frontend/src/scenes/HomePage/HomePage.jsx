import { useGetUsersQuery } from "features/users/usersApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // const { mode, token, user } = useSelector((state) => state.auth);
  // const { data, isLoading, isError, error } = useGetUsersQuery(token);
  // console.log(data);
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // else if (isError) {
  //   console.log(error);
  //   return <p>{error.error}</p>;
  // }

  return <div>HomePage</div>;
};
export default HomePage;
