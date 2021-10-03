import { useCallback, useState } from 'react';

const MATRIX_SIZE = 50;
const MIN_FIB_LENGTH = 5;

function transposeMatrix(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

function getFibCells(matrix) {
  const transposed = transposeMatrix(matrix);
  const foundRowsCells = [];

  for (let i = 0; i < MATRIX_SIZE; i++) {
    const foundSeqRows = findFibSeqInArray(matrix[i]);
    const foundSeqCols = findFibSeqInArray(transposed[i]);

    const cellsRows = foundSeqRows.reduce((acc, { start, end }) => {
      for (let j = start; j < end; j++) acc.push([i, j]);
      return acc;
    }, []);

    const cellsCols = foundSeqCols.reduce((acc, { start, end }) => {
      for (let j = start; j < end; j++) acc.push([j, i]);
      return acc;
    }, []);

    foundRowsCells.push([...cellsRows, ...cellsCols]);
  }

  return foundRowsCells.flat();
}

function findFibSeqInArray(array) {
  const foundFibSeq = [];
  let sequence = [array[0], array[1]];

  for (let i = 2; i <= MATRIX_SIZE; i++) {
    sequence.push(array[i]);

    const isFibElement = array[i] === array[i - 1] + array[i - 2];
    const isContainsZeros = sequence.includes(0);
    const isLastElement = i === MATRIX_SIZE ;

    if (!isFibElement || isContainsZeros || isLastElement) {
      if (sequence.length > MIN_FIB_LENGTH)
        foundFibSeq.push({
          start: i - sequence.length + 1,
          end: i
        });

      sequence = [array[i - 1], array[i]];
    }
  }

  return foundFibSeq;
}

function useMatrix({ onUpdate = () => {} }) {
  const [matrix, setMatrix] = useState(Array.from(Array(MATRIX_SIZE), _ => Array(MATRIX_SIZE).fill(0)));
  const [lastClick, setLastClick] = useState([]);
  const [lastFound, setLastFound] = useState([]);

  const incrementColAndRow = useCallback((e) => {
    setLastClick([Number(e.target.dataset.row), Number(e.target.dataset.column)]);

    const updatedMatrix = matrix.reduce((m, arr, i) => {
      if (i === Number(e.target.dataset.row)) {
        m.push(arr.map(value => value + 1));
        return m;
      }
      arr[e.target.dataset.column] += 1;
      m.push(arr);
      return m;
    }, []);

    const found = getFibCells(updatedMatrix);

    found.forEach((cell) => {
      updatedMatrix[cell[0]][cell[1]] = 0;
    });

    setLastFound(found);
    setMatrix(updatedMatrix);

    onUpdate();
  }, [matrix, onUpdate]);

  return {
    matrix,
    lastClick,
    incrementColAndRow,
    lastFound
  };

}

export default useMatrix;