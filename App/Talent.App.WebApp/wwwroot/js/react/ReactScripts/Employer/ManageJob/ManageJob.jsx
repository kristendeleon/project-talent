import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment } from 'semantic-ui-react';

export default class ManageJob extends React.Component {    
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: {
                activePage: 1,
            },
            sortBy: {
                sortbydate: "desc",
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 0,
            activeIndex: "",
            isJobListEmpty: false
        }
        this.loadData = this.loadData.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.renderJobsCards = this.renderJobsCards.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this); 
    };

    componentDidMount() {
        this.loadData();
    };

    fetchData() { 
            let loaderData = TalentUtil.deepCopy(this.state.loaderData);
            loaderData.isLoading = true;
            const obj = Object.assign({},
                this.state.filter,
                this.state.sortBy,
                this.state.activePage
            );
            var link = `${process.env.REACT_APP_API_LISTING}/listing/listing/getSortedEmployerJobs`;
            var cookies = Cookies.get('talentAuthToken');
        return new Promise((resolve, reject) => {

           $.ajax({
                url: link,
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                data: obj,
                type: "GET",
                contentType: "application/json",
                dataType: "json",

                success: function (res) {
                    if (res.myJobs) {
                        if (res.myJobs.length == 0) {
                            this.setState({ isJobListEmpty: true })
                        }
                        this.setState({ loadJobs: res.myJobs })
                        this.setState({ totalPages: res.totalCount })
                    }
                    resolve(true);

                }.bind(this),
                error: function (res) {
                    console.log(res);
                    resolve(false);
                }

            });
        })
        
    }

    loadData() {
        return this.fetchData().then(
          this.setState((prevState) => {
              Object.assign({}, prevState.loaderData.isLoading = false);
          })            
        )
    }
    renderJobsCards() {
        const jobsList = this.state.loadJobs ? this.state.loadJobs : "";
            return jobsList.map((job) => {
                return (<JobSummaryCard key={job.id} job={job} />);
            });
        }
    
    handlePaginationChange(e, data) {
        this.setState(prevState => Object.assign({}, prevState.activePage.activePage = data.activePage),
            () => this.loadData());  
    }

    render() {
        const itemsPerPage = 6;
        const totalPages = Math.ceil(this.state.totalPages / itemsPerPage);
        return (
            <BodyWrapper reload={this.loadData} loaderData={this.state.loaderData}>
                <div className="ui container">
                    <h1>List of Jobs</h1>
                    <div className="filter-jobs">
                    <Icon name='filter'></Icon>
                    <span>Filter:</span>
                    <Dropdown
                            text='&nbsp;Choose filter'
                            className="filter-dropdown"
                     >
                    </Dropdown>
                    <Icon name='calendar alternate outline'></Icon>
                    <span>Sort by date:</span>
                    <Dropdown
                            text='&nbsp;Newest first'
                            className="filter-dropdown"
                    >
                    </Dropdown>
                    </div>
                    <div className="job-cards">
                        {this.state.isJobListEmpty ? <p className="no-jobs-found">No Jobs Found</p> : this.renderJobsCards()}
                    </div>
                    
                </div>
                <div className="pagination">
                <Pagination
                        activePage={this.state.activePage.activePage}
                        onPageChange={this.handlePaginationChange}
                        totalPages={totalPages}
                    />
                </div>
                
            </BodyWrapper>
        )
    }   
}