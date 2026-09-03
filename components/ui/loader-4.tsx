import React from 'react';
import styled from 'styled-components';

interface LoaderProps {
  cellSize?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ cellSize = '52px', className = '' }) => {
  return (
    <StyledWrapper style={{ '--cell-size': cellSize } as React.CSSProperties} className={className}>
      <div className="loader">
        <div className="cell d-0" />
        <div className="cell d-1" />
        <div className="cell d-2" />
        <div className="cell d-1" />
        <div className="cell d-2" />
        <div className="cell d-2" />
        <div className="cell d-3" />
        <div className="cell d-3" />
        <div className="cell d-4" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    --cell-size: 52px;
    --cell-spacing: 2px;
    --cells: 3;
    --total-size: calc(var(--cells) * (var(--cell-size) + 2 * var(--cell-spacing)));
    display: flex;
    flex-wrap: wrap;
    width: var(--total-size);
    height: var(--total-size);
  }

  .cell {
    flex: 0 0 var(--cell-size);
    margin: var(--cell-spacing);
    background-color: transparent;
    box-sizing: border-box;
    border-radius: 4px;
    animation: 1.5s ripple ease infinite;
  }

  .cell.d-1 {
    animation-delay: 100ms;
  }

  .cell.d-2 {
    animation-delay: 200ms;
  }

  .cell.d-3 {
    animation-delay: 300ms;
  }

  .cell.d-4 {
    animation-delay: 400ms;
  }

  .cell:nth-child(1) {
    --cell-color: #584827;
  }

  .cell:nth-child(2) {
    --cell-color: #7e6330;
  }

  .cell:nth-child(3) {
    --cell-color: #a4803b;
  }

  .cell:nth-child(4) {
    --cell-color: #c99d45;
  }

  .cell:nth-child(5) {
    --cell-color: #e3b754;
  }

  .cell:nth-child(6) {
    --cell-color: #f1c40f;
  }

  .cell:nth-child(7) {
    --cell-color: #f7d54e;
  }

  .cell:nth-child(8) {
    --cell-color: #fae685;
  }

  .cell:nth-child(9) {
    --cell-color: #fff2b2;
  }

  @keyframes ripple {
    0% {
      background-color: transparent;
      box-shadow: 0 0 0 transparent;
    }

    30% {
      background-color: var(--cell-color);
      box-shadow: 0 0 14px var(--cell-color);
    }

    60% {
      background-color: transparent;
      box-shadow: 0 0 0 transparent;
    }

    100% {
      background-color: transparent;
      box-shadow: 0 0 0 transparent;
    }
  }
`;

export default Loader;
export { Loader };
