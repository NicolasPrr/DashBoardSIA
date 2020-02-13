import React from "react";
import { Layout } from "antd";
import Header from "./componets/Header";
import Footer from "./componets/Footer";
import MainInput from "./views/MainInput";
import setData from './helpers/history'

const { Content } = Layout;


const Switcher = ({type, malla_function}) => {
  
  if(type === 'input') return <MainInput  onSuccess ={malla_function}/>
  if(type === 'malla') return <div> :( depresion?</div>
  return <div>Nothing to do :( :( : )</div>
}
 
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      type: 'input',
      history: null
    }
  }

  render() {
    return (
      <div>
        <Layout>
          <Header />
          <Content>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <Switcher type ={this.state.type} malla_function = {this.getData}/>
            </div>  
          </Content>
          <Footer />
        </Layout>
      </div>
    );
  }
  getData = (data)=>{
    let history = setData(data) 
    this.setState({history: history, type: 'malla' })
    
  }
}

export default App;
