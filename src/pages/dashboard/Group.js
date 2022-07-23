import React from "react";
import { useLocalStorageState } from "../../hooks";

const Item = (props) => {
  const { user, onDelete } = props;
  const [currentUser] = useLocalStorageState("User");
  const handleRemove = (e) => {
    e.preventDefault();
    onDelete(currentUser._id === user._id ? currentUser._id : user._id);
  };
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {user.username}
            </div>
            {/* <div className="text-sm text-gray-500">tang.liang@thoughtworks.com</div> */}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          className="text-indigo-600 hover:text-indigo-900"
          onClick={handleRemove}
        >
          {currentUser._id === user._id ? "Exit" : "Remove"}
        </button>
      </td>
    </tr>
  );
};
const Group = (props) => {
  const { group, onDelete } = props;
  const items = group.map((item) => {
    return <Item key={item._id} user={item} onDelete={onDelete} />;
  });
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                {items}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
