import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import Histogram from "components/Echart/Histogram.js";

const styles = {    
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    },
    searchInputBox: {
        width: "80%",
        height: "39px",
        margin: ".3125rem 1px",
        paddingLeft: "10px"
    }
}

class list extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {  
            columnList: [],
            histogram: {},
            lists: [],
            query: ''
        }    

        this.handleClick = this.handleClick.bind(this);
    }
    
    callApi = (params) => {
        fetch("http://localhost:8080/restapi/page/search/list")
            .then(res => res.json())    
            .then(json => {    
                let columnList = [];
                let date = {
                    alias: "date",
                    column: "date",
                    predefine: true,
                    store: [],
                    type: "STRING"
                }
                columnList.push(date);
                columnList = columnList.concat(json.list);
                this.setState({    
                    columnList: columnList
                })    
            })  
            fetch("http://localhost:8080/restapi/search?json=true&take=100&skip=0&page=1&pageSize=100&grid=true&searchType=DAY" + "&query=" + params.query)
                .then(res => res.json())    
                .then(json => {    
                    this.setState({
                        histogram: json.histogram,
                        lists: json.lists    
                    })    
                })          
    }

    componentDidMount() {
        let params = {};
        params.query = '';

        this.callApi(params);
    }

    handleClick(e) {
        let params = {};
        params.query = this.refs.inputText.value;

        this.callApi(params);         
    }

    handleSelect(date) {
        console.log(date);
    }
    
    render() {
        const { classes } = this.props;
        const tableHead = this.state.columnList.map((obj) => obj.alias);
        const tableData = this.state.lists.map((obj) => 
            this.state.columnList.map((column) => 
                obj.data[column.column]
            )
        );

        const title = "test";
        const xData = [];
        const seriesData = {name:'', data: []}
        Object.entries(this.state.histogram).forEach(entry => {
            xData.push(entry[0]);
            seriesData.data.push(entry[1]);
        });

        const selectionRange = {
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		}

        return (
            <>
                <GridContainer>
                    <GridItem md={12}>
                    </GridItem>
                    <GridItem md={12}>
                        <input 
                            type="text"
                            ref="inputText"
                            className={classes.searchInputBox} 
                        />
                        <Button color="black" onClick={this.handleClick}>검색</Button>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={6} sm={6} md={12}>
                        <Card chart>
                            <CardBody>
                                <Histogram
                                    title={title}
                                    xData={xData}
                                    series={[seriesData]}
                                />
                            </CardBody>                        
                        </Card>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader plain color="darkGray">
                                <h4 className={classes.cardTitleWhite}>
                                Table on Plain Background
                                </h4>
                                <p className={classes.cardCategoryWhite}>
                                Here is a subtitle for this table
                                </p>
                            </CardHeader>
                            <CardBody>
                                <Table
                                tableHeaderColor="black"
                                tableHead={tableHead}
                                tableData={tableData}
                                />
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </>
        );
    }
}

export default withStyles(styles)(list);