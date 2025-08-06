import { useState, useEffect } from 'react';

const drawerWidth = 240;

export const AppBar = ({ open, children }) => {
  return (
    <header
      className={`
        fixed top-0 left-0 right-0 h-16
        bg-gray-900 text-white shadow-md
        transition-all duration-300 ease-in-out
        z-50
        ${open ? `ml-[${drawerWidth}px] w-[calc(100%-${drawerWidth}px)]` : ''}
      `}
    >
      {children}
    </header>
  );
};

export const Drawer = ({ open, children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside
      className={`
        fixed top-0 left-0 bottom-0
        bg-white shadow-lg overflow-hidden
        transition-all duration-300 ease-in-out
        z-40
        ${open ? 'w-[240px]' : isMobile ? 'w-0' : 'w-20'}
      `}
    >
      <div className="h-full overflow-y-auto">
        {children}
      </div>
    </aside>
  );
};
export const StyledTableCell = ({ children, header = false, ...props }) => (
  <td
    className={`
      px-6 py-4 whitespace-nowrap text-sm
      ${header ? 
        'bg-gray-900 text-white font-medium' : 
        'text-gray-900'
      }
      ${props.className || ''}
    `}
    {...props}
  >
    {children}
  </td>
);

export const StyledTableRow = ({ children, striped = true, hover = true, ...props }) => (
  <tr
    className={`
      ${striped ? 'odd:bg-gray-50' : ''}
      ${hover ? 'hover:bg-gray-100' : ''}
      ${props.className || ''}
    `}
    {...props}
  >
    {children}
  </tr>
);