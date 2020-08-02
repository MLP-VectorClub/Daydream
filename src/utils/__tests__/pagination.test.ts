import { calculatePaginationItems, PaginationItems } from '../pagination';

describe('calculatePaginationItems', () => {
  it('should return an array of numbers up to 6 items', () => {
    let expected: PaginationItems = [1];
    let actual: PaginationItems = calculatePaginationItems({ currentPage: 1, totalPages: 1 });
    expect(actual).toEqual(expected);

    expected = [1, 2, 3, 4, 5, 6];
    actual = calculatePaginationItems({ currentPage: 6, totalPages: 6 });
    expect(actual).toEqual(expected);
  });

  // TODO Add more tests
});
