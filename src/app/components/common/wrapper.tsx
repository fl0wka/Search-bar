import { IWrapperProps } from '../../../types/types';

const Wrapper: React.FC<IWrapperProps> = ({ children }) => {
  return (
    <div className="container mx-auto py-4 px-2 min-h-screen text-center">
      {children}
    </div>
  );
};

export default Wrapper;
