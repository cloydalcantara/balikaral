
import React, {Component} from 'react'

import { NavLink } from 'react-router-dom'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active: false,
    }
    this.toggleSidebar = this.toggleSidebar.bind(this)
  }
  toggleSidebar(){
    if(this.state.active){
      this.setState({
        active: false
      })
    }else{
       this.setState({
        active: true
      })
    }
  }
  render() { 
    return (
      <div>
        <span onClick={this.toggleSidebar} className='icon la la-navicon'></span>
        {this.state.active ? 
            <div className='admin-sidebar'>
                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    DASHBOARD
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/dashboard'>
                    <i className='la la-home'></i>
                    <span>Home</span>
                  </NavLink>
                </div>
                
            </div>
            :
            null
          }
      </div>
    )
  }
}

export default Sidebar