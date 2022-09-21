import React from "react";
import NavBarApp from "../NavbarApp/NavBarApp";
import Orders from "../Orders";

function Kitchen() {
  // const { totalCash, totalPaypal } = useSelector((state) => state.orders);
  // const [income, setIncome] = useState(window.localStorage.getItem("income"));
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getTotalCashAction());
  //   dispatch(getTotalPaypalAction());
  // }, [dispatch]);

  // const setLocalStorage = (value) => {
  //   try {
  //     setIncome(value);
  //     window.localStorage.setItem("income", value);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div>
      <Orders />
      <NavBarApp />
    </div>
  );
}

export default Kitchen;
