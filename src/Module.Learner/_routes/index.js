import React from 'react'

import { Route } from 'react-router-dom'

import Dashboard from '../Dashboard'
import Reviewer from '../../_global-management/Reviewer/_routeLearner'
import GeneratedExam from '../../_global-management/GeneratedExam/_routeLearner'

import UserProfile from '../../Page.Profile/_routesLearner'

const Routes = () => { 
  return (
        <div className='admin-content'>
            <Route path='/learner/dashboard' component={Dashboard} />
            <Route path='/learner/reviewer/' component={Reviewer} />
            <Route path='/learner/exam/' component={GeneratedExam} /> 

            <Route path='/learner/profile' component={UserProfile} />

        </div>

    )
}

export default Routes