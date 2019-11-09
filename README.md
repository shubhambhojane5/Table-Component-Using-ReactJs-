# ReactJsTable
Configurable table component using ReactJs

## Contents

1. Overview
2. Requirement
3. Setup
4. Details to use
5. Example
6. Features which are in-progress

###### Overview

ReactJs table help us to create HTML5 table with all the features that we generally want like searching on every column, sorting, paging and with the best UI. All of the features are configurable, we just need to setup the table object and it is ready to use.

###### Requirement

As it is a ReactJs table component we have same requirement which is required to create a simple react application.

###### Setup

Just need to include ReactJS Table component in the page where you wants to use it.

###### Details to use

You just need to create a data object and enable any features that you need to use else it will be deactivated. Further details as,

sorting - It will allow user to sort on every column.
searching - It will allow user to search on every column.
paging - It will show pager.
pageSize - It's specify how many rows you want to show on a page.

You need to create a Columns collection having 3 fields,
key - It is key from the provided JSON which is going to bind to table.
type - Need to specify how should table consider this as value as.
column - It is Column name which we want to display over UI.

We need to pass JSON data object to "dataSource" property

###### Example

    // Include Table component in page
    import TableComponent from '../Components/tableComponent';

    // Set data obejct for table component
    tableDataOptions={   
            sorting:true,
            searching:true,
            paging:true,
            pageSize:10,   
            Columns:[{
                key:"id",
                type:"number",
                column:"Emp Id"
            },
            {
                key:"employeeName",
                type:"string",
                column:"Employee Name"
            },
            {
                key:"mobileNo",
                type:"number",
                column:"Mobile No"
            },
            {
                key:"designation",
                type:"string",
                column:"Designation"
            },
            {
                key:"role",
                type:"string",
                column:"Role"
            },
            {
                key:"projectName",
                type:"string",
                column:"Working On"
            },
            {
                key:"managarName",
                type:"string",
                column:"Manager"
            },
            {
                key:"DU",
                type:"number",
                column:"DU"
            }],        
            dataSource:empTableDetails
        };

    
    // Use Table component in render() method
    <TableComponent DataOption={this.tableDataOptions}></TableComponent>

###### Features which are in-progress

1. Configration to enable/disable searching/sorting on specific column.
2. Show searchBar on the table to search on full data.
3. Configurable UI/CSS.


There might be some issues, So please let know by adding comments, that I can resolve it.
Thanks.
