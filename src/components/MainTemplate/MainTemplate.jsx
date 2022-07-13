import Header from '../Content/Header/Header';
import c from './MainTemplate.module.css';

export const MainTemplate = ({ children }) => {
  return (
    <div className={`${c.text_center}`}>
      <Header />
      <div className="cover-container d-flex w-100 h-100 p-5 mx-auto flex-column">
        <div className={c.content}>
          { children }
        </div>
      </div>
    </div >
  );
};