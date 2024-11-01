import { Dispatch, SetStateAction } from "react"

export type SideBarControllType = { sideBarTogle: boolean, setsideBarTogle: (value: boolean) => void }
export type ModalType = {
    title: string, children: JSX.Element, modalToggle: boolean, setModalToggle: Dispatch<SetStateAction<boolean>>, buttonName?: string,
    icon?: React.ReactNode;
    classcss?: string;
}
