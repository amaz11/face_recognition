import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import "./materialCss.css";
import DropDown from "../../dropDown/DropDown";

type MaterialsTableReactTs = {
    data: any[];
    columns: any[];
    tags: string[];
    endpoint: string;
    isLoading?: boolean;
    enableRowActions?: boolean;
    isFetching?: boolean;
    refetch: () => void;
    tableObject?: any;
    UpdateList?: React.ComponentType<any>;
    seeDetails?: boolean;
    enablePagination?: boolean;
    enableExpanding?: boolean;
};

const MaterialsTable = ({
    data,
    columns,
    isLoading,
    endpoint,
    UpdateList,
    tags,
    enableRowActions = true,
    isFetching = false,
    refetch,
    tableObject,
    seeDetails = true,
    enablePagination = true,
    enableExpanding = false,
}: MaterialsTableReactTs) => {
    //simple column definitions pointing to flat data
    const tableColumns = useMemo(() => columns, [data, isLoading]);
    //pass table options to useMaterialReactTable
    const table = useMaterialReactTable({
        paginationDisplayMode: "pages",

        ...tableObject,
        columns: tableColumns,
        data: data || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        columnFilterDisplayMode: "popover",
        positionActionsColumn: "last",
        enableExpanding,
        enableTopToolbar: true,
        enableStickyHeader: true,
        enableGlobalFilter: false,
        enableColumnActions: true,
        enableColumnPinning: true,
        enableColumnOrdering: true, //enable a feature for all columns
        enableRowActions: enableRowActions,
        enableRowDragging: false,
        // enableRowSelection: false, //enable some features
        enableFacetedValues: false,
        rowNumberDisplayMode: "original",
        enablePagination: enablePagination,
        //     enableSorting: false,
        //     muiRowDragHandleProps: ({ table }) => ({
        //     onDragEnd: () => {
        //     const { draggingRow, hoveredRow } = table.getState();
        //     if (hoveredRow && draggingRow) {
        //       data.splice(
        //         (hoveredRow as MRT_Row).index,
        //         0,
        //         data.splice(draggingRow.index, 1)[0],
        //       );
        //       setData([...data]);
        //     }
        //   },
        // })
        displayColumnDefOptions: {
            "mrt-row-actions": {
                size: 80,
                grow: false,
                muiColumnActionsButtonProps: {
                    sx: {
                        left: "760px",
                    },
                },
            },
        },

        initialState: {
            // showColumnFilters: true,
            showGlobalFilter: false,
            density: "compact",
            columnPinning: {
                right: ["mrt-row-actions"],
            },
        },

        muiTableHeadCellProps: ({ column }) => ({
            sx: {
                // textAlign: "center",
                // paddingLeft: 8,
                // paddingRight: 8,
                fontSize: "16px",
                backgroundColor: column.getIsPinned() ? "white" : "inherit",
            },
        }),

        muiTableBodyCellProps: ({ column }) => ({
            //conditionally style pinned columns
            sx: {
                // textAlign: 'center',
                backgroundColor: column.getIsPinned() ? "white" : "inherit",
                boxShadow: column.getIsPinned() ? 0 : 0,
            },
        }),
        renderRowActionMenuItems: ({ row, closeMenu }) => [
            UpdateList ? (
                <DropDown
                    seeDetails={seeDetails}
                    endpoint={`${endpoint}/${row?.original.id}`}
                    tags={tags}
                    updateList={
                        <UpdateList
                            key={row?.original.id}
                            id={row?.original.id}
                            row={row?.original}
                            closeMenu={closeMenu}
                        />
                    }
                    key={row.id}
                    refetch={refetch}
                />
            ) : (
                <DropDown
                    seeDetails={seeDetails}
                    endpoint={`${endpoint}/${row.original.id}`}
                    tags={tags}
                    key={row.id}
                    refetch={refetch}
                />
            ),
        ],

        muiSearchTextFieldProps: {
            // size: 'small',
            // variant: 'outlined',
            sx: {
                paddingTop: 1,
                display: "none",
            },
        },
        muiPaginationProps: {
            color: "primary",
            rowsPerPageOptions: [30, 50, 100],
            shape: "rounded",
            variant: "outlined",
            SelectProps: {
                native: true, // Use native dropdown for rows per page
            },
            // labelRowsPerPage: 'Rows per page:', // Custom label
            // sx: {
            //     '.MuiTablePagination-selectLabel': {
            //         color: 'blue', // Custom styles for labels
            //     },
            //     '.MuiTablePagination-select': {
            //         color: 'green',
            //     },
            // }
        },
        muiTableBodyProps: {
            sx: {
                borderRadius: 20,
            },
        },
        muiSkeletonProps: {
            animation: "wave",
        },
        muiCircularProgressProps: {
            sx: {
                display: "none",
            },
        },

        muiLinearProgressProps: {
            sx: {
                display: "none",
            },
        },
        state: {
            isLoading,
            // isSaving: ,
            showSkeletons: isFetching,
        },

        //turn off a feature
        //createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        // editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        // enableEditing: true,
    });
    return <MaterialReactTable table={table} />;
};

export default MaterialsTable;