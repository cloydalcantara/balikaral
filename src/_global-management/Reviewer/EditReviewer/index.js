import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import Form from '../../../_component/Form/Form'
import FormMessage from '../../../_component/Form/FormMessage'
import Input from '../../../_component/Form/Input'
import FileInput from '../../../_component/Form/FileInput'
import Button from '../../../_component/Form/Button'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        learningStrand: '',
        pdf: '',
        description: '',

     
        message: '',
        type: '',
        active: false,
        buttonDisabled: false
      
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.fetchSingle = this.fetchSingle.bind(this)
 
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

  componentDidMount(){
    
    if(this.props.location.state){
      this.fetchSingle()
    }else{
      this.props.history.push('/')
    }
  }
  fetchSingle(){
    apiRequest('get', `/reviewer-management/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            
            if(res.data){
                let result = res.data.data
                this.setState({
                    learningStrand: (result.learningStrand ? result.learningStrand._id : '' : ''),
                    description: (result.description ? result.description : ''),
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
        learningStrand: this.state.learningStrand,
        description: this.state.description,
    }
    
    apiRequest('put', `/reviewer-management/update/${this.props.location.state.id}`, data, this.props.token)
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
                            <div className='title-text-container hide-on-large'>
                                <div className='title'>Reviewer Management > Edit</div>
                                <div className='title-action'>
                                    <Link  to={(this.props.role === 'Administrator' ? '/admin/teachers' : '') + (this.props.role === 'Teacher' ? '/teacher/management' : '') +  '/reviewer/list/' + ( this.props.role === 'Administrator' ? 'all' : '') + (this.props.role === 'Teacher' ? 'teachers' : '')}>
                                        <div className='button primary small'>List of Reviewer</div>
                                    </Link>
                                </div>
                            </div>
                            <Form 
                                onSubmit={this.handleSubmit}
                                >
                            <Grid.X>
                                <Grid.Cell large={12} medium={12} small={12}>
                                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
                                 
                                </Grid.Cell>
                                <Grid.Cell large={6} medium={12} small={12}>
                                  <SelectLearningStrand 
                                    label='Learning Strand'  
                                    name='learningStrand' 
                                    value={this.state.learningStrand} 
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
                                <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                                    <Button disabled={this.state.buttonDisabled} type='submit' text='Save' className='secondary small' />
                                    <Link  to={(this.props.role === 'Administrator' ? '/admin/teachers' : '') + (this.props.role === 'Teacher' ? '/teacher/management' : '') +  '/reviewer/list/' + ( this.props.role === 'Administrator' ? 'all' : '') + (this.props.role === 'Teacher' ? 'teachers' : '')}>
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
    role: state.role
  }
}
const AddLevel = connect(mapStateToProps)(Layout)
export default AddLevel