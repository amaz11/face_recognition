import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import { alpha } from "@mui/material/styles";
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
    serverPagination?: {
        pagination: { pageIndex: number; pageSize: number };
        onPaginationChange: (updater: any) => void;
        rowCount: number;
    };
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
    serverPagination,
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
        ...(serverPagination && {
            manualPagination: true,
            rowCount: serverPagination.rowCount,
            onPaginationChange: serverPagination.onPaginationChange,
        }),
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

        muiTablePaperProps: {
            elevation: 0,
            sx: {
                borderRadius: 4,
                border: "1px solid #e2e8f0",
                backgroundImage:
                    "linear-gradient(135deg, rgba(248,250,252,0.9), rgba(255,255,255,0.95))",
                boxShadow: "0 25px 65px -45px rgba(15,23,42,0.6)",
            },
        },
        muiTableContainerProps: {
            sx: {
                borderRadius: 4,
                border: "1px solid #eef2ff",
            },
        },
        muiTableProps: {
            sx: {
                "& tbody tr:last-of-type td": {
                    borderBottom: "none",
                },
            },
        },
        muiTableHeadRowProps: {
            sx: {
                backgroundColor: "#f8fafc",
                "& th": {
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                    color: "#475569",
                    textTransform: "uppercase",
                },
            },
        },
        muiTableHeadCellProps: ({ column }) => ({
            sx: {
                fontSize: "0.95rem",
                backgroundColor: column.getIsPinned() ? "white" : "inherit",
                borderBottom: "1px solid #e2e8f0",
            },
        }),

        muiTableBodyRowProps: {
            sx: {
                transition: "background-color 200ms ease",
                borderBottom: "1px solid #f1f5f9",
                "&:hover": {
                    backgroundColor: "#f8fafc",
                },
            },
        },
        muiTableBodyCellProps: ({ column }) => ({
            sx: {
                backgroundColor: column.getIsPinned() ? "white" : "inherit",
                boxShadow: column.getIsPinned() ? 0 : 0,
                borderBottom: "1px solid #f1f5f9",
                fontSize: "0.95rem",
                color: "#0f172a",
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
        muiTopToolbarProps: {
            sx: {
                backgroundColor: alpha("#312e81", 0.03),
                borderBottom: "1px solid #eef2ff",
                py: 2,
                px: 2,
            },
        },
        muiBottomToolbarProps: {
            sx: {
                backgroundColor: alpha("#312e81", 0.03),
                borderTop: "1px solid #eef2ff",
                py: 2,
                px: 2,
            },
        },
        muiPaginationProps: {
            color: "primary",
            rowsPerPageOptions: [15, 30, 50, 100],
            shape: "rounded",
            variant: "outlined",
            SelectProps: {
                native: true,
            },
        },
        muiTableBodyProps: {
            sx: {
                borderRadius: 4,
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
            ...(serverPagination && { pagination: serverPagination.pagination }),
        },

        //turn off a feature
        //createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        // editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        // enableEditing: true,
    });
    return <MaterialReactTable table={table} />;
};

export default MaterialsTable;
