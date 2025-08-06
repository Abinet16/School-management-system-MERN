import { useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';

const ResponsiveActionMenu = ({ actions, row }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    
    handleResize(); // Initialize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex justify-end">
      {isMobile ? (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none">
            <DotsVerticalIcon className="h-5 w-5 text-gray-500" />
          </Menu.Button>

          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {actions.map((action) => (
                  <Menu.Item key={action.name}>
                    {({ active }) => (
                      <button
                        onClick={() => action.action(row)}
                        className={`${
                          active ? 'bg-violet-50 text-violet-900' : 'text-gray-700'
                        } flex w-full items-center px-4 py-2 text-sm`}
                      >
                        <div className="mr-3 h-5 w-5 text-violet-500">
                          {action.icon}
                        </div>
                        {action.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <div className="flex space-x-2">
          {actions.map((action) => (
            <button
              key={action.name}
              onClick={() => action.action(row)}
              className="inline-flex items-center rounded-full bg-violet-700 p-2 text-white hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              title={action.name}
            >
              {action.icon}
              <span className="sr-only">{action.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResponsiveActionMenu;