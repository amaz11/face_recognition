

export type SideBarControllType = { sideBarTogle: boolean, setsideBarTogle: (value: boolean) => void }
export type ModalType = {
    title: string, children: JSX.Element, modalToggle: boolean, setModalToggle: any, buttonName?: string,
    icon?: React.ReactNode;
    classcss?: string;
}
