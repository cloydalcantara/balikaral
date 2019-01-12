import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'

import AddReviewer from '../AddReviewer'
import ListReviewer from '../ListReviewer'
import EditReviewer from '../EditReviewer'
import ValidateReviewer from '../ValidateReviewer'
import ViewReviewer from '../ViewReviewer'

const Routes = () => {
  return (
    <div>
      <Route path='/teacher/management/reviewer/add' component={AddReviewer} />
      <Route path='/teacher/management/reviewer/list/:type' component={ListReviewer} />
      <Route path='/teacher/management/reviewer/edit' component={EditReviewer} />
      <Route path='/teacher/management/reviewer/validate' component={ValidateReviewer} />
      <Route path='/teacher/management/reviewer/view' component={ViewReviewer} />
    </div>
  )
}



class Reviewer extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() { 
    return (
        <div>
          <div className='third-top-bar'>
            <NavLink to='/teacher/management/reviewer/list/teachers' className='link' activeClassName='active'>
              Reviewers by other teachers
            </NavLink>
            <NavLink to='/teacher/management/reviewer/list/self' className='link' activeClassName='active'>
              Reviewer by yourself
            </NavLink>
            <NavLink to='/teacher/management/reviewer/add' className='link' activeClassName='active'>
              Add New Reviewer
            </NavLink>
            {this.props.location.pathname === '/teacher/management/reviewer/view' ? 
              <div className='link active'>
                View Reviewer
              </div>
            : null}
            {this.props.location.pathname === '/teacher/management/reviewer/edit' ? 
              <div className='link active'>
                Update Reviewer
              </div>
            : null}
            {this.props.location.pathname === '/teacher/management/reviewer/validate' ? 
              <div className='link active'>
                Validate Reviewer
              </div>
            : null}
            
          </div>
          <Routes />
        </div>
    )
  }
}

export default Reviewer