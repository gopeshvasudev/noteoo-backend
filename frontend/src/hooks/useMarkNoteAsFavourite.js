import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

import axiosInstance from "../utils/axiosInstance";
import useGetNotes from "../hooks/useGetNotes";

const useMarkNoteAsFavourite = () => {
  const token = useSelector((store) => store.token.token);
  const { handler: getNotesHandler } = useGetNotes();

  const handler = async (noteId) => {
    try {
      const res = await axiosInstance.post(
        `/note/favourite/${noteId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res && res.data && res.data.success) {
        getNotesHandler("all");
      }
    } catch (error) {
      if (error && error.response && error.response.data) {
        return toast.error(error?.response?.data?.message);
      }
    }
  };

  return { handler };
};

export default useMarkNoteAsFavourite;
