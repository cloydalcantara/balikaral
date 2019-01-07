import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logOutUser } from '../../_redux/actions/user'

import { Link } from 'react-router-dom'

class Layout extends Component{
  constructor(props){
    super(props)
    this.state = {
      userLink: false
    }
    this.logOut = this.logOut.bind(this)
    this.toggleUserLink = this.toggleUserLink.bind(this)
  }
  toggleUserLink(){
    if(this.state.userLink){
      this.setState({
        userLink: false
      })
    }else{ 
      this.setState({
        userLink: true
      })
    }
  }
  componentDidMount(){
  
  }
 
  componentWillReceiveProps(nextProps){
    
  }
  logOut(){
    this.props.actions.logOut()
  }
  render() {
    return (
      <div className='user-top-bar'>
        <div className='user-name' onClick={this.toggleUserLink}>
          Hello! {this.props.user.firstName ? this.props.user.firstName : ''} &nbsp;
          <i className={'fa ' + (this.state.userLink ? 'fa-chevron-up' : 'fa-chevron-down')} />
        </div>
        {this.state.userLink ? 
            <div className='user-container'>

              {this.props.role === 'Administrator' ? 
                <Link to='/admin/dashboard'>
                  <div className='user-bar'>
                    <span><i className='la la-home' />Dashboard</span>
                  </div>
                </Link>
              : null}
              {this.props.role === 'Teacher' ? 
                <Link to='/teacher/dashboard'>
                  <div className='user-bar'>
                    <span><i className='la la-home' />Dashboard</span>
                  </div>
                </Link>
              : null}

              {this.props.role === 'Learner' && this.props.hadPreTest ? 
                <Link to='/learner/dashboard'>
                  <div className='user-bar'>
                    <span><i className='la la-home' />Dashboard</span>
                  </div>
                </Link>
              : null}
              {this.props.role === 'Learner' && !this.props.hadPreTest ? 
                <Link to='/learner-start/dashboard'>
                  <div className='user-bar'>
                    <span><i className='la la-home' />Dashboard</span>
                  </div>
                </Link>
              : null}
              <Link to={{ 
                pathname: (
                  (this.props.role === 'Administrator' ? '/admin/user-view' : '') + 
                  (this.props.role === 'Teacher' ? '/teacher/profile' : '') + 
                  (this.props.role === 'Learner' ? '/learner/profile' : '') + 
                  '/update-information'), 
                state: { id: this.props.user.id } 
              }}>
               
              <div className='user-bar'>
                <span><i className='fa fa-user' />Profile</span>
              </div>

              </Link>
             
              <div className='user-bar' onClick={this.logOut}>
                 <span><i className='fa fa-sign-out' />Log Out</span>
              </div>
            </div>
        : null} 
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    role: state.role,
    hadPreTest: state.hadPreTest,
  }
}
const mapDispatchToProps = dispatch => {
  return {
     actions: {
       logOut: bindActionCreators(logOutUser, dispatch)
     }
  }
}

const UserProfile = connect(mapStateToProps, mapDispatchToProps)(Layout)

export default UserProfile
