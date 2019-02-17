import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import Form from '../../../_component/Form/Form'
import FormMessage from '../../../_component/Form/FormMessage'
import Input from '../../../_component/Form/Input'
import Textarea from '../../../_component/Form/Textarea'
import FileInput from '../../../_component/Form/FileInput'
import Button from '../../../_component/Form/Button'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import SelectUser from '../../../_special-form/SelectUser'


import config from '../../../_config'

import axios, { put } from 'axios'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        learningStrand: '',
        level: '',
        learningStrandSub: '',
        pdf: '',
        youtubeVideo: '',
        description: '',

     
        message: '',
        type: '',
        active: false,
        buttonDisabled: false,

        header: '',
        urlToUse: '',

        validator: [],
        uploader: '',
      	
      	user: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.fetchSingle = this.fetchSingle.bind(this)
 
    this.formMessage = this.formMessage.bind(this)

    this.handleValidator = this.handleValidator.bind(this)
    this.removeValidator = this.removeValidator.bind(this)

    this.fetchUsers = this.fetchUsers.bind(this)
  }
  fetchUsers(){
  	apiRequest('get', `/user/fetch-all?notType=Learner`, false, this.props.token)
  		.then((res)=>{
  			if(res.data){
  				this.setState({
	  				user: res.data.data
	  			})	
	  		}
  		})
  		.catch((err)=>{
        
  		})
  }
  handleValidator(e){
  	let name = e.target.name
  	let value = e.target.value
  	
  	let validator = this.state.validator
  	let user = this.state.user
  	let index = user.map((attr)=>{
  		return attr._id
  	}).indexOf(value)

  	let newValidator = {
  		user: user[index],
  	}

  	validator = [...validator, newValidator]
  	this.setState({
  		validator: validator
  	})
  }
  removeValidator(i){
  	let validator = this.state.validator

  	validator = [...validator.slice(0,i), ...validator.slice(i + 1)]

  	this.setState({
  		validator: validator
  	})
  }
  formMessage(message, type, active, button){
    this.setState({
      message: message,
      type: type,
      active: active,
      buttonDisabled: button
    })
  }

  componentDidMount(){
    
    if(this.props.location.state){
   	   this.fetchUsers()
      this.fetchSingle()
    
    }else{
      this.props.history.push('/')
    }
  }
   
  fetchSingle(){
    apiRequest('get', `/exam-management/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            
            if(res.data){
                let result = res.data.data
                this.setState({
                    uploader: result.uploader ? result.uploader._id : '',
                    validator: (result.validator ? result.validator : [] ),
                })
            }
            
        })    
        .catch((err)=>{
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })

  }
  handleChange(e){
    let name = e.target.name
    let value = e.target.value

    this.setState({
        [name]: value
    })
  }
  handleSubmit(e){
    e.preventDefault()
    this.formMessage('Updating Data...', 'loading', true, true)
    let data = {
      uploader: this.state.uploader,
   
    }
    let validator = []
    let sValidator = this.state.validator
    sValidator.map((attr)=>{
      validator = [...validator, { user: attr.user._id }]
    })
    data = {...data, validator}
    apiRequest('put', `/exam-management/uploader-validator/${this.props.location.state.id}`, data, this.props.token)
      .then((res)=>{
          
        this.formMessage('Data has been updated', 'success', true, false)
      })    
      .catch((err)=>{
          
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
   
  render() { 
    return (
        <div>
            <Grid fluid>
                <Grid.X>
                    <Grid.Cell large={12}  medium={12} small={12}>
                        <div className='element-container'>
                            <div className='title-text-container hide-on-large-x'>
                                <div className='title'>Exam Management > Edit</div>
                                <div className='title-action'>
                                    <div onClick={this.previewExam} className='button primary small'>{this.state.preview ? 'Edit' : 'Preview'} Exam</div>
                                    <Link to={ (this.props.role === 'Administrator' ? '/admin/teachers' : '') + (this.props.role === 'Teacher' ? '/teacher/management' : '') +  '/exam/list/' + ( this.props.role === 'Administrator' ? 'all' : '') + (this.props.role === 'Teacher' ? 'teachers' : '')}>
                                        <div className='button primary small'>List of Exams</div>
                                    </Link>
                                </div>
                            </div>
                            <Form onSubmit={this.handleSubmit}>
	                            <Grid.X>
	                                <Grid.Cell large={12} medium={12} small={12}>
	                                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
	                                 
	                                </Grid.Cell>
	                               </Grid.X>
	                                <Grid.X>
		                               <Grid.Cell large={6} medium={12} small={12}>
			                                <SelectUser 
			                                   
			                                  type='text' 
			                                  label='Uploader' 
			                                  value={this.state.uploader} 
			                                  name='uploader'
			                                  onChange={this.handleChange}/>
		                              	</Grid.Cell>
	                              	</Grid.X>
	                              	<Grid.X>
		                               <Grid.Cell large={6} medium={12} small={12}>
			                                <SelectUser 
			                                  type='text' 
			                                  label='Validator' 
			                                  value={this.state.validatorSelect} 
			                                  name='validatorSelect'
			                                  onChange={this.handleValidator}/>
		                              	</Grid.Cell>
		                              	<Grid.Cell large={6} medium={12} small={12} className='validator-container'>
		                              		
	                              			{this.state.validator.map((attr,index)=>{
			                                  return (
			                                     <span key={index} className='validator-name' onClick={()=>{this.removeValidator(index)}}>

			                                     {  attr.user ? attr.user.personalInformation ? 
			                                         (attr.user.personalInformation.firstName ? attr.user.personalInformation.firstName : '') 
			                                         + ' ' + 
			                                         (attr.user.personalInformation.middleName ? attr.user.personalInformation.middleName.substring(0,1) : '')
			                                         + ' ' + 
			                                         (attr.user.personalInformation.lastName ? attr.user.personalInformation.lastName : '')
			                                     : '' : ''}
			                                	<i className='la la-close' />
			                                    </span>
			                                  )})}
		                              	</Grid.Cell>
	                              	</Grid.X>
	                              	<Grid.X>


	                             
	                                <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
	                                    <Button disabled={this.state.buttonDisabled} type='submit' text='Save' className='secondary small' />
	                                    <Link  to={
	                                      (this.props.role === 'Administrator' ? '/admin/teachers' + this.state.urlToUse + '/list' : '') + 
	                                      (this.props.role === 'Teacher' ? '/teacher/management' + this.state.urlToUse + '/list' : '')
	                                    }>
	                                        <Button type='button' text='Return' className='cancel small'/>
	                                    </Link>
	                                </Grid.Cell>
	                            </Grid.X>
                            </Form>
                        </div>
                    </Grid.Cell>
                </Grid.X>
            </Grid>
        </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.token,
    role: state.role,
    user: state.user
  }
}
const AddLevel = connect(mapStateToProps)(Layout)
export default AddLevel