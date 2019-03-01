import React, {Component} from 'react'

import Select from '../../_component/Form/Select'

import apiRequest from '../../_axios'

import { connect } from 'react-redux'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
      reviewer: []
    }
    this.fetchAll = this.fetchAll.bind(this)
  }
  fetchAll(learningStrand, fileUsage){ 
    apiRequest('get', `/reviewer-management/fetchAllWithoutPagination?learningStrand=${learningStrand}&fileUsage=${fileUsage}`, false, this.props.token)
      .then((res)=>{
        if(res.data){
          this.setState({
            reviewer: res.data.data
          })  
        }
      })
      .catch((err)=>{
        
      })
  }
  componentDidMount(){
    this.fetchAll('', '')
  }
  componentWillReceiveProps(nextProps){
 
    if(nextProps){
      let learningStrand = nextProps.learningStrand ? nextProps.learningStrand : ''
      let fileUsage = nextProps.fileUsage ? nextProps.fileUsage : ''
      this.fetchAll(learningStrand, fileUsage)
    }else{
      this.fetchAll('', '')
    }
  }
  render() { 
    return (
    <Select
      onChange={this.props.onChange ? this.props.onChange : '' }
      value={this.props.value}
      name={this.props.name}
      label='Modyul'
      required={this.props.required}
       
    >
      <option value='' disabled> -- SELECT --</option>
        {this.state.reviewer.map((attr,index)=> {
          console.log(attr,"attr")
          return (
              <option key={index} value={attr._id}>{ this.props.fileUsage && this.props.fileUsage === "Reviewer" ? "Modyul" : this.props.fileUsage} 
              { attr.fileUsage && attr.fileUsage === "Reviewer" ? "Modyul" : attr.fileUsage}{" - "}
              {attr.description}</option>
            )
        })}
          
    </Select>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}
const SelectLevel = connect(mapStateToProps)(Layout)

export default SelectLevel