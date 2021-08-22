import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getNews } from "../actions/actionCreators";
import NetoSocial from "./NetoSocial";
import News from "./News";

export default function NewsList() {
  let { news, loading, error } = useSelector((state) => state.newsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NetoSocial>
      <div className="NewsList">
        {error && <div>{error}</div>}
        {loading && <div className="NewsList__loading">Загрузка...</div>}
        {!loading &&
          news &&
          news.map((item) => (
            <Link
              className="NewsList__link"
              key={item.id}
              to={`/news/${item.id}`}
            >
              <News data={item} />
            </Link>
          ))}
      </div>
    </NetoSocial>
  );
}
