import { ISearchFieldProps } from '../../../../types/types';

const SearchField: React.FC<ISearchFieldProps> = ({
  type = 'text',
  placeholder = 'найти',
  name,
  value,
  onChange,
  onSubmit,
  styleButton,
}) => {
  return (
    <form
      className="flex justify-center mb-5 content-middle"
      onSubmit={onSubmit}
    >
      <input
        className="border py-1 px-2 mr-2 rounded-sm outline-none w-1/2"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <button
        className={`${styleButton} p-2 text-white rounded-sm`}
        type="submit"
        id={name}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchField;
