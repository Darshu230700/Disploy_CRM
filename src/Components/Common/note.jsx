import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { saveNotes } from "../../Redux/LeadsSlice";
import { useForm } from "react-hook-form";
import { stripHtmlTags } from "./Common";


const Note = ({ editNoteData, setEditNoteData, setLoadFirst, identityName, identityID }) => {
    const { handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
    const dispatch = useDispatch()
    const [contents, setContents] = useState("");

    useEffect(() => {
        if (editNoteData && editNoteData?.title) {
            setContents(editNoteData?.title)
        }
    }, [editNoteData]);


    const submitNote = () => {
        const plainText = stripHtmlTags(contents).trim();
        if (plainText?.length <= 0) {
            return setError('notes', { type: 'manual', message: 'Note is Required' });
        } else {
            clearErrors('notes');
        }

        const payload = {
            noteMasterID: editNoteData && editNoteData?.id ? editNoteData?.id : 0,
            identityID: editNoteData && editNoteData?.identityID ? editNoteData?.identityID : identityID,
            notes: contents,
            identityName: identityName
        }

        dispatch(saveNotes(payload)).then((res) => {
            if (res.payload.status === true) {
                setEditNoteData('')
                setLoadFirst(true)
                setContents('')
            }
        }).catch((error) => {
            console.log('error :>> ', error);
        })

    }

    return (
        <form onSubmit={handleSubmit(submitNote)}>
            <div className='mt-5'>
                <div>
                    <ReactQuill
                        theme="snow"
                        value={contents}
                        onChange={(newContent) => {
                            setContents(newContent);
                            clearErrors('notes');
                        }}
                    />
                    {errors?.notes && <p className="error font-bold text-base text-red-500 p-1">{errors?.notes?.message}</p>}
                </div>
                <div className="flex  gap-3  p-3 rounded-b border-t border-gray-300">
                    <button
                        type="button"
                        className="font-semibold focus:outline-none text-red-500 hover:bg-red-500 hover:text-white  border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500 text-sm py-1 px-3 rounded"
                        onClick={() => {
                            setEditNoteData([])
                            setContents('')
                            clearErrors('notes');
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`font-semibold focus:outline-none text-black hover:bg-primary-500 hover:text-white border border-gray-200  text-sm py-1 px-3 rounded`}
                    >
                        {editNoteData?.id ? "Update" : "Save"}
                    </button>
                </div>
            </div>
        </form>
    )
}


export default Note