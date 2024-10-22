import { useQuery } from "@apollo/client";
import { GET_DESIGNS } from "../../utils/queries";

function DesignCard() {
  const { loading, data } = useQuery(GET_DESIGNS);
  const designThings = data ? data.designThings : [];

  return <>{loading ? <h1>LOADING...</h1> : <h1>{designThings[0].title}</h1>}</>;
}

export default DesignCard;
