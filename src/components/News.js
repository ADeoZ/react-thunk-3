import PropTypes from 'prop-types';

export default function News({ data }) {
  return (
    <div className="News">
      <div className="News__image">
        <img src={data.image} alt={data.title} />
      </div>
      <div className="News__title">
        {data.title}
      </div>
      <div className="News__content">
        {data.content}
      </div>
    </div>
  );
}

News.propTypes = {
  data: PropTypes.object.isRequired,
}