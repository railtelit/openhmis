import { DataGrid, GridColDef, GridColumns } from '@mui/x-data-grid';
import './table-view.scss';

export interface ColumnConfig extends GridColDef {
    sum?:false
}
export interface TableConfig{
    columns:ColumnConfig[],
    rows?:any[]
}

/* eslint-disable-next-line */
export interface TableViewProps {
    config:TableConfig
}

export function TableView({config:{columns,rows=[]}}: TableViewProps) {
  return (
    <div>
      <DataGrid columns={columns} rows={rows}/>
    </div>
  );
}

export default TableView;
