import { FiEye } from "react-icons/fi";
import { DeleteModal } from "../modal/Delete/DeleteModal";

const DropDown = ({
    tags,
    endpoint,
    updateList,
    refetch,
    seeDetails = true,
}: {
    tags: string[];
    endpoint: string;
    updateList?: React.ReactNode;
    refetch: () => void;
    seeDetails?: boolean;
}) => {
    return (
        <ul className={`font-medium `}>
            {seeDetails ? (
                <li className="flex-ic-jc gap-3 tableDropDownList">
                    <FiEye size={15} /> <span>Details</span>
                </li>
            ) : null}

            {updateList ? updateList : null}

            <DeleteModal tags={tags} endpoint={endpoint} refetch={refetch} />
        </ul>
    );
};

export default DropDown;