import { IPaginationProps } from '../../../types/types';

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  perPage,
  totalItems,
  onClick,
}) => {
  const activeButtonStyle = 'border-2';
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / perPage); i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length < perPage) return null;

  return (
    <ul>
      {pageNumbers.map((item) => (
        <li
          key={item}
          className={`inline-block px-2 mt-10 ${
            currentPage === item ? activeButtonStyle : ''
          }`}
        >
          <a href="#" onClick={() => onClick(item)}>
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
