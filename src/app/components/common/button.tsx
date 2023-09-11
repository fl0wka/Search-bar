import { IButtonProps } from '../../../types/types';

const Button: React.FC<IButtonProps> = ({ children, onClick, styleButton }) => {
  return (
    <button
      className={`w-28 text-white p-2 m-2 rounded-sm ${styleButton}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
