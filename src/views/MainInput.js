import React, { Component } from "react";
import {
  Typography,
  message,
  Divider,
  Input,
  Col,
  Row,
  Button,
  Spin
} from "antd";
const { TextArea } = Input;
const { Title, Text } = Typography;

export default class MainInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      loading: false
    };  
  }
  render() {
    return (
      <div style={style}>
        <Spin
          spinning={this.state.loading}
          size="large"
          tip="Procesando, por favor espera"
        >
          <Divider />
          <Row type="flex" justify="center" align="middle">
            <Col span={18}>
              <Title level={3}>Instrucciones</Title>
              <li>
                <Text>
                  {" "}
                  Ir a la historia academica del SIA desde el navegador{" "}
                </Text>{" "}
                <Text strong>Google Chrome</Text>
              </li>
              <li>
                <Text>
                  Oprime las teclas <Text mark> CRTL + A</Text> para seleccionar
                  todo.
                </Text>
              </li>
              <li>
                <Text>
                  Una vez seleccionado se debe copiar con{" "}
                  <Text mark> CRTL + C.</Text>
                </Text>
              </li>
              <li>
                <Text>
                  Finalmente pega la informacion en el campo{" "}
                  <Text mark> CRTL + V.</Text>
                </Text>
              </li>
              <br/>
              <Text type='secondary'>
                La aplicación permite editar , agregar y borrar asignaturas.
              </Text>
              <Divider />
              <TextArea
                autoSize={true}
                placeholder="Ingresa la historia academcia acá"
                style={{ minHeight: 300 }}
                onChange={e => this.onChange(e)}
              />

              <Button type="primary" block onClick={this.isOk}>
                Analizar
              </Button>
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
  //Actions
  onChange = event => {
    this.setState({ text: event.target.value });
  };
  isOk = () => {
    let data = this.state.text;
    data = data.split(/\r\n|\r|\n/);
    let first_line = data[0];
    first_line = data[0].toLowerCase();
    let str_compare = "Logo UniversidadPORTAL DE SERVICIOS ACADÉMICOS";
    str_compare = str_compare.toLowerCase();
    if (!first_line.includes(str_compare)) {
      message.error("Un error ha ocurrido, por favor siga las instrucciones");
    } else {
      message.success("Se ha recibido los datos con exito, por favor espere");
      this.setState({loading: true})
      setTimeout(() => {
          this.props.onSuccess(data)
      }, 2000);
    }
  };
}

const style = {
  backgroundColor: "#fff"
};
