/**
 *
 * StatsCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './index.css';

function StatsCard(props) {
  const { title, count, countColor, subsections, imageUrl } = props;
  return (
    <div className="stats-container">
      {imageUrl && (
        <img src={imageUrl} alt={title} width="70px" height="70px" />
      )}
      <div className="stat-info-container" style={{ marginLeft: '20px' }}>
        <span className="stat-title">{title}</span>
        <span
          className="stat-number"
          style={{ color: countColor || '#4F4F4F' }}
        >
          {count}
        </span>
        <div className="subtitle-section">
          {subsections &&
            subsections.length > 0 &&
            subsections.map(eachSection => (
              <div
                className={
                  subsections.length > 1
                    ? 'stat-info-container'
                    : 'stat-info-single-line'
                }
              >
                <span
                  className="subsection-stat-title"
                  style={{ marginRight: '5px' }}
                >
                  {eachSection.title}
                </span>
                <span className="subsection-stat-title-number">
                  {eachSection.count}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

StatsCard.propTypes = {
  title: PropTypes.string,
  count: PropTypes.string,
  countColor: PropTypes.string,
  subsections: PropTypes.array,
  imageUrl: PropTypes.string,
};

export default StatsCard;
