import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSelectNews } from "../actions/actionCreators";
import NetoSocial from "./NetoSocial";
import News from "./News";
import Page404 from "./Page404";

export default function NewsView({ match }) {
  let { selected, loading, error } = useSelector((state) => state.newsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelectNews(match.params.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    (!error && (
      <NetoSocial>
        <div className="NewsView">
          {loading && <div className="NewsView__loading">Загрузка...</div>}
          {!loading && selected && <News data={selected} />}
        </div>
      </NetoSocial>
    )) ||
    (error && <Page404 />)
  );
}
