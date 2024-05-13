import React from 'react'
import './table.css'
import { DataGrid,GridToolbarContainer,GridToolbarExport} from '@mui/x-data-grid';
import { Box } from '@mui/material';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: 'Export data' },
          button: { variant: 'outlined' },
        }}
      />
    </GridToolbarContainer>
  );
}

const Table = ({columns, rows}) => {

  return (
    <div style={{ height: 500, width:"100%"}}>
    <DataGrid
      getRowId={(row) => row?._id}
      toolbar={{}}
      rows={rows}
      columns={columns}
      slots={{ toolbar: CustomToolbar, }}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10,15,20]}
      checkboxSelection
      
    />
  </div>
  )
}

export default Table