import { calculatePaginationItems, GO_TO_ITEM, PaginationItems } from 'src/utils/pagination';

describe('calculatePaginationItems', () => {
  it('should return an array of numbers up to 6 items', () => {
    const expected: PaginationItems = [];
    for (let currentPage = 1; currentPage < 7; currentPage++) {
      expected.push(currentPage);
      const actual: PaginationItems = calculatePaginationItems({
        currentPage,
        totalPages: currentPage,
      });
      expect(actual).toEqual(expected);
    }
  });

  it('should insert dots at the end when at the start', () => {
    const totalPages = 59;
    let currentPage = 1;
    let expected: PaginationItems = [currentPage, 2, 3, GO_TO_ITEM, totalPages];
    let actual: PaginationItems = calculatePaginationItems({
      currentPage,
      totalPages,
    });
    expect(actual).toEqual(expected);

    currentPage = 2;
    expected = [currentPage - 1, currentPage, currentPage + 1, currentPage + 2, GO_TO_ITEM, totalPages];
    actual = calculatePaginationItems({ currentPage, totalPages });
    expect(actual).toEqual(expected);

    currentPage = 3;
    expected = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, GO_TO_ITEM, totalPages];
    actual = calculatePaginationItems({ currentPage, totalPages });
    expect(actual).toEqual(expected);

    currentPage = 4;
    expected = [1, 2, 3, currentPage, 5, 6, GO_TO_ITEM, totalPages];
    actual = calculatePaginationItems({ currentPage, totalPages });
    expect(actual).toEqual(expected);

    currentPage = 5;
    expected = [
      currentPage - 4,
      currentPage - 3,
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      GO_TO_ITEM,
      totalPages,
    ];
    actual = calculatePaginationItems({ currentPage, totalPages });
    expect(actual).toEqual(expected);
  });

  it('should insert dots around edges when in the middle', () => {
    const totalPages = 59;
    let currentPage = 6;
    let expected: PaginationItems = [
      1,
      GO_TO_ITEM,
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      GO_TO_ITEM,
      totalPages,
    ];
    let actual: PaginationItems = calculatePaginationItems({
      currentPage,
      totalPages,
    });
    expect(actual).toEqual(expected);

    currentPage = 7;
    expected = [1, GO_TO_ITEM, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, GO_TO_ITEM, totalPages];
    actual = calculatePaginationItems({ currentPage, totalPages });
    expect(actual).toEqual(expected);

    currentPage = 20;
    expected = [1, GO_TO_ITEM, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, GO_TO_ITEM, totalPages];
    actual = calculatePaginationItems({ currentPage, totalPages });
    expect(actual).toEqual(expected);

    currentPage = 54;
    expected = [1, GO_TO_ITEM, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, GO_TO_ITEM, totalPages];
    actual = calculatePaginationItems({ currentPage, totalPages });
    expect(actual).toEqual(expected);
  });

  it('should insert dots at the start when at the end', () => {
    const totalPages = 59;
    let currentPage = 55;
    let expected: PaginationItems = [
      1,
      GO_TO_ITEM,
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      currentPage + 3,
      totalPages,
    ];
    let actual: PaginationItems = calculatePaginationItems({
      currentPage,
      totalPages,
    });
    expect(actual).toEqual(expected);

    currentPage = 56;
    expected = [1, GO_TO_ITEM, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, totalPages];
    actual = calculatePaginationItems({ currentPage, totalPages });
    expect(actual).toEqual(expected);

    currentPage = 57;
    expected = [1, GO_TO_ITEM, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, totalPages];
    actual = calculatePaginationItems({ currentPage, totalPages });
    expect(actual).toEqual(expected);

    currentPage = 58;
    expected = [1, GO_TO_ITEM, currentPage - 2, currentPage - 1, currentPage, totalPages];
    actual = calculatePaginationItems({ currentPage, totalPages });
    expect(actual).toEqual(expected);

    currentPage = 59;
    expected = [1, GO_TO_ITEM, currentPage - 2, currentPage - 1, currentPage];
    actual = calculatePaginationItems({ currentPage, totalPages });
    expect(actual).toEqual(expected);
  });
});
