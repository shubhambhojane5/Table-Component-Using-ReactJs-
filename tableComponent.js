import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import SearchBarComponent from '../Components/searchBarComponent';

import '../Components/tabel.css';

class TableComponent extends Component {

    // columnSortSeq = [];
    // selectedColumn = "";
    // tableOptions = {};

    constructor(props) {
        super(props);
        this.state = {
            tableOptions: {
                Columns: this.props.DataOption.Columns,
                dataSource: this.props.DataOption.dataSource,
                sorting: this.props.DataOption.sorting === undefined ? false : this.props.DataOption.sorting,
                searching: this.props.DataOption.searching === undefined ? false : this.props.DataOption.searching,
                paging: this.props.DataOption.paging === undefined ? false : this.props.DataOption.paging,
                pageSize: (this.props.DataOption.paging === true && this.props.DataOption.pageSize === undefined) ? 10 : this.props.DataOption.pageSize,
                searchBar: this.props.ShowSearchBar === undefined ? false : this.props.ShowSearchBar
            },
            columns: [...this.props.DataOption.Columns],
            tableDataToBind: [...this.props.DataOption.dataSource],
            columnSortArrowClass: "",
            currentPage: 1,
            columnSortSeq: [],
            selectedColumn: "",
            tableDataToBindCopy: [...this.props.DataOption.dataSource],
            Pager: {
                firstlink: 1,
                secoundLink: 2,
                middleLink: -1,
                LastLink: -1
            }

        };
        // this.state.tableOptions = this.props.DataOption;
        // this.state.tableOptions.Columns = this.state.tableOptions.Columns;
        // this.state.tableOptions.dataSource = this.state.tableOptions.dataSource;
        // this.state.tableOptions.sorting = this.state.tableOptions.sorting === undefined ? false : this.state.tableOptions.sorting;
        // this.state.tableOptions.searching = this.state.tableOptions.searching === undefined ? false : this.state.tableOptions.searching;
        // this.state.tableOptions.paging = this.state.tableOptions.paging === undefined ? false : this.state.tableOptions.paging;
        // this.state.tableOptions.pageSize = (this.state.tableOptions.paging === true && this.state.tableOptions.pageSize === undefined) ? 10 : this.state.tableOptions.pageSize;
    }

    componentWillMount() {
        // this.setState({
        //     columns: [...this.state.tableOptions.Columns],
        //     tableDataToBind: [...this.state.tableOptions.dataSource]
        // });
    }

    doTableSearch = (data) => {
        this.setState({ tableDataToBind: data });
    }

    getData = () => {
        return [...this.state.tableOptions.dataSource];
    }

    clearSearch = () => {
        this.setState({ tableDataToBind: this.getData() });
    }

    sortData = (key, order = 'asc') => {
        return function (a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }

            const varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    tableDataSortByColumn = (columnName) => {
        if (this.state.tableOptions.sorting !== false) {
            this.state.selectedColumn = columnName;
            const up = this.state.columnSortSeq.indexOf(columnName + "" + "up");
            const down = this.state.columnSortSeq.indexOf(columnName + "" + "down");

            if ((up === -1 && down === -1) || (up === -1 && down !== -1)) {
                this.state.columnSortSeq.push(columnName + "" + "up");
                var res = this.state.tableDataToBindCopy.sort(this.sortData(columnName, 'asc'));
                this.setState({
                    columnSortArrowClass: "arrowICls up",
                    tableDataToBind: res,
                    tableDataToBindCopy: res,
                    currentPage: 1
                });
            } else if (down === -1 && up !== -1) {
                this.state.columnSortSeq.push(columnName + "" + "down");
                var res = this.state.tableDataToBindCopy.sort(this.sortData(columnName, 'desc'));
                this.setState({
                    columnSortArrowClass: "arrowICls down",
                    tableDataToBind: res,
                    tableDataToBindCopy: res,
                    currentPage: 1
                });
            } else if (up !== -1 && down !== -1) {
                this.state.columnSortSeq.splice(this.state.columnSortSeq.indexOf(columnName + "" + "up"), 1);
                this.state.columnSortSeq.splice(this.state.columnSortSeq.indexOf(columnName + "" + "down"), 1);

                this.setState({
                    columnSortArrowClass: "",
                    tableDataToBind: this.getData(),
                    tableDataToBindCopy: this.getData(),
                    currentPage: 1
                });
            }
        }
    }

    bindTableColumnsSearch = (e, type) => {
        const { name, value } = e.target;
        var res = {};
        if (type === "string") {
            res = this.getData().filter(function (item) {
                return (item[name].toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1);
            });
        } else if (type === "number") {
            res = this.getData().filter(function (item) {
                return (item[name].toString().indexOf(value) !== -1);
            });
        }
        this.setState({
            [name]: value,
            tableDataToBind: res,
            tableDataToBindCopy: res
        });
    }

    bindTableColumns = (tableColumns) => {
        if (tableColumns !== undefined && tableColumns !== null) {
            return tableColumns.map((item, index) => {
                return (
                    <th key={index} className="pointerCls" onClick={() => this.tableDataSortByColumn(item.key)}>{item.column}<i className={this.state.selectedColumn === item.key ? this.state.columnSortArrowClass : ''}></i></th>
                )
            });
        }
    }

    bindTableRows = (tableRowsData) => {
        if (tableRowsData.length > 0) {
            var columns = this.state.columns;
            var pageSize = this.state.tableOptions.paging === false ? this.state.tableOptions.dataSource.length : this.state.tableOptions.pageSize;
            var obj = [];
            for (let index = 0; index < pageSize; index++) {
                if (tableRowsData[index] !== undefined) {
                    obj.push((
                        <tr key={tableRowsData[index].id}>
                            {
                                columns.map((key, keyIndex) => {
                                    return (
                                        <td key={keyIndex}>{tableRowsData[index][key.key]}</td>
                                    )
                                })
                            }

                        </tr>
                    ))
                }
            }
            return obj;
        }
    }

    bindTableColumnSearchRow = () => {
        if (this.state.tableOptions.searching !== false) {
            const inputStyle = {
                width: "100%",
                margin: "8px 0",
                display: "inline-block",
                border: "1px solid #ccc"
            }


            var columns = this.state.columns;
            return (
                <tr key={0}>
                    {
                        columns.map((key, keyIndex) => {
                            return (
                                <td key={keyIndex}><input type="text" style={inputStyle} name={key.key} value={this.state[key.key] || ''} onChange={(e) => this.bindTableColumnsSearch(e, key.type)} /></td>
                            )
                        })
                    }

                </tr>
            );
        }
    }

    bindPagerClick = (e, page) => {
        if (page !== undefined && page !== null) {
            var tableData = [...this.state.tableDataToBindCopy];
            var lastPageNo = Math.ceil(tableData.length / this.state.tableOptions.pageSize);
            var obj = [];
            if (page === "First") {
                page = 1;
                this.setState(prevState => ({
                    Pager: {
                        ...prevState.Pager,
                        firstlink: 1,
                        secoundLink: 2,
                        middleLink: -1
                    }
                }));
            } else if (page === "Last") {
                page = lastPageNo;
                this.setState(prevState => ({
                    Pager: {
                        ...prevState.Pager,
                        firstlink: (lastPageNo == 1 ? 1 : lastPageNo - 1),
                        secoundLink: (lastPageNo == 1 ? -1 : lastPageNo),
                        middleLink: -0
                    }
                }));
            } else if (page == -0) {
                page = this.state.Pager.secoundLink + 1;
                if (page <= lastPageNo) {
                    this.setState(prevState => ({
                        Pager: {
                            ...prevState.Pager,
                            firstlink: prevState.Pager.firstlink + 1,
                            secoundLink: prevState.Pager.secoundLink + 1,
                            middleLink: (page === lastPageNo ? -0 : -1)
                        }
                    }));
                }
            }
            if (page <= lastPageNo) {
                for (var i = (page - 1) * this.state.tableOptions.pageSize; i < (page * this.state.tableOptions.pageSize) && i < tableData.length; i++) {
                    obj.push(tableData[i]);
                }
                this.setState({
                    tableDataToBind: obj,
                    currentPage: page
                });
            }
            e.preventDefault();
        }
    }



    bindPagerAnchor = () => {
        var noOnPager = Math.ceil(this.state.tableOptions.dataSource.length / this.state.tableOptions.pageSize);
        var obj = [];
        //if (noOnPager >= 4) {
        if (this.state.tableOptions.dataSource.length > this.state.tableOptions.pageSize) {
            obj.push((
                <a href="" key={this.state.Pager.firstlink} className={this.state.currentPage === this.state.Pager.firstlink ? "active" : ""} onClick={(e) => this.bindPagerClick(e, this.state.Pager.firstlink)}>{this.state.Pager.firstlink}</a>
            ));
            obj.push((
                <a href="" key={this.state.Pager.secoundLink} style={{ display: this.state.Pager.secoundLink !== -1 ? 'block' : 'none' }} className={this.state.currentPage === this.state.Pager.secoundLink ? "active" : ""} onClick={(e) => this.bindPagerClick(e, this.state.Pager.secoundLink)}>{this.state.Pager.secoundLink}</a>
            ));
            obj.push((
                <a href="" key={this.state.Pager.secoundLink + 1} style={{ display: this.state.Pager.middleLink === -1 ? 'block' : 'none' }} onClick={(e) => this.bindPagerClick(e, -0)}>...</a>
            ));
        }
        // obj.push((
        //     <a href="" key={noOnPager} className={this.state.currentPage === noOnPager ? "active" : ""} onClick={(e) => this.bindPagerClick(e, noOnPager)}>{noOnPager}</a>
        // ));
        // } else if (noOnPager < 4) {
        //     obj.push((
        //         <a href="" key={this.state.Pager.firstlink} className={this.state.currentPage === this.state.Pager.fisrstlink ? "active" : ""} onClick={(e) => this.bindPagerClick(e, this.state.Pager.firstlink)}>{this.state.Pager.firstlink}</a>
        //     ));
        //     obj.push((
        //         <a href="" key={this.state.Pager.secoundLink} className={this.state.currentPage === this.state.Pager.secoundLink ? "active" : ""} onClick={(e) => this.bindPagerClick(e, this.state.Pager.secoundLink)}>{this.state.Pager.secoundLink}</a>
        //     ));
        //     obj.push((
        //         <a href="" key={this.state.Pager.secoundLink + 1} className={this.state.currentPage === this.state.Pager.secoundLink + 1 ? "active" : ""} onClick={(e) => this.bindPagerClick(e, this.state.Pager.secoundLink + 1)}>{this.state.Pager.secoundLink + 1}</a>
        //     ));
        // }
        return obj;
    }

    render() {
        return (
            <div>
                <div style={{ margin: "10px", display: this.state.searchBar === true ? "block" : "none" }}>
                    <SearchBarComponent dataToSearch={[...this.state.tableOptions.dataSource]} dosearch={this.doTableSearch} clearTableSearch={this.clearSearch}></SearchBarComponent>
                </div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            {this.bindTableColumns(this.state.columns)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.bindTableColumnSearchRow()}
                        {this.bindTableRows(this.state.tableDataToBind)}
                    </tbody>
                </Table>
                <div className="pagination">
                    <a href="" onClick={(e) => this.bindPagerClick(e, "First")}>&laquo;</a>
                    {
                        this.bindPagerAnchor()
                    }
                    <a href="" onClick={(e) => this.bindPagerClick(e, "Last")}>&raquo;</a>
                </div>
            </div>
        )
    }
}

export default TableComponent;