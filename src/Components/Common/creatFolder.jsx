/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import PreviewFolder from "./PreviewFolder";
import { useDispatch } from "react-redux";
import { createFolderAction, } from "../../Redux/organizationSlice";

const FolderCreator = ({ identityID, identityName, setLoadFirst, getAllVisible }) => {
  const dispatch = useDispatch();

  const [folderName, setFolderName] = useState("");
  const [openPreviewFolder, setPreviewFolder] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [FolderID, setFolderID] = useState('');
  const MAX_FOLDER_NAME_LENGTH = 25;

  const togglePreview = () => {
    setPreviewFolder(!openPreviewFolder)
  }

  const toggleDropdown = (index) => {
    const newDropdownState = getAllVisible?.getHistory.map((x, i) => {
      return i === index ? !isOpen[index] : false
    });
    setIsOpen(newDropdownState);
  };

  const handleFolderNameChange = (event) => {
    const { value } = event.target;
    if (!value.trim()) {
      setFolderName(value)
      setError("Folder name cannot be empty");
    } else if (value.length >= MAX_FOLDER_NAME_LENGTH) {
      setError("Folder name is too long");
    } else {
      setFolderName(value);
      setError("");
    }
  };

  const createFolder = () => {
    if (!error && folderName.trim() !== "") {
      const payload = {
        folderID: editId && editId ? editId : 0,
        identityID: identityID,
        identityName: "organization",
        operation: editId && editId ? "Update" : "Insert",
        folderName: folderName,
        parentId: 0,
      };

      dispatch(createFolderAction(payload)).then((res) => {
        if (res.payload.status === true) {
          setLoadFirst(true);
          setFolderName('')
          setEditId('')
        }
      })
    } else {
      setError("Folder name cannot be empty");
    }
  };

  const editFolderID = (item) => {
    setEditId(item.id)
    setFolderName(item.title)
  }

  const clearValue = () => {
    setFolderName('')
    setEditId('')
  }

  return (
    <>
      <div className="sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8">
        <div className="bg-white dark:bg-slate-800 shadow border border-gray-300 rounded-md w-full relative p-3">
          <div className="relative">
            {error && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Note : </span> {error}
              </div>
            )}

            <input
              type="text"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border-gray-300 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-semibold capitalize"
              placeholder="Enter folder name"
              value={folderName}
              onChange={handleFolderNameChange}
            />
            {folderName.length > 0 && (
              <h2 className="absolute end-32 bottom-1.5 text-lg cursor-pointer " onClick={() => clearValue()}>X</h2>
            )}
            <button
              type="submit"
              className="text-white absolute end-1.5 bottom-1.5 p-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={createFolder}
            >
              {editId ? 'Update' : 'Create'} Folder
            </button>
          </div>
        </div>
        <div className="mt-5 ">
          <div className="gap-3  flex flex-wrap">
            {getAllVisible && getAllVisible?.getHistory.length > 0 ? (
              getAllVisible?.getHistory
                .filter((x, index) => x?.type === 'Folder')
                .map((item, index) => (
                  <div
                    key={index}
                    className=" "
                  >
                    <div className="relative  bg-white w-40 justify-end dark:bg-slate-800 shadow border border-gray-300 rounded-md p-3 hover:bg-slate-50  font-medium cursor-pointer">
                      <button
                        id={`dropdownMenuIconButton${index}`}
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 absolute top-0 right-0"
                        type="button"
                        onClick={() => toggleDropdown(index)}
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 4 15"
                        >
                          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                      </button>

                      {isOpen[index] && (
                        <div
                          id={`dropdownDots${index}`}
                          className="absolute z-10 bg-white right-0 top-10 divide-y divide-gray-100 rounded-lg shadow w-24 dark:bg-gray-700 dark:divide-gray-600"
                        >
                          <ul
                            className="py-1 border text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby={`dropdownMenuIconButton${index}`}
                          >
                            <li>
                              <a className="block px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                onClick={() => {
                                  editFolderID(item);
                                  toggleDropdown(index, true);
                                }}
                              >
                                Edit
                              </a>
                            </li>
                            <li>
                              <a
                                className="block px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                onClick={() => {
                                  togglePreview()
                                  setFolderID(item?.id)
                                  toggleDropdown(index, true);
                                }}
                              >
                                Preview
                              </a>
                            </li>
                          </ul>
                        </div>
                      )}
                      <div className="capitalize flex flex-col items-center ">
                        <div className="mb-4 flex items-center justify-center" onClick={() => {
                          togglePreview();
                          setFolderID(item?.id);
                        }}>
                          <FcOpenedFolder size={40} />
                        </div>
                        <div className="text-center">
                          {item?.title}
                        </div>
                      </div>
                     
                    </div>
                  </div>
                ))
            ) : (
              <div className="sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 font-semibold text-center">Create New Folder</div>
            )}
          </div>
        </div>
      </div>

      {openPreviewFolder && (
        <PreviewFolder togglePreview={togglePreview} identityName={identityName} identityID={identityID} id={FolderID} setLoadFirst={setLoadFirst} />
      )}
    </>
  );
};

export default FolderCreator;
