import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
<link
	rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
	integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
	crossorigin="anonymous"
/>;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { carnet: '', schedule: 'Lunes de 9:00 a 11:00', isLate: false };
		this.changeHandler = this.changeHandler.bind(this);
	}

	changeHandler = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	render() {
		return (
			<Form
				carnet={this.state.carnet}
				schedule={this.state.schedule}
				isLate={this.state.isLate}
				onChange={this.changeHandler}
			/>
		);
	}
}

class Form extends React.Component {

	render() {

		return (
			<div className="jumbotron">
				<h1>Registro de laboratorio.</h1>

				<div className="form-group">
					<label htmlFor="carnet" className="col-sm-2 col-form-label">
						Ingrese el carnet:{' '}
					</label>
					<input
						className="form-control"
						type="text"
						name="carnet"
						onChange={this.props.changeHandler}
						maxLength="8"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="schedule">Seleccione el horario:</label>
					<select name="schedule" className="form-control" onChange={this.props.changeHandler}>
						<option value="L">Lunes de 9:00 a 11.00</option>
						<option value="Ma">Martes de 13:30 a 15:30</option>
						<option value="Mi">Miércoles de 9:00 a 11.00</option>
						<option value="J">Jueves de 13:30 a 15:30</option>
						<option value="V1">Viernes de 9:00 a 11.00</option>
						<option value="V2">Viernes de 15:30 a 17:30</option>
					</select>
				</div>

				<div className="form-group">
					<div className="custom-control custom-switch">
						<input
							type="checkbox"
							name="isLate"
							className="custom-control-input"
							onChange={this.props.changeHandler}
							
						/>
						<label className="custom-control-label" htmlFor="late_switch">
							Llegó tarde?
						</label>
					</div>
				</div>

				<div className="form-group">
					<button type="button" className="btn btn-danger" onClick={this.handleClick} disabled={this.props.carnet.value !== '[0-9]{8}'? true : false}>
						Ingresar
					</button>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
