import React from 'react';
import Cookies from 'js-cookie';
import {
    Popup,
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Label,
    ButtonGroup,
    Button,
    Icon
   
} from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }
    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://localhost:51689/listing/listing/closeJob',
    }
    render() {
        const job = this.props.job ? this.props.job : " ";
        const city = job.location.city != 0 ? job.location.city + "," : " ";
        return (
            <div>
                
                    <Card>
                        <CardContent>
                            <CardHeader>{job.title}</CardHeader>
                            <Label color='black' ribbon='right'>
                                <Icon name="user"></Icon>
                                0
                            </Label>
                            <CardMeta>{city} {job.location.country}</CardMeta>
                            <CardDescription>
                                {job.summary}
                            </CardDescription>
                        </CardContent>
                        <CardContent extra>
                            <div className="card-action-btn">
                                <Button compact color='red' floated="left" className="card-btn">Expired</Button>
                                <ButtonGroup>
                                    <Button compact basic color='blue' className="card-btn"><Icon name='ban'></Icon>Close</Button>
                                    <Button compact basic color='blue' className="card-btn"><Icon name='edit outline'></Icon>Edit</Button>
                                    <Button compact basic color='blue' className="card-btn"><Icon name='copy outline'></Icon>Copy</Button>
                                </ButtonGroup>
                            </div>
                        </CardContent>
                    </Card>
                   
            </div>
        );
    }
}