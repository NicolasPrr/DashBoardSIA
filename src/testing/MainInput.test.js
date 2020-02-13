import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MainInput from '../views/MainInput'

Enzyme.configure({ adapter: new Adapter()})

describe('MainInput', () => {
    it('should show text', ()=>{
        const wrapper = shallow(<MainInput/>)
        const text = wrapper.find('div div')
        expect(text.text()).toBe('Google Chrome')
    })
})