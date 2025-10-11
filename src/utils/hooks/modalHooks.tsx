
import { useState } from "react";


const useModalHooks = () => {
    const [modalToggle, setModalToggle] = useState<boolean>(false);

    return { modalToggle, setModalToggle }
}

export default useModalHooks
