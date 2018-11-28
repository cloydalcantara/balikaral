import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../../_component/Grid'

import Form from '../../../../_component/Form/Form'
import FormMessage from '../../../../_component/Form/FormMessage'
import Input from '../../../../_component/Form/Input'
import Button from '../../../../_component/Form/Button'

import apiRequest from '../../../../_axios'

import { connect } from 'react-redux'

import SelectLevel from '../../Level/SelectLevel'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
    	name: '',
    	description: '',
      level: '',
      noOfQuestions: '',
     
        message: '',
        type: '',
        active: false,
        buttonDisabled: false
      
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

 
    this.clearData = this.clearData.bind(this)
    this.formMessage = this.formMessage.bind(this)
  }
  formMessage(message, type, active, button){
    this.setState({
      message: message,
      type: type,
      active: active,
      buttonDisabled: button
    })
  }
  clearData(){
    this.setState({
      name: '',
      description: '',
      level: '',
      noOfQuestions: '',
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
    this.formMessage('Saving Data', 'loading', true, true)
  	let data = {
  		name: this.state.name,
  		description: this.state.description,
      level: this.state.level,
      noOfQuestions: this.state.noOfQuestions,
  	}

  	apiRequest('post', '/learning-strand', data, this.props.token)
  		.then((res)=>{
          this.clearData()
          this.formMessage('Data has been saved', 'success', true, false)
      })	
  		.catch((err)=>{
          this.clearData() 
          this.formMessage('Error: ' + err.message, 'error', true, false)
  		})
  }
  render() { 
    return (
        <div>
        	<Grid fluid>
        		<Grid.X>
        			<Grid.Cell large={12}>
        				<div className='element-container'>
        					<div className='title-text-container'>
        						<div className='title'>Learning Strand Management > Add</div>
        						<div className='title-action'>
        							<Link to='/admin/management/learning-strand/list'>
        								<div className='button primary small'>List of Learning Strand</div>
        							</Link>
        						</div>
        					</div>
        					<Form 
                    onSubmit={this.handleSubmit}
                    >
  	        				<Grid.X>
                      <Grid.Cell large={12} medium={12} small={12}>
                        <FormMessage type={this.state.type} active={this.state.active}>{this.state.message}</FormMessage>
                       
                      </Grid.Cell>
  	        					<Grid.Cell large={6} medium={12} small={12}>
  	        						<Input 
                          required 
                          type='text' 
                          label='Name' 
                          placeholder='Name' 
                          name='name' 
                          value={this.state.name} 
                          onChange={this.handleChange}/>
  	        					</Grid.Cell>
                      <Grid.Cell large={6} medium={12} small={12}>
                        <SelectLevel
                          required
                          label='Level'
                          name='level' 
                          value={this.state.level} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>
  	        					<Grid.Cell large={6} medium={12} small={12}>
  	        						<Input 
  	        							type='text'
  	        							label='Description' 
  	        							placeholder='Description' 
  	        							name='description' 
  	        							value={this.state.description} 
  	        							onChange={this.handleChange}/>
  	        					</Grid.Cell>
                      <Grid.Cell large={6} medium={12} small={12}>
                        <Input 
                          type='number'
                          min={0}
                          label='Number of Questions' 
                          placeholder='Number of Questions' 
                          name='noOfQuestions' 
                          value={this.state.noOfQuestions} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>
  	        					<Grid.Cell className='form-button right' large={12} medium={12} small={12}>
  	        						<Button type='submit' text='Save' className='secondary small' />
                        <Link to='/admin/management/learning-strand/list'>
  	        						 <Button disabled={this.state.buttonDisabled} type='button' text='Return' className='cancel small'/>
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
    token: state.token
  }
}
const AddLearningStrand = connect(mapStateToProps)(Layout)
export default AddLearningStrand