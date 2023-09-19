import { IPaginationProps } from '../../../types/types';

const Pagination: React.FC<IPaginationProps> = ({ perPage, totalItems }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / perPage); i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length < perPage) return null;

  return (
    <>
      <ul>
        {pageNumbers.map((item) => (
          <li key={item} className="inline-block px-2 mt-10">
            <a href="#">{item}</a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Pagination;
